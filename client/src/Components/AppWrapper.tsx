import { PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import { io } from "socket.io-client";
import { Button } from "@mui/material";
import {
  CodeContext,
  CodeType,
  emptyFullGame,
  GameType,
  PinsType,
} from "../variables";

const AppWrapper = ({ children }: PropsWithChildren) => {
  const socket = io("http://localhost:8080");
  const location = useLocation();

  const mastermindFullGame = "mastermindFullGame";
  const sessionStoredFullGameJSON = sessionStorage.getItem(mastermindFullGame);
  const parsedFullGame =
    sessionStoredFullGameJSON !== null && JSON.parse(sessionStoredFullGameJSON);

  const [fullGame, setFullGame] = useState(
    parsedFullGame ? parsedFullGame : emptyFullGame
  );
  const [game, handleSetGame] = useState(fullGame.game);
  const [pins, handleSetPins] = useState(fullGame.pins);
  const [code, handleSetCode] = useState(fullGame.code);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [useSameDevice, setUseSameDevice] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onGame = (game: GameType) => {
      handleSetGame(game);
    };
    const onCode = (code: CodeType) => {
      handleSetCode(code);
    };

    const onPins = (pins: PinsType) => {
      handleSetPins(pins);
    };

    const onUseSameDevice = (useSameDevice: boolean) => {
      setUseSameDevice(useSameDevice);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("game", onGame);
    socket.on("pins", onPins);
    socket.on("code", onCode);
    socket.on("setUseSameDevice", onUseSameDevice);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("game", onGame);
      socket.off("pins", onPins);
      socket.off("code", onCode);
      socket.off("setUseSameDevice", onUseSameDevice);
    };
  }, []);

  const setGame = (game: GameType) => {
    handleSetGame(game);
    if (!useSameDevice) socket.emit("game", game);
    setFullGame({ ...fullGame, game: game });
  };

  const setPins = (pins: PinsType) => {
    handleSetPins(pins);
    if (!useSameDevice) socket.emit("pins", pins);
    setFullGame({ ...fullGame, pins: pins });
  };

  const setCode = (code: CodeType) => {
    handleSetCode(code);
    if (!useSameDevice) socket.emit("code", code);
    setFullGame({ ...fullGame, code: code });
  };

  const resetGame = () => {
    handleSetCode(emptyFullGame.code);
    handleSetGame(emptyFullGame.game);
    handleSetPins(emptyFullGame.pins);
    setFullGame(emptyFullGame);
  };

  useEffect(() => {}, [isConnected]);

  useEffect(() => {
    sessionStorage.setItem(mastermindFullGame, JSON.stringify(fullGame));
  }, [game, code, pins, fullGame]);

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
        fullGame,
        setFullGame,
        game,
        pins,
        code,
        setGame,
        setPins,
        setCode,
        resetGame,
      }}
    >
      <Button onClick={() => socket.emit("setUseSameDevice", !useSameDevice)}>
        {useSameDevice ? "true" : "false"}
      </Button>
      {children}
    </CodeContext.Provider>
  );
};

export default AppWrapper;
