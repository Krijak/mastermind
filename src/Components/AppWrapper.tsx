import {
  createContext,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import { Colors, numPegs, Tuple } from "./SetCode";
import { PinColors } from "./PegRow";

type CodeType = Tuple<Colors | undefined, typeof numPegs>;
export type PinType = Tuple<PinColors | undefined, typeof numPegs>;
type GameType = Tuple<CodeType, 10>;
type PinsType = Tuple<PinType, 10>;
export const emptyGame = Array(10).fill(
  Array(numPegs).fill(undefined)
) as GameType;
export const emptyPins = Array(10).fill(
  Array(numPegs).fill(undefined)
) as PinsType;
export const emptyCode = Array(numPegs).fill(undefined) as CodeType;

interface CodeContextType {
  code: CodeType;
  setCode: (code: (Colors | undefined)[]) => void;
  game: GameType;
  setGame: (game: (Colors | undefined)[][]) => void;
  pins: PinsType;
  setPins: (pins: (PinColors | undefined)[][]) => void;
  resetGame: () => void;
}

export const CodeContext = createContext<CodeContextType>({
  code: Array(numPegs).fill(undefined) as CodeType,
  setCode: (code: (Colors | undefined)[]) => {
    code;
  },
  game: emptyGame,
  setGame: (game: (Colors | undefined)[][]) => {
    game;
  },
  pins: emptyPins,
  setPins: (pins: (PinColors | undefined)[][]) => {
    pins;
  },

  resetGame: () => {},
});

const AppWrapper = ({ children }: PropsWithChildren) => {
  const mastermindCode = "mastermindCode";
  const mastermindGame = "mastermindGame";
  const mastermindPins = "mastermindPins";
  const sessionStoredCodeJSON = sessionStorage.getItem(mastermindCode);
  const sessionStoredGameJSON = sessionStorage.getItem(mastermindGame);
  const sessionStoredPinsJSON = sessionStorage.getItem(mastermindPins);
  const sessionStoredCode =
    sessionStoredCodeJSON && JSON.parse(sessionStoredCodeJSON);
  const sessionStoredGame =
    sessionStoredGameJSON && JSON.parse(sessionStoredGameJSON);
  const sessionStoredPins =
    sessionStoredPinsJSON && JSON.parse(sessionStoredPinsJSON);
  const [code, setCode] = useState(sessionStoredCode ?? emptyCode);
  const [game, setGame] = useState(sessionStoredGame ?? emptyGame);
  const [pins, setPins] = useState(sessionStoredPins ?? emptyPins);
  const location = useLocation();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-animation");
      }
    });
  });

  const resetGame = () => {
    setCode(emptyCode);
    setGame(emptyGame);
    setPins(emptyPins);
  };

  useEffect(() => {
    sessionStorage.setItem(mastermindCode, JSON.stringify(code));
    sessionStorage.setItem(mastermindGame, JSON.stringify(game));
    sessionStorage.setItem(mastermindPins, JSON.stringify(pins));
  }, [code, game, pins]);

  useLayoutEffect(() => {
    const viewbox = document.querySelectorAll(".apply-scroll-animation");
    viewbox.forEach((element) => {
      observer.observe(element);
    });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <CodeContext.Provider
      value={{
        code,
        setCode,
        game,
        setGame,
        resetGame,
        pins,
        setPins,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export default AppWrapper;
