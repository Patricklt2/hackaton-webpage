import "./global.css";
import React from 'react';
import { ChakraUIProvider } from './chakra-provider';
import Animated from './animate-prescence';

export const metadata = {
  title: "HackITBA",
  authors: [{ name: "Juan Pablo Oriana" }],
  description:
    "HackIT-BA es una hackathon de 36hs desde el 28 al 30 marzo, enmarcada en 3 categorías principales: Salud, Sustentabilidad y Educacion.",
  openGraph: {
    type: "website",
    url: "https://hackitba.com.ar",
    title: "HackIT-BA! by Computer Society ITBA, IEEE Student Chapter",
    description:
      "HackIT-BA es una hackathon de 36hs desde el 28 al 30 marzo, enmarcada en 3 categorías principales: Salud, Sustentabilidad y Educacion.",
    images: [
      {
        url: "https://hackitba.vercel.app/images/newFlyer.jpeg",
        alt: "HackITBA Flyer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackIT-BA! by Computer Society ITBA, IEEE Student Chapter",
    description:
      "HackIT-BA es una hackathon de 36hs desde el 28 al 30 marzo, enmarcada en 3 categorías principales: Salud, Sustentabilidad y Educacion.",
    images: ["https://hackitba.vercel.app/images/newFlyer.jpeg"],
  },
  metadataBase: new URL("https://hackitba.com.ar"),
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <ChakraUIProvider>
          <Animated>
          {children}
          </Animated>
          </ChakraUIProvider>
      </body>
    </html>
  );
}