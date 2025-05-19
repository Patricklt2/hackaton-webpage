import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { getResponsiveSizeClass } from "@/components/utils/AutoSizer";
import { cva } from "class-variance-authority"

const vstackVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      stretch: "justify-stretch"
    }
  },
  defaultVariants: {
    spacing: "md",
    align: "center",
    justify: "center"
  }
})

const VStack = React.forwardRef(
  (
    {
      className,
      spacing,
      align,
      justify,
      asChild = false,
      rFontSize = [],
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div"
    
    const responsiveClasses = getResponsiveSizeClass(
      [],
      rFontSize,
      { component: "vstack" }
    )

    return (
      <Comp
        className={cn(
          vstackVariants({ spacing, align, justify, className }),
          responsiveClasses
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
VStack.displayName = "VStack"

export { VStack, vstackVariants }