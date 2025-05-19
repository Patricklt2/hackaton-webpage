'use client';

import { Button } from "@/components/UI/button";
import { VStack } from "@/components/UI/vstack";
import { Text } from "@/components/UI/text";
import { HStack } from "@/components/UI/hstack";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { ResizableImage } from "@/components/UI/resizableImage";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const HackITBAImage = "/images/hackitba-new-logo.png";
    const CSImage = "/images/IEEE_CS.png";

    return (
        <VStack className="mt-24 w-full">
            <Text align="center" rFontSize={["xs", "sm", "md", "lg"]}>
                &copy; {currentYear} Computer Society ITBA Student Branch. Todos los
                derechos reservados.
            </Text>
            <HStack spacing="xl" className="my-2 w-full" justify="center">
                <Button variant="icon" rFontSize={["2xl"]}  aria-label="Instagram"
                onClick={() =>
                    window.open(
                    "https://www.instagram.com/computer.society.itba/?hl=en",
                    "_blank"
                    )
                }>
                    <FaInstagram />
                </Button> 
                <Button variant="icon" rFontSize={["2xl"]}  aria-label="Youtube"
                          onClick={() =>
                    window.open(
                    "https://www.youtube.com/channel/UCGRu7ac5g1M5fuVYPYX8Ifg",
                    "_blank"
                    )
                }>
                    <FaYoutube />
                </Button> 
                <Button variant="icon" rFontSize={["2xl"]}  aria-label="Linkedin" onClick={() =>
                    window.open(
                    "https://www.linkedin.com/company/itba-computer-society/posts/?feedView=all",
                    "_blank"
                    )
                }>
                    <FaLinkedin />
                </Button> 
            </HStack>
            <HStack className="w-full" justify="end" spacing="sm">
                <ResizableImage
                    src={HackITBAImage}
                    ratio={16/9}
                    rSize={['16%']}
                    alt="HackITBA Image"
                />
                <ResizableImage
                    src={CSImage}
                    alt="IEEE Computer Society Image" 
                    ratio={16/9}
                    rSize={['16%']}
                    className="pr-[1%] pb-[1%]"
                />
            </HStack>
        </VStack>
    );
}

const shadTest = () => {
    return (
        <div className="mt-20">
                hola mundo
                <Button variant="ingresar" rSize={[ "xs", "sm", "md", "lg", "xl"]}
                    rFontSize={["xs", "sm", "md", "lg", "xl"]}>   
                    Iniciar Sesion
                </Button>
                <Footer/>
        </div>
    );
}

export default shadTest;