import {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import { Colors, numPegs } from "./SetCode";

export const CodeContext = createContext({
  code: Array(numPegs).fill(undefined),
  setCode: (code: (Colors | undefined)[]) => {
    code;
  },
});

const AppWrapper = ({ children }: PropsWithChildren) => {
  const sessionStoredCodeJSON = sessionStorage.getItem("mastermindCode");
  const sessionStoredCode =
    sessionStoredCodeJSON && JSON.parse(sessionStoredCodeJSON);
  const [code, setCode] = useState(
    sessionStoredCode ?? Array(numPegs).fill(undefined)
  );

  const location = useLocation();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-animation");
      }
    });
  });

  useLayoutEffect(() => {
    const viewbox = document.querySelectorAll(".apply-scroll-animation");
    viewbox.forEach((element) => {
      observer.observe(element);
    });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};

export default AppWrapper;
