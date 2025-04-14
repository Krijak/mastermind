import { PropsWithChildren, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";

const preloadImages = (images: string[]): Promise<void[]> => {
  const imagePromises = images.map((src) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject(`Failed to load image: ${src}`);
    });
  });

  return Promise.all(imagePromises);
};

const AppWrapper = ({
  children,
  setIsLoaded,
  setShowLoading,
}: PropsWithChildren & {
  setIsLoaded: (value: boolean) => void;
  setShowLoading: (value: boolean) => void;
}) => {
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

  useEffect(() => {
    const images: string[] = [
      ...Object.values(
        import.meta.glob("/*.{png,jpg,jpeg,gif}", { eager: true })
      ).map((module) => (module as any).default),
      ...Object.values(
        import.meta.glob("/FrontpageImages/*.{png,jpg,jpeg}", {
          eager: true,
        })
      ).map((module) => (module as any).default),
    ];

    preloadImages(images)
      .then(() => {
        setTimeout(() => {
          setShowLoading(false);
          setTimeout(() => {
            setIsLoaded(true);
          }, 500);
        }, 500);
      })
      .catch(() => {
        setShowLoading(false);
        setIsLoaded(true);
      });
  }, [location.pathname]);

  return children;
};

export default AppWrapper;
