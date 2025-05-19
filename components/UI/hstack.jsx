import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { getResponsiveSizeClass } from "@/components/utils/AutoSizer";
import { cva } from "class-variance-authority"

const hstackVariants = cva("flex flex-row", {
  variants: {
    spacing: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      stretch: "justify-stretch"
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    }
  },
  defaultVariants: {
    spacing: "md",
    justify: "center",
    align: "center"
  }
})

const HStack = React.forwardRef(
  (
    {
      className,
      spacing,
      justify,
      align,
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
      { component: "hstack" }
    )

    return (
      <Comp
        className={cn(
          hstackVariants({ spacing, justify, align, className }),
          responsiveClasses
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
HStack.displayName = "HStack"

export { HStack, hstackVariants }