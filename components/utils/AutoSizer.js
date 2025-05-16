import clsx from "clsx";

const fontSizeMap = {
    '': "", 
'2xs': "text-[0.625rem]",
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  '2xl': "text-2xl",
  '3xl': "text-3xl",
};

const spacingMap = {
  button: {
    '': "", 
    '2xs': "p-0.5 h-4",
    xs: "p-1 h-5",
    sm: "px-1 py-0.5 h-6",
    md: "px-2 py-1 h-7",
    lg: "px-2 py-1 h-8",
    xl: "px-3 py-1 h-10",
  },
};

const breakpoints = ['', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];

function prefixClasses(prefix, classString) {
    return classString
      .split(" ")
      .map(cls => `${prefix}:${cls}`)
      .join(" ");
  }
  
  export function getResponsiveSizeClass(
    sizes = [],
    fontSizes = [],
    { component = "button" } = {}
  ) {
    if (!sizes.length && !fontSizes.length) return "";
  
    const sortedSizes = [...sizes].filter(Boolean).sort(
      (a, b) => breakpoints.indexOf(a) - breakpoints.indexOf(b)
    );
    const baseSize = sortedSizes[0] || "";
  
    const sortedFontSizes = [...fontSizes].filter(Boolean).sort(
      (a, b) => breakpoints.indexOf(a) - breakpoints.indexOf(b)
    );
    const baseFontSize = sortedFontSizes[0] || "";
  
    return clsx(
      sizes.map(size => {
        if (!size) return "";
        const spacing = spacingMap[component]?.[size];
        if (!spacing) return "";
        return size === baseSize ? spacing : prefixClasses(size, spacing);
      }),
      fontSizes.map(fontSize => {
        if (!fontSize) return "";
        const fontClass = fontSizeMap[fontSize];
        if (!fontClass) return "";
        return fontSize === baseFontSize ? fontClass : prefixClasses(fontSize, fontClass);
      })
    );
  }