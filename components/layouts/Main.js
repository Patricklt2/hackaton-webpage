'use client';

import React from "react";
import { Container, Flex, Spacer } from "@chakra-ui/react";
import NewNavbar from "../NewNavbar";
import Footer from "../UI/footer";

const Main = ({ children }) => {
  return (
    // Es feo usar vh, pero con 100% o full no funciona
    <Flex as="main" overflow="hidden" direction="column" minH="100vh">
      <NewNavbar />
      <Container maxW="full" paddingX={0} pt={16}>
        { children }
      </Container>
      <Spacer />
      {/* Por que no funciona el spacer!!! */}
      <Footer />
    </Flex>
  );
};

export default Main;

