'use client';

import { Button } from "@/components/UI/button";

const shadTest = () => {
    return (
        <div className="mt-20 text-2xl">
                hola mundo
                <Button variant="ingresar" rSize={[ "xs", "sm", "md", "lg", "xl"]}
                    rFontSize={["xs", "sm", "md", "lg", "xl"]}>   
                    Iniciar Sesion
                </Button>
        </div>
    );
}

export default shadTest;