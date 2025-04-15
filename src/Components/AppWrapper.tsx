import {
  createContext,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import { Colors, numPegs, Tuple } from "./SetCode";

type CodeType = Tuple<Colors | undefined, typeof numPegs>;
type GameType = Tuple<CodeType, 10>;
export const emptyGame = Array(10).fill(
  Array(numPegs).fill(undefined)
) as GameType;
export const emptyCode = Array(numPegs).fill(undefined) as CodeType;

interface CodeContextType {
  isCodeGuesser: boolean;
  setIsCodeGuesser: (isCodeGuesser: boolean) => void;
  code: CodeType;
  setCode: (code: (Colors | undefined)[]) => void;
  game: GameType;
  setGame: (game: (Colors | undefined)[][]) => void;
  resetGame: () => void;
}

export const CodeContext = createContext<CodeContextType>({
  isCodeGuesser: true,
  setIsCodeGuesser: (isCodeGuesser: boolean) => {
    isCodeGuesser;
  },
  code: Array(numPegs).fill(undefined) as CodeType,
  setCode: (code: (Colors | undefined)[]) => {
    code;
  },
  game: emptyGame,
  setGame: (game: (Colors | undefined)[][]) => {
    game;
  },
  resetGame: () => {},
});

const AppWrapper = ({ children }: PropsWithChildren) => {
  const mastermindCode = "mastermindCode";
  const mastermindGame = "mastermindGame";
  const mastermindIsCodeGuesser = "mastermindIsCodeGuesser";
  const sessionStoredCodeJSON = sessionStorage.getItem(mastermindCode);
  const sessionStoredGameJSON = sessionStorage.getItem(mastermindGame);
  const sessionStoredIsCodeGuesserJSON = sessionStorage.getItem(
    mastermindIsCodeGuesser
  );
  const sessionStoredCode =
    sessionStoredCodeJSON && JSON.parse(sessionStoredCodeJSON);
  const sessionStoredGame =
    sessionStoredGameJSON && JSON.parse(sessionStoredGameJSON);
  const sessionStoredIsCodeGuesser =
    sessionStoredIsCodeGuesserJSON &&
    JSON.parse(sessionStoredIsCodeGuesserJSON);
  const [code, setCode] = useState(
    sessionStoredCode ?? Array(numPegs).fill(undefined)
  );
  const [game, setGame] = useState(
    sessionStoredIsCodeGuesser ?? Array(10).fill(Array(numPegs).fill(undefined))
  );
  const [isCodeGuesser, setIsCodeGuesser] = useState(sessionStoredGame ?? true);

  const location = useLocation();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-animation");
      }
    });
  });

  const resetGame = () => {
    setGame(emptyGame);
    setCode(emptyCode);
    setIsCodeGuesser(true);
  };

  useEffect(() => {
    sessionStorage.setItem(mastermindCode, JSON.stringify(code));
    sessionStorage.setItem(mastermindGame, JSON.stringify(game));
    sessionStorage.setItem(
      mastermindIsCodeGuesser,
      JSON.stringify(isCodeGuesser)
    );
  }, [code, game, isCodeGuesser]);

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
        isCodeGuesser,
        setIsCodeGuesser,
        resetGame,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export default AppWrapper;
