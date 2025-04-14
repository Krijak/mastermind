import { Stack, StackProps, styled } from "@mui/material";

type ImageType = {
  src: string;
  alt: string;
} & StackProps;

export const AnimatedImage = ({ src, alt, ...restProps }: ImageType) => {
  return (
    <StyledAnimatedImage {...restProps}>
      <img
        className="apply-scroll-animation"
        alt={alt}
        src={src}
        width={"100%"}
      />
    </StyledAnimatedImage>
  );
};

export default AnimatedImage;

const StyledAnimatedImage = styled(Stack)({
  "@keyframes enter-animation": {
    "0%": {
      transform: "translateY(30px)",
      opacity: " 0",
    },
    "100%": {
      transform: "translateY(0)",
      opacity: "1",
    },
  },

  " @media (prefers-reduced-motion: no-preference)": {
    ".scroll-animation": {
      animation: "enter-animation 1s 0.8",
    },
  },
});
