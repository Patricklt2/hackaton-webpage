'use client';

import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";
import auth from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import useStore from "../../config/storeConfig";
import { axiosApiInstance, setAxiosToken } from "../../config/axiosConfig";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];

const IngresarButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;
  color: #14192D;

  svg path {
    fill: #1e212a;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #AFEFF3;
    border: 1px solid #AFEFF3;

    svg path {
      fill: #AFEFF3;
    }
  }
`;

const InscribirseButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;
  color: #14192D;

  svg path {
    fill: #1e212a;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #FAD399;
    border: 1px solid #FAD399;

    svg path {
      fill: #2fe0b5;
    }
  }
`;

const Home = () => {
  const router = useRouter();
  const storeSignIn = useStore((state) => state.signIn);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErorrMessage] = useState("");
  const handleEmailChange = (event) => setEmail(event.target.value.trim());
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePasswordKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await signIn(email, password);
    }
  }


  const [registerSection, setRegisterSection] = useState();
  const inscriptionsEnabled = useStore((state) => state.inscriptionsEnabled);

  useEffect(() => {
    if (inscriptionsEnabled) {
      setRegisterSection(
        <>
          <Text mt="4%" fontSize={TextSize}>
            ¿No estás inscripto?
          </Text>
          <InscribirseButton
            isLoading={isLoading}
            backgroundColor="CSLightOrange"
            width="full"
            onClick={() => {
              location.href = "/register";
            }}
          >
            Registrarse
          </InscribirseButton>
        </>
      );
    }
  }, [inscriptionsEnabled, isLoading]);

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await credentials.user.getIdToken();
      await setAxiosToken(token);
      const userInfo = (
        await axiosApiInstance.get(`/users/${credentials.user.uid}`)
      ).data;

      storeSignIn(userInfo, token);
      router.push("/profile");
    } catch (err) {
      setErorrMessage(
        "Ocurrio un error, revisa el que el email y la contraseña sean correctos"
      );
    }
    setIsLoading(false);
  };

  return (
    <VStack width="full" direction="column" justifyContent="space-between">
      <Img
        paddingTop="2%"
        src="/images/chars-corner-left.png"
        alt="decoration image"
        alignSelf="start"
        w={["18%", "15%", "12%", "10%", "8%"]}
      ></Img>
      <Flex
        gap="2em"
        align="center"
        direction="column"
        width={["85%", "65%", "50%", "40%", "30%"]}
      >
        <Heading size={HeadingSize}>Iniciar sesión</Heading>
        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <EmailIcon />
          </InputLeftElement>
          <Input
            value={email}
            onChange={handleEmailChange}
            minH="3.5em"
            placeholder="Ingresá tu email"
            borderWidth="1.5px"
            focusBorderColor="CSOrange"
            errorBorderColor="red.500"
            borderRadius="4px"
            backgroundColor="white"
            color="black"
            _placeholder={{ color: "gray" }}
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <LockIcon />
          </InputLeftElement>
          <Input
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handlePasswordKeyPress}
            type={showPassword ? "text" : "password"}
            minH="3.5em"
            placeholder="Ingresá tu contraseña"
            borderWidth="1.5px"
            focusBorderColor="CSOrange"
            errorBorderColor="red.500"
            borderRadius="4px"
            backgroundColor="white"
            color="black"
            _placeholder={{ color: "gray" }}
          ></Input>
          <InputRightElement minH="3.5em">
            <IconButton
              color="black"
              icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
              onClick={() => setShowPassword(!showPassword)}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        <Link href="/forgot-password">
          <Text
            fontSize={TextSize}
            cursor="pointer"
            _hover={{ color: "CSLightBlue" }}
          >
            ¿Olvidaste tu contraseña?
          </Text>
        </Link>
        <Text fontSize={TextSize} color="red.500">
          {errorMessage}
        </Text>
        <IngresarButton
          isLoading={isLoading}
          disabled={email === "" || password === ""}
          onClick={() => signIn(email, password)}
          backgroundColor="CSLightBlue"
          width="full"
        >
          Ingresar
        </IngresarButton>
        {registerSection}
      </Flex>
    </VStack>
  );
};

export default Home;
