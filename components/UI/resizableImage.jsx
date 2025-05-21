'use client'

import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const ResizableImage = React.forwardRef(
  (
    {
      className,
      src,
      alt,
      widths = ["100%"],
      fill = true,
      ...props
    },
    ref
  ) => {
    const [aspectRatio, setAspectRatio] = React.useState(6/2);
    const uniqueClass = React.useMemo(() => {
      const hash = widths.join('-').replace(/%/g, 'pct');
      return `resizable-img-${hash}`;
    }, [widths]);

    const css = React.useMemo(() => {
      let styles = `.${uniqueClass} { position: relative; }\n`;
      
      widths.forEach((width, index) => {
        const value = typeof width === 'number' ? `${width}px` : width;
        
        if (index === 0) {
          styles += `.${uniqueClass} { width: ${value}; height: ${value}; }\n`;
        } else {
          const bp = Object.keys(breakpoints)[index - 1];
          const min = breakpoints[bp];
          styles += `@media (min-width: ${min}px) {
            .${uniqueClass} { width: ${value}; height: ${value}; }
          }\n`;
        }
      });
      
      return styles;
    }, [uniqueClass, widths]);

    const handleImageLoad = (event) => {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      setAspectRatio(naturalWidth / naturalHeight);
    };

    return (
      <>
        <style>{css}</style>
        <div className={cn(className, uniqueClass)} ref={ref}>
          <AspectRatio ratio={aspectRatio}>
            <Image
              src={src}
              alt={alt}
              fill={fill}
              className="object-contain"
              quality={80}
              priority
              onLoad={handleImageLoad}
              {...props}
            />
          </AspectRatio>
        </div>
      </>
    );
  }
);

ResizableImage.displayName = "ResizableImage";

export { ResizableImage };