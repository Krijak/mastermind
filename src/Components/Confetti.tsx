import { default as ConfettiBoom } from "react-confetti-boom";
import { Colors, colors, numPegs, Tuple } from "./SetCode";
import { useContext } from "react";
import { CodeContext } from "./AppWrapper";

export const Confetti = () => {
  const { code } = useContext(CodeContext);

  const effectCount = 10000000;
  const particleCount = 70;
  const shapeSize = 19;
  return (
    <>
      <ConfettiBoom
        mode="boom"
        y={0}
        x={0.7}
        particleCount={particleCount}
        effectInterval={3500}
        effectCount={effectCount}
        spreadDeg={360}
        shapeSize={shapeSize}
        colors={(code as Tuple<Colors, typeof numPegs>) ?? colors}
      />
      <ConfettiBoom
        mode="boom"
        y={0.4}
        x={0.8}
        particleCount={particleCount}
        effectInterval={1500}
        effectCount={effectCount}
        spreadDeg={360}
        colors={(code as Tuple<Colors, typeof numPegs>) ?? colors}
        shapeSize={shapeSize}
      />
      <ConfettiBoom
        mode="boom"
        y={0.1}
        x={0.3}
        particleCount={particleCount}
        effectInterval={2000}
        effectCount={effectCount}
        spreadDeg={360}
        shapeSize={shapeSize}
        colors={(code as Tuple<Colors, typeof numPegs>) ?? colors}
      />
      <ConfettiBoom
        mode="boom"
        y={0.8}
        x={0.2}
        particleCount={particleCount}
        effectInterval={3000}
        effectCount={effectCount}
        spreadDeg={360}
        shapeSize={shapeSize}
        colors={(code as Tuple<Colors, typeof numPegs>) ?? colors}
      />
    </>
  );
};

export default Confetti;
