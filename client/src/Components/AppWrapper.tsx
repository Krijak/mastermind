import { PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { io, Socket } from "socket.io-client";
import { Button, Typography } from "@mui/material";
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
  // const socket = io("http://localhost:8080", { autoConnect: false });
  // const socket = io("http://localhost:8080");
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

  const [isConnected, setIsConnected] = useState(false);
  const [useSameDevice, handleSetUseSameDevice] = useState(false);

  const [socket, setSocket] = useState(null as Socket | null);

  useEffect(() => {
    if (!socket) {
      setSocket(io("http://localhost:8080"));
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    console.log("rendered useffect");

    const socketRoomId = (roomId: RoomIdType) => {
      handleRoomId(roomId);
      sessionStorage.setItem(mastermindRoomId, roomId);
      console.log("roomId", roomId);
    };

    const onConnected = () => {
      console.log("ON CONNECTED");
    };

    const onConnect = () => {
      setIsConnected(true);
      console.log("on connect");
    };
    const onDisconnect = () => {
      setIsConnected(false);
      console.log("on disconnect");
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
      handleSetPins(pins);
    };

    const handleJoinRoom = (ok: boolean) => {
      console.log("handlejoinroom", ok);
      if (ok) {
        navigate(routes.game);
        handleRoomId(roomId);
      } else navigate(routes.noRoom);
    };

    const initGame = () => {
      console.log("init game", code);
      handleSetGame(game);
      handleSetCode(code);
      handleSetPins(pins);
    };

    socket.on("initGame", initGame);
    socket.on("roomId", socketRoomId);
    socket.on("joinRoom", handleJoinRoom);
    socket.on("connection", onConnected);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("game", onGame);
    socket.on("pins", onPins);
    socket.on("code", onCode);

    return () => {
      socket.off("roomId", socketRoomId);
      socket.off("joinRoom", handleJoinRoom);

      socket.off("connection", onConnected);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("game", onGame);
      socket.off("pins", onPins);
      socket.off("code", onCode);
      socket.disconnect();
    };
  }, [socket]);

  const setGame = (game: GameType) => {
    handleSetGame(game);
    console.log(game);
    console.log(useSameDevice);
    if (!useSameDevice) {
      socket?.emit("game", roomId, game);
      console.log("emitted");
    }
    setFullGame({ ...fullGame, game: game });
  };

  const setPins = (pins: PinsType) => {
    handleSetPins(pins);
    if (!useSameDevice) socket?.emit("pins", roomId, pins);
    setFullGame({ ...fullGame, pins: pins });
  };

  const setCode = (code: CodeType, isNewGame?: boolean) => {
    handleSetCode(code);
    if (isNewGame) {
      socket?.emit("newGame", code, game, pins);
    } else if (!useSameDevice) socket?.emit("code", roomId, code);
    setFullGame({ ...fullGame, code: code });
  };

  const setRoomId = (roomId: RoomIdType) => {
    socket?.emit("joinRoom", roomId);
  };

  const setUseSameDevice = (useSameDevice: boolean) => {
    handleSetUseSameDevice(useSameDevice);
  };

  const resetGame = () => {
    handleSetCode(emptyFullGame.code);
    handleSetGame(emptyFullGame.game);
    handleSetPins(emptyFullGame.pins);
    setFullGame(emptyFullGame);
  };

  useEffect(() => {
    sessionStorage.setItem(mastermindFullGame, JSON.stringify(fullGame));
    if (roomId) sessionStorage.setItem(mastermindRoomId, roomId);
  }, [game, code, pins, fullGame, roomId]);

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
      <Typography>{roomId}</Typography>
      {children}
    </CodeContext.Provider>
  );
};

export default AppWrapper;
