import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import React from "react";
import { getResponsiveSizeClass } from "@/components/utils/AutoSizer";

const textVariants = cva("", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify"
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold"
    }
  },
  defaultVariants: {
    align: "center",
    weight: "normal"
  }
})


const Text = React.forwardRef(
  (
    {
      className,
      align,
      weight,
      asChild = false,
      rFontSize = [],
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "p"
    const responsiveClasses = getResponsiveSizeClass([], rFontSize, { component: "text" });

    return (
      <Comp
        className={cn(textVariants({ align, weight, className }),
          responsiveClasses
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export {Text, textVariants};