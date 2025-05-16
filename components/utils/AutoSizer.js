import clsx from "clsx";

// Some overhead but more performant

const fontSizeBaseMap = {
    '2xs': "text-[0.625rem]",
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    '2xl': "text-2xl",
    '3xl': "text-3xl",
  };
  
const fontSizePrefixedMap = {
    '2xs': "2xs:text-[0.625rem]",
    xs: "xs:text-xs",
    sm: "sm:text-sm",
    md: "md:text-md",
    lg: "lg:text-lg",
    xl: "xl:text-xl",
    '2xl': "2xl:text-2xl",
    '3xl': "3xl:text-3xl",
  };

const spacingBaseMap = {
    button: {
      '2xs': "p-0.5 h-4",
      xs: "p-1 h-5",
      sm: "px-1 py-0.5 h-6",
      md: "px-2 py-1 h-7",
      lg: "px-2 py-1 h-8",
      xl: "px-3 py-1 h-10",
    },
  };
  
 const spacingPrefixedMap = {
    button: {
      '2xs': "2xs:p-0.5 2xs:h-4",
      xs: "xs:p-1 xs:h-5",
      sm: "sm:px-1 sm:py-0.5 sm:h-6",
      md: "md:px-2 md:py-1 md:h-7",
      lg: "lg:px-2 lg:py-1 lg:h-8",
      xl: "xl:px-3 xl:py-1 xl:h-10",
    },
  };


  const breakpoints = ['', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];

  const sortByBreakpoint = (arr) =>
    [...arr].sort((a, b) => breakpoints.indexOf(a) - breakpoints.indexOf(b));
  
  /**
 * Returns a responsive Tailwind class string for font sizes and spacing (e.g., for buttons).
 * 
 * @param {string[]} sizes - List of responsive spacing sizes (e.g., ['sm', 'md', 'lg']).
 * @param {string[]} fontSizes - List of responsive font sizes (e.g., ['sm', 'md', 'lg']).
 * @param {string} [options.component='button'] - The type of component (e.g., 'button', 'input').
 * 
 * @returns {string} A Tailwind-compatible class string including base and responsive styles.
 */
  export function getResponsiveSizeClass(
    sizes = [],
    fontSizes = [],
    { component = "button" } = {}
  ) {
    const sortedSizes = sortByBreakpoint(sizes.filter(Boolean));
    const sortedFontSizes = sortByBreakpoint(fontSizes.filter(Boolean));
  
    const baseSize = sortedSizes[0];
    const baseFontSize = sortedFontSizes[0];
  
    const spacingClasses = sortedSizes.flatMap(size => {
      const base = spacingBaseMap[component]?.[size];
      const prefixed = spacingPrefixedMap[component]?.[size];
      const classes = [];
  
      if (size === baseSize && base) classes.push(base);
      if (prefixed) classes.push(prefixed);
  
      return classes;
    });
  
    const fontClasses = sortedFontSizes.flatMap(size => {
      const base = fontSizeBaseMap[size];
      const prefixed = fontSizePrefixedMap[size];
      const classes = [];
  
      if (size === baseFontSize && base) classes.push(base);
      if (prefixed) classes.push(prefixed);
  
      return classes;
    });
  
    return clsx(spacingClasses, fontClasses);
  }