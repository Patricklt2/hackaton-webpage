'use client';
// NOTE: Deprecated, not in use in the app
import {
  Text,
  Button,
  VStack,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  Image,
  Center,
} from "@chakra-ui/react";

const SecondStep = ({ nextStep, prevStep }) => {
  const divStyle = {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "100%",
    display: "flex",
    "justify-content": "center",
    padding: "2.5%",
  };

  const moveForward = () => {
    //Asign image with setter
    nextStep();
  };

  return (
    <VStack>
      <Breadcrumb separator={">"} w="full" padding={"2%"} fontSize="3xl">
        <BreadcrumbItem>
          <Text fontSize={["xl", "2xl", "3xl"]}>Inscripción</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text color={"orange"} fontSize={["xl", "2xl", "3xl"]}>
            Datos equipo
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <Text
        paddingTop={"1%"}
        paddingBottom={"5%"}
        fontSize={["xl", "2xl", "3xl"]}
      >
        {" "}
        Subí acá el{" "}
        <Text as="span" color="orange">
          {" "}
          logo de tu equipo
        </Text>{" "}
      </Text>
      <div style={divStyle}>
        <Image
          src={"/images/backup.svg"}
          borderRadius={"full"}
          boxSize={["150px", "250px"]}
          alt="image"
        ></Image>
      </div>
      <Center paddingTop="2%">
        <HStack>
          <Button
            onClick={prevStep}
            colorScheme="orange"
            size={["sm", "lg"]}
            height="48px"
            width="200px"
            border="5px"
            color="black"
            variant="solid"
            bgColor="orange"
          >
            Confirmar
          </Button>
          <Button
            onClick={moveForward}
            colorScheme="orange"
            size={["sm", "lg"]}
            height="48px"
            width="200px"
            border="5px"
            color="black"
            variant="solid"
            bgColor="orange"
          >
            Confirmar
          </Button>
        </HStack>
      </Center>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default SecondStep;
