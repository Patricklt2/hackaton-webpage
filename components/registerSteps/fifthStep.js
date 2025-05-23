'use client';

import { useState } from "react";
import {
  Text,
  Button,
  VStack,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  Textarea,
  Center,
} from "@chakra-ui/react";

const FifthStep = ({
  setDesc1,
  desc1,
  setDesc2,
  desc2,
  nextStep,
  prevStep,
}) => {
  const [d1, setD1] = useState(desc1);
  const [d2, setD2] = useState(desc2);
  const [invalidD1, setInvalidD1] = useState(false);
  const [invalidD2, setInvalidD2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleD1 = (e) => {
    setD1(e.target.value);
    setDesc1(e.target.value); //Si no se hace siempre, no se propaga para cuando hay que guardarlo
    setInvalidD1(e.target.value === "");
  };

  const handleD2 = (e) => {
    setD2(e.target.value);
    setDesc2(e.target.value);
    setInvalidD2(e.target.value === "");
  };

  const moveForward = async () => {
    //Hacerlo aca no funciona, por eso se hace cada vez que se cambie
    setIsLoading(true);
    await nextStep();
    setIsLoading(false);
  };
  const moveBackwards = () => {
    setDesc1(d1);
    setDesc2(d2);
    prevStep();
  };

  return (
    <VStack w="full">
      <Breadcrumb separator={">"} w="full" padding={"2%"} fontSize="3xl">
        <BreadcrumbItem>
          <Text fontSize={["3xs", "xs", "lg", "2xl"]}>Inscripcion</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text fontSize={["3xs", "xs", "lg", "2xl"]}>Datos equipo</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text fontSize={["3xs", "xs", "lg", "2xl"]}>Mail y Contraseña</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text color="CSLightOrange" fontSize={["3xs", "xs", "lg", "2xl"]}>
            Datos del Equipo
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack w={"full"} align={"center"}>
        <Text align={"center"} fontSize={["sm", "lg", "xl"]}>
          Describe al equipo: intereses, estudios, mentalidad.
        </Text>
        <Textarea
          isInvalid={invalidD1}
          borderWidth="1.5px"
          errorBorderColor="red.500"
          value={d1}
          onChange={handleD1}
          align={"center"}
          textColor={"black"}
          bg="white"
          focusBorderColor="white"
          h={["130px", "140px", "150px"]}
          w={["350px", "500px", "800px"]}
        ></Textarea>
        <Text align={"center"} paddingTop={"3%"} fontSize={["sm", "lg", "xl"]}>
          ¿Por qué les interesa participar en HackITBA?
          <br></br>
          ¿En qué categoría prefieren participar?
        </Text>
        <Textarea
          isInvalid={invalidD2}
          borderWidth="1.5px"
          errorBorderColor="red.500"
          value={d2}
          onChange={handleD2}
          align={"center"}
          textColor={"black"}
          bg="white"
          focusBorderColor="white"
          h={["130px", "140px", "150px"]}
          w={["350px", "500px", "800px"]}
        ></Textarea>
        <VStack>
          <Text fontSize={["sm", "lg", "xl"]} color="red.500">
            {invalidD1 ? "La descripción del equipo no puede estar vacía" : ""}
          </Text>
          <Text fontSize={["sm", "lg", "xl"]} color="red.500">
            {invalidD2
              ? "Los motivos para participar de HackITBA no pueden estar vacíos"
              : ""}
          </Text>
        </VStack>
        <Text paddingTop={"3%"} align={"center"} fontSize={["sm", "md", "lg"]}>
          <Text as="span" color="Red">
            {" "}
            DISCLAIMER:{" "}
          </Text>
          Al completar la inscripción, todos los miembros del equipo aceptan que
          su imagen pertenece a IEEE Computer Society ITBA durante el evento
        </Text>
      </VStack>
      <Center paddingTop="2%">
        <HStack>
          <Button
            onClick={moveBackwards}
            colorScheme="CSLightBlue"
            size={["sm", "lg"]}
            height="48px"
            width="200px"
            border="5px"
            color="black"
            variant="solid"
            bgColor="CSLightBlue"
            _hover={{
              backgroundColor: "CSDarkBlue",
              color: "CSLightBlue",
              border: "1px solid #AFEFF3" //  #AFEFF3 === CSLightBlue
            }}
            isLoading={isLoading}
          >
            Volver
          </Button>
          <Button
            onClick={moveForward}
            colorScheme="CSLightOrange"
            size={["sm", "lg"]}
            height="48px"
            width="200px"
            border="5px"
            color="black"
            variant="solid"
            bgColor="CSLightOrange"
            _hover={{
              backgroundColor: "CSDarkBlue",
              color: "CSLightOrange",
              border: "1px solid #FAD399" //  #FAD399 === CSLightOrange
            }}
            isDisabled={d1 === "" || d2 === ""}
            isLoading={isLoading}
          >
            Inscribirse
          </Button>
        </HStack>
      </Center>
    </VStack>
  );
};

export default FifthStep;
