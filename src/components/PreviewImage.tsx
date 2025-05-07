import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const PreviewImage = ({
  src,
  alt,
  isVertical = false,
  showInVertical = false,
}: {
  src: string;
  alt: string;
  isVertical?: boolean;
  showInVertical?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWideImage, setIsWideImage] = useState(false);
  const [isTallImage, setIsTallImage] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && containerRef.current) {
      const checkImageDimensions = () => {
        const imageWidth = imageRef.current?.naturalWidth || 0;
        const imageHeight = imageRef.current?.naturalHeight || 0;
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const containerHeight = containerRef.current?.offsetHeight || 0;

        const imageAspectRatio = imageWidth / imageHeight;
        const containerAspectRatio = containerWidth / containerHeight;

        if (isVertical) {
          setIsTallImage(imageHeight / imageWidth > 1.8);
          setIsWideImage(false);
        } else {
          setIsWideImage(imageAspectRatio > containerAspectRatio * 1.2);
          setIsTallImage(false);
        }
      };

      if (!isLoading) {
        checkImageDimensions();
      }

      window.addEventListener("resize", checkImageDimensions);
      return () => window.removeEventListener("resize", checkImageDimensions);
    }
  }, [isLoading, isVertical]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const getAnimationProps = () => {
    if (isWideImage) {
      return {
        x: ["0%", "-50%", "0%"],
        transition: {
          x: {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
            pause: isScrolling,
          },
        },
      };
    }
    if (isTallImage) {
      return {
        y: ["0%", "-40%", "0%"],
        transition: {
          y: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
            pause: isScrolling,
          },
        },
      };
    }
    return {};
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden bg-white/5 ${
        isVertical
          ? "w-full md:w-[400px] aspect-[3/4] md:aspect-auto md:h-[600px] mx-auto"
          : "w-full aspect-video"
      }`}
    >
      <motion.div className="absolute inset-0" animate={getAnimationProps()}>
        <div className="relative h-full">
          <Image
            ref={imageRef}
            src={src}
            alt={alt}
            width={1000}
            height={1000}
            className={`
                h-full
                duration-700 ease-in-out
                ${
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                }
              `}
            style={{
              height: showInVertical ? "auto" : isVertical ? "auto" : "100%",
              width: showInVertical ? "100%" : isVertical ? "100%" : "auto",
              maxWidth: isVertical ? "100%" : "none",
              objectFit: isVertical ? "cover" : "contain",
              objectPosition: isVertical ? "top" : "left",
              imageRendering: "crisp-edges",
            }}
            quality={100}
            priority={true}
            unoptimized={true}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
      </motion.div>
      {(isWideImage || isTallImage) && (
        <div
          className={`absolute pointer-events-none ${
            isVertical
              ? "inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent"
              : "inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/30 to-transparent"
          }`}
        />
      )}
    </div>
  );
};
export default PreviewImage;
