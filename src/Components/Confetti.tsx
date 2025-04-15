import ReactConfetti from "react-confetti";

export const Confetti = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return (
    <ReactConfetti width={width} height={height} initialVelocityY={200} run />
  );
};

export default Confetti;
