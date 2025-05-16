import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ingresar: "bg-cs-lightBlue border border-input hover:bg-transparent hover:text-cs-lightBlue hover:border-cs-lightBlue text-cs-darkBlue text-xl",
          inscribirse: "bg-cs-lightOrange border rounded-[4px] border-input hover:bg-transparent hover:text-cs-lightOrange hover:border-cs-lightOrange text-cs-darkBlue",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        responsive: `
        text-[0.625rem] xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl
        h-4 xs:h-5 sm:h-6 md:h-7 lg:h-8 xl:h-10
        px-0.5 xs:px-0.5 sm:px-1 md:px-2 lg:px-2 xl:px-3
        py-0.5 xs:py-0.5 sm:py-0.5 md:py-1 lg:py-1 xl:py-1
        rounded-[4px]
      `
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
