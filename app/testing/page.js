'use client';
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";

const shadTest = () => {
    return (
        <div className="mt-20">
                hola mundo
                <Button variant="ingresar" rSize={[ "xs", "sm", "md", "lg", "xl"]}
                    rFontSize={["xs", "sm", "md", "lg", "xl"]}>   
                    Iniciar Sesion
                </Button>
        </div>
    );
}

export default shadTest;