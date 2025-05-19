import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const imageVariants = (props) => {
  return cn(
    'relative overflow-hidden',
    props.ratio && `aspect-[${props.ratio}]`,
    props.fit === 'cover' && 'object-cover',
    props.fit === 'contain' && 'object-contain',
    props.fit === 'fill' && 'object-fill',
    props.className
  )
}

const ResizableImage = React.forwardRef(
  (
    {
      className,
      src,
      alt,
      width,
      height,
      ratio,
      fit = 'cover',
      rSize = [], // [base, xs, sm, md, lg, xl]
      sizes,
      asChild = false,
      priority = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : 'div'
    
    //this is nasty
    const responsiveClasses = [
      rSize[0] && `w-[${rSize[0]}]`,
      rSize[1] && `xs:w-[${rSize[1]}]`, 
      rSize[2] && `sm:w-[${rSize[2]}]`,
      rSize[3] && `md:w-[${rSize[3]}]`,
      rSize[4] && `lg:w-[${rSize[4]}]`,
      rSize[5] && `xl:w-[${rSize[5]}]`,
    ].filter(Boolean).join(' ')

    // Totally a magic
    const calculatedWidth = width || (ratio ? 1000 : undefined)
    const calculatedHeight = height || (ratio && calculatedWidth ? Math.round(calculatedWidth / ratio) : undefined)

    const imageProps = {
      src,
      alt,
      className: cn(
        fit === 'cover' && 'object-cover',
        fit === 'contain' && 'object-contain',
        fit === 'fill' && 'object-fill'
      ),
      sizes,
      priority,
      ...(calculatedWidth && calculatedHeight 
        ? { width: calculatedWidth, height: calculatedHeight }
        : { fill: true }
      ),
      ...props
    }

    return (
      <Comp
        className={cn(
          imageVariants({ ratio, fit, className }),
          responsiveClasses
        )}
        ref={asChild ? undefined : ref}
      >
          <Image {...imageProps}/>
      </Comp>
    )
  }
)
ResizableImage.displayName = "NextImage"

export { ResizableImage, imageVariants }