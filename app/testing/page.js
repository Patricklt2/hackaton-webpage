'use client';

import { getResponsiveSizeClass } from "@/components/utils/AutoSizer";
import { Button } from "@/components/UI/button";

const shadTest = () => {
    return (
        <div className="mt-20 text-2xl">
                hola mundo
                <Button variant="ingresar" className={getResponsiveSizeClass([ "xs", "sm", "md", "lg", "xl"], ["xs", "sm", "md", "lg", "xl"], { component: "button" })}>   
                    Iniciar Sesion
                </Button>
        </div>
    );
}

export default shadTest;