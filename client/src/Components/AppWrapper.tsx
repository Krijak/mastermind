import { PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { io } from "socket.io-client";
import {
  CodeContext,
  CodeType,
  emptyFullGame,
  GameType,
  PinsType,
  RoomIdType,
  routes,
} from "../variables";

const AppWrapper = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const navigate = useNavigate();

  const mastermindFullGame = "mastermindFullGame";
  const mastermindRoomId = "mastermindRoomId";
  const sessionStoredFullGameJSON = sessionStorage.getItem(mastermindFullGame);
  const sessionStoredRoomIdJSON = sessionStorage.getItem(mastermindRoomId);
  const parsedFullGame =
    sessionStoredFullGameJSON !== null && JSON.parse(sessionStoredFullGameJSON);

  const [fullGame, setFullGame] = useState(
    parsedFullGame ? parsedFullGame : emptyFullGame
  );
  const [game, handleSetGame] = useState(fullGame.game);
  const [pins, handleSetPins] = useState(fullGame.pins);
  const [code, handleSetCode] = useState(fullGame.code);
  const [roomId, handleRoomId] = useState(sessionStoredRoomIdJSON ?? undefined);

  const [useSameDevice, handleSetUseSameDevice] = useState(true);

  const url =
    import.meta.env.MODE == "development"
      ? "http://localhost:8080"
      : "https://vaulted-fort-195914.ew.r.appspot.com/";
  const [socket, setSocket] = useState(
    io(url, {
      autoConnect: false,
    })
  );

  useEffect(() => {
    console.log(import.meta.env.MODE);
    console.log(url);
    if (!socket) {
      setSocket(
        io(url, {
          autoConnect: false,
        })
      );
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket, url]);

  useEffect(() => {
    if (!socket) return;

    const socketRoomId = (roomId: RoomIdType) => {
      handleRoomId(roomId);
      sessionStorage.setItem(mastermindRoomId, roomId);
      if (location.pathname != `${routes.game}/${roomId}`) {
        navigate(`${routes.game}/${roomId}`);
      }
    };

    const onConnected = () => {
      console.log("ON CONNECTED");
    };

    const onGame = (game: GameType) => {
      console.log("got game", game);
      handleSetGame(game);
    };
    const onCode = (code: CodeType) => {
      console.log("got code", code);
      handleSetCode(code);
    };

    const onPins = (pins: PinsType) => {
      console.log("got pins", pins);
      handleSetPins(pins);
    };

    const handleJoinRoom = (ok: boolean) => {
      if (ok) {
        console.log(`${routes.game}/${roomId}`);
        console.log("yeeeah");
        if (location.pathname != `${routes.game}/${roomId}`) {
          navigate(`${routes.game}/${roomId}`);
        }
        handleRoomId(roomId);
        initGame();
      } else navigate(routes.noRoom);
    };

    const initGame = () => {
      handleSetGame(game);
      handleSetCode(code);
      handleSetPins(pins);
    };

    socket.on("initGame", initGame);
    socket.on("roomId", socketRoomId);
    socket.on("joinRoom", handleJoinRoom);
    socket.on("connection", onConnected);
    socket.on("game", onGame);
    socket.on("pins", onPins);
    socket.on("code", onCode);

    return () => {
      socket.off("roomId", socketRoomId);
      socket.off("joinRoom", handleJoinRoom);

      socket.off("connection", onConnected);
      socket.off("game", onGame);
      socket.off("pins", onPins);
      socket.off("code", onCode);
      socket.disconnect();
    };
  }, [socket]);

  const setGame = (game: GameType) => {
    handleSetGame(game);
    if (!useSameDevice) {
      socket?.emit("game", roomId, game);
    }
    setFullGame({ ...fullGame, game: game });
  };

  const setPins = (pins: PinsType) => {
    handleSetPins(pins);
    if (!useSameDevice) socket?.emit("pins", roomId, pins);
    setFullGame({ ...fullGame, pins: pins });
  };

  const setCode = (code: CodeType, isNewGame?: boolean) => {
    console.log(code);
    handleSetCode(code);
    if (isNewGame) {
      socket?.connect();
      socket?.emit("newGame", code, game, pins);
    }
    setFullGame({ ...fullGame, code: code });
  };

  const setRoomId = (roomId: RoomIdType) => {
    if (!socket) {
      const newSocket = io(url, {
        autoConnect: false,
      });
      setSocket(newSocket);
      newSocket.connect();
      newSocket.emit("joinRoom", roomId);
      console.log("set room id", newSocket.id);
    } else {
      socket?.connect();
      socket?.emit("joinRoom", roomId);
    }
  };

  const setUseSameDevice = (useSameDevice: boolean) => {
    handleSetUseSameDevice(useSameDevice);
  };

  const resetGame = () => {
    handleSetCode(emptyFullGame.code);
    handleSetGame(emptyFullGame.game);
    handleSetPins(emptyFullGame.pins);
    setFullGame(emptyFullGame);
    handleRoomId("");
    socket?.disconnect();
  };

  useEffect(() => {
    sessionStorage.setItem(
      mastermindFullGame,
      JSON.stringify({ game: game, code: code, pins: pins })
    );
    console.log("sat session storage");
    if (roomId) sessionStorage.setItem(mastermindRoomId, roomId);
  }, [game, code, pins, roomId]);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animation");
        }
      });
    });

    const viewbox = document.querySelectorAll(".apply-scroll-animation");
    viewbox.forEach((element) => {
      observer.observe(element);
    });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <CodeContext.Provider
      value={{
        setUseSameDevice,
        useSameDevice,
        fullGame,
        setFullGame,
        game,
        pins,
        code,
        roomId,
        setGame,
        setPins,
        setCode,
        resetGame,
        setRoomId,
      }}
    >
      {/* <Typography>{socket?.id}</Typography> */}
      {children}
    </CodeContext.Provider>
  );
};

export default AppWrapper;
