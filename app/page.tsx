"use client";

import React, { useEffect, useState } from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Grid,
  Img,
  VStack,
  Divider,
  Spacer,
  HStack,
  GridItem,
  Stack,
  Input,
  Textarea,
  StackDivider,
  useToast,
  Box,
  CircularProgress,
} from "@chakra-ui/react";
import SponsorLogo from "../components/SponsorLogo";
import styled from "@emotion/styled";
import NewLogo from "../components/NewLogo";
import NewCategoryLogo from "../components/NewCategoryLogo";
import Jury from "../components/Jury";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import joi from "joi";
import useStore from "../config/storeConfig";
import NewJury from "../components/NewJury";
import Mentor from "../components/Mentor";

const PrimaryButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;

  svg path {
    fill: #afeff3;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #afeff3;
    border: 1px solid #afeff3;

    svg path {
      fill: #afeff3;
    }
  }
`;

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];
//Dejamos algunos subcomponentes aca, no los hago como componentes porque no se reutilizan
const GeneralInfo = ({ ...extendedProps }) => {
  return (
    <VStack spacing={4} paddingX="5%" w="full" {...extendedProps}>
      <Heading
        as="h1"
        display="inline"
        size={HeadingSize}
        color="CSLightOrange"
        textAlign={"center"}
        paddingY="6px"
      >
        ¿Qué es HackITBA?
      </Heading>
      <Divider variant="thick"></Divider>
      <Text textAlign="center" fontSize={TextSize}>
        <Text as="span" color="CSLightBlue">
          HackITBA
        </Text>{" "}
        es una hackathon presencial organizada por y para estudiantes, donde, en
        grupos de 4 personas, deben generar un MVP en 36 horas de competencia
        intensiva.
      </Text>
      <Text textAlign="center" fontSize={TextSize}>
        La competencia tiene como meta promover soluciones creativas a problemas
        actuales en un ambiente desafiante y cooperativo.
      </Text>
      <Divider variant="thick"></Divider>
      <Text textAlign="center" fontSize={TextSize}>
        La competencia será en el ITBA (Iguazú 341, Parque Patricios, CABA).
      </Text>
      <Divider variant="thick"></Divider>
    </VStack>
  );
};
const Categories = ({ ...extendedProps }) => {
  const categories = [
    {
      name: "Salud",
      description: `La categoría de **Salud y Bienestar** busca soluciones innovadoras para mejorar la calidad de vida y el acceso a servicios de salud. Considera temas como:
-   **Acceso a información y servicios de salud.**
-   **Apoyo en rehabilitación y movilidad.**
-   **Innovación en comercio de salud.**
\nLos proyectos pueden enfocarse en promover la salud en cualquier área, facilitando el bienestar físico y mental en diversos entornos.`,
      scope: [],
      logo: "/images/categories/new-salud.png",
      logoSvg: false,
      logoSmall: "/images/categories/codySaludSmall.png",
      color: "CSRed",
    },
    {
      name: "Sustentabilidad",
      description: `La categoría de **Sustentabilidad** busca soluciones creativas y aplicables para promover un equilibrio entre el desarrollo económico, social y ambiental. Considera temas como:

-   **Reducción de la huella ecológica.**
-   **Optimización del uso de recursos naturales.**
-   **Economía circular y reciclaje.**
-   **Energías renovables y eficiencia energética.**
-   **Gestión y mitigación de residuos.**
-   **Conservación de biodiversidad y ecosistemas.**

\nLos proyectos pueden enfocarse en mejorar la sostenibilidad en cualquier área, desde la vida cotidiana hasta las operaciones industriales y comerciales.`,
      scope: [],
      logo: "/images/categories/new-sustentabilidad.png",
      logoSmall: "/images/categories/codySustentableSmall.png",
      logoSvg: false,
      color: "CSGreen",
    },
    {
      name: "Educación",
      description: `La categoría de **Educación** busca soluciones prácticas e innovadoras que mejoren el aprendizaje y preparen a las personas con habilidades clave para enfrentar los desafíos actuales, desde la educación financiera hasta el acceso digital y el desarrollo profesional.

-   **Educación financiera práctica**: Proyectos que enseñen el manejo del dinero desde conceptos básicos hasta inversiones, ahorro, presupuesto personal y planificación financiera.
-   **Acceso universal a la educación digital**.
-   **Apoyo a docentes y facilitadores**.
-   **Inclusión y equidad educativa**.`,
      scope: [],
      logo: "/images/categories/new-edu.png",
      logoSmall: "/images/categories/codyEducativoSmall.png",
      logoSvg: false,
      color: "CSBlue",
    },
  ];
  return (
    <VStack spacing={4} paddingX="5%" paddingY="5%">
      <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
        Categorías
      </Heading>
      <Flex
        width="full"
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="start"
        verticalAlign="top"
        {...extendedProps}
      >
        {/* Es feo pasar el array, pero es lo que se me ocurrio para que se muestre bien con distintas formas  */}
        {categories.map((category) => {
          return <NewCategoryLogo key={category.name} category={category} />;
        })}
      </Flex>
    </VStack>
  );
};
const InscriptionSection = ({ ...extendedProps }) => {
  const imageWidth = ["25%", "28%", "25%", "28%"];
  const vstackWidth = ["40%", "100%", "50%", "21%", "25%", "22%"];
  const pbFontSize = ["2xs", "xs", "sm", "lg", "xl", "3xl"];
  const pbSize = ["2xs", "xs", "sm", "md", "2xl", "xl"];
  const pbMT = [3, 5, 5, 7, 9, 20];
  return (
    <Flex
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      height="20%"
      {...extendedProps}
    >
      <Img
        src="/images/chars-left.png"
        alt="Decoration"
        width={imageWidth}
      ></Img>
      <VStack justify="center" width={vstackWidth}>
        <Heading size={["xs", "sm", "md", "md", "xl", "xl"]} textAlign="center">
          Inscripción por equipos
        </Heading>
        <PrimaryButton
          mt={pbMT}
          height="2%"
          backgroundColor="CSLightBlue"
          color="CSDarkBlue"
          fontSize={pbFontSize}
          size={pbSize}
          onClick={() => {
            location.href = "/register";
          }}
        >
          INSCRIBITE ACÁ
        </PrimaryButton>
      </VStack>
      {/* TODO: Turn on for next event? */}
      {/* <Spacer />
      <VStack justify="center" width={vstackWidth}>
        <Heading size={["xs", "sm", "md", "md", "xl", "xl"]} textAlign="center">
          Convertite en Sponsor/Jurado
        </Heading>
        <PrimaryButton
          mt={pbMT}
          height="2%"
          backgroundColor="CSGreen"
          fontSize={pbFontSize}
          size={pbSize}
          onClick={() => {
            location.href = "/SMJ";
          }}
        >
          CONTACTANOS AQUI
        </PrimaryButton>
      </VStack> */}
      <Img
        src="/images/chars-right.png"
        alt="Decoration"
        width={imageWidth}
      ></Img>
    </Flex>
  );
};
const JurySection = ({ ...extendedProps }) => {
  const juries = [
    {
      name: "Juan Manuel Costa",
      imgSrc: "/images/juries/JuanManuelCosta.jpg",
      details: ["CTO @ IOL Inversiones"],
      mail: null,
      linkedin: "https://www.linkedin.com/in/jcosta",
      description:
        "✅ CTO de IOL con experiencia en el desarrollo e implementación de soluciones tecnológicas en distintas idustrias, incluida fintech.\n\n" +
        "&nbsp; \n\n" +
        "✅ Se especializa en abordar desafíos complejos y en diseñar soluciones eficientes que impulsan el crecimiento de IOL.",
      revealed: true,
    },
    {
      name: "Patricia Jebsen",
      imgSrc: "/images/juries/PatriciaJebsen.png",
      details: [
        "Board Member y Business Advisor en empresas de tecnología y e-commerce",
        "Creadora de contenido",
      ],
      mail: "jebsenpatricia@gmail.com",
      linkedin: null,
      description:
        "✅ Miembro de directorios en empresas de tecnología y retail, y consultora en eCommerce y omnicanalidad.\n\n" +
        "&nbsp; \n\n" +
        "✅ Directora del Programa de Negocios Digitales (UTDT) y docente en UBA, UDESA y USAL.\n\n" +
        "&nbsp; \n\n" +
        "✅ Como Presidenta de CACE, lanzó el primer Cyber Monday y Hot Sale en Argentina.\n\n" +
        "&nbsp; \n\n" +
        "✅ Ex ejecutiva en Rappi, Beat, Mercado Libre, Falabella y Cencosud, liderando estrategias digitales y omnicanalidad.",
      revealed: true,
    },
    {
      name: "Conrado Mader Blanco",
      imgSrc: "/images/juries/ConradoMaderBlanco.jpg",
      details: ["CTO @ CUX", "Ex CTO @ Coderhouse", "Exited Founder @ Wolox"],
      mail: "cmaderblanco@gmail.com",
      linkedin: "https://www.linkedin.com/in/conrado-mader-blanco/",
      description:
        "✅ CTO de Cux, app que usa IA para mejorar la salud mental y asistir a sus usuarios en momentos clave.\n\n" +
        "&nbsp; \n\n" +
        "✅ Co-fundador de Wolox, un innovation studio que creció por toda Latam y fue adquirido por Accenture.",
      revealed: true,
    },
    {
      name: "Gaspar Mac",
      imgSrc: "/images/juries/GasparMac.jpg",
      details: [
        "Co-Founder & CEO @ nativas.la",
        "Co-Founder & Chairman @ Warecloud",
        "Founder & Board Member @ eCloud Agency",
        "Founder & Board Member @ Smod",
      ],
      mail: "gaspar@nativas.ar",
      linkedin: "https://www.linkedin.com/in/gasparmac/",
      description:
        "✅ Co-fundador y director ejecutivo de @nativas.la.\n\n" +
        "&nbsp; \n\n" +
        "✅ Co-fundador de @warecloud.ar, para crear empresas que buscan hacer negocios de manera diferente.\n\n" +
        "&nbsp; \n\n" +
        "✅ Fundador y director general de @smod.io, que revolucina la movilidad sustentable en Latam.\n\n" +
        "&nbsp; \n\n" +
        "✅ Desarrollador de Bauhoff y trabja en la creación de una red de Condo Hoteles.\n\n" +
        "&nbsp; \n\n" +
        "✅ Fundador y CEO de @ecloud.agency, de innovación y desarrollo de software que diseña productos digitales con foco en triple impacto.",
      revealed: true,
    },
    {
      name: "Juan José Aranguren",
      imgSrc: "/images/juries/JuanJoseAranguren.png",
      details: [
        "Ex Presidente @ Shell Argentina",
        "Ex Ministro de Energía y Minería de la Nación",
        "Director de la Maestría de Desarrollo Energético Sustentable @ ITBA",
      ],
      mail: null,
      linkedin: null,
      description:
        "✅ Director de Energy Consilium y de la Maestría en Desarrollo Energético Sustentable en ITBA.\n\n" +
        "&nbsp; \n\n" +
        "✅ Ex Ministro de Energía y Minería (2015-2018).\n\n" +
        "&nbsp; \n\n" +
        "✅ Reconocido con el Premio Konex de Platino y múltiples distinciones como CEO del año.\n\n" +
        "&nbsp; \n\n" +
        "✅ Ex Presidente de Shell Argentina (2003-2015), con 37 años en la compañía.",
      revealed: true,
    },
    {
      name: "Luciano Muratore",
      imgSrc: "/images/juries/LucianoMuratore.png",
      details: ["Co-Founder, Board Member & VP of Customer Relations @ Wúru"],
      mail: "luciano.muratore@wuru.ai",
      linkedin: "https://www.linkedin.com/in/luciano-muratore/",
      description:
        "✅ Co-Founder, Board Member y VP de Customer Relations en Wúru.\n\n" +
        "&nbsp; \n\n" +
        "✅ +15 años liderando negocios de salud en Latam.\n\n" +
        "&nbsp; \n\n" +
        "✅ Desde Wúru, impulsa la automatización con IA para liberar a profesionales de la salud de tareas administrativas en Latam y España.",
      revealed: true,
    },
    {
      name: "Nahuel Lema",
      imgSrc: "/images/juries/NahuelLema.png",
      details: ["Cofunder @ Coderhouse", "Startup Mentor @ Emprelatam"],
      mail: "nahuel@coderhouse.com",
      linkedin: "https://www.linkedin.com/in/nahuellema/",
      description:
        "✅ Apasionado por la educación y la formación continua.\n\n" +
        "&nbsp; \n\n" +
        "✅ Como desarrollador, sentó las bases tecnológicas que hicieron de Coderhouse la plataforma de educación online en vivo más grande de Latam.\n\n" +
        "&nbsp; \n\n" +
        "✅ Hoy conecta empresas, organizaciones y gobiernos con Coderhouse para impulsar la formación en habilidades digitales.",
      revealed: true,
    },
  ];
  return (
    <VStack width="full" {...extendedProps}>
      <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
        Jurados
      </Heading>
      <Text fontSize={TextSize}>Conocé a nuestros jurados</Text>
      <Flex
        width="full"
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="start"
        verticalAlign="top"
      >
        {juries.map((jury, index) => {
          return (
            <NewJury
              key={index}
              jury={jury}
              my="2%"
              mx="4%"
              minWidth="100px"
              width={["20%"]}
            />
          );
        })}
      </Flex>
    </VStack>
  );
};

const MentorsSection = ({ ...extendedProps }) => {
  const mentors = [
    {
      name: "José Abuchaem",
      imgSrc: "/images/mentors/JoseAbuchaem.jpeg",
      details: ["Software Engineer @ Podcast App | Co-Founder @ Tienda Nube"],
      mail: "jabuchae@gmail.com",
      linkedin: "https://www.linkedin.com/in/jabuchae/",
      description:
        "✅ Co-Founder y ex CFO/CMO @ Tiendanube\n\n" +
        "&nbsp; \n\n" +
        "✅ Software Engineer @ Podcast App\n\n" +
        "&nbsp; \n\n" +
        "✅ Mentor @ OZOM Builders y Advisor @ SimpleState\n\n",
      revealed: true,
    },
    {
      name: "Alejandro Bezdjian",
      imgSrc: "/images/mentors/AlejandroBezdjian.png",
      details: ["Sr Software Engineer | Co-Founder @ Xtract"],
      mail: "alejandro@xtract.app",
      linkedin: "https://www.linkedin.com/in/alebian",
      description:
        "✅ Co-Founder @ Xtract\n\n" +
        "&nbsp; \n\n" +
        "✅ Mentor @ Codementor\n\n" +
        "&nbsp; \n\n" +
        "✅ Ex Sr Software Engineer @ Klarna\n\n",
      revealed: true,
    },
    {
      name: "Alejandro Sergio D'Alessandro",
      imgSrc: "/images/mentors/AlejandroDalessandro.png",
      details: ["Docente en ITBA | CEO @ EPA Bienestar AI"],
      mail: "adalessandro@itba.edu.ar",
      linkedin: "https://www.linkedin.com/in/drdalessandro/",
      description:
        "✅ Docente Universitario IT\n\n" +
        "&nbsp; \n\n" +
        "✅ Emprendedor @ EPA Bienestar con Datos y Estándares en Salud Digital\n\n" +
        "&nbsp; \n\n" +
        "✅ Cardiólogo\n\n",
      revealed: true,
    },
    {
      name: "German Gross",
      imgSrc: "/images/mentors/GermanGross.jpg",
      details: ["Head of Architecture @ Banco Galicia"],
      mail: "germangross@gmail.com",
      linkedin: "https://www.linkedin.com/in/germangross/",
      description:
        "✅ Head of Architecture @ Banco Galicia\n\n" +
        "&nbsp; \n\n" +
        "✅ Ex Sr. Director of Engineering @ Wildlife Studios\n\n" +
        "&nbsp; \n\n" +
        "✅ Ex IT Governance Senior Manager @ Mercado Libre\n\n" +
        "&nbsp; \n\n" +
        "✅ Egresado de Ingeniería en Informática @ ITBA\n\n",
      revealed: true,
    },
    {
      name: "Javier Jafella",
      imgSrc: "/images/mentors/JavierJafella.jpg",
      details: ["Jefe de Sustentabilidad @ Laboratorios Andrómaco"],
      mail: "jjafella@andromaco.com.ar",
      linkedin: "linkedin.com/in/javier-jafella-41733346",
      description:
        "✅ Jefe de Sustentabilidad @ Laboratorios Andrómaco\n\n" +
        "&nbsp; \n\n" +
        "✅ +18 años de experiencia en innovación y desarrollo de productos sustentables\n\n" +
        "&nbsp; \n\n" +
        "✅ Especialista en estrategias de sustentabilidad en el sector cosmético y de salud\n\n",
      revealed: true,
    },

    {
      name: "Pablo Lorenzato",
      imgSrc: "/images/mentors/PabloLorenzatto.jpg",
      details: ["CTO & Co-Founder @ MUTT DATA"],
      mail: "pablo@muttdata.ai",
      linkedin: "https://www.linkedin.com/in/plorenzatto/",
      description:
        "✅ Co-Founder y CTO @ Mutt Data\n\n" +
        "&nbsp; \n\n" +
        "✅ Especialista en Data Science, AI y Big Data\n\n" +
        "&nbsp; \n\n" +
        "✅ Ex profesor @ Digital House e ITBA, miembro comité de AI @ UdeSA\n\n",
      revealed: true,
    },
    {
      name: "Tomás Marconi",
      imgSrc: "/images/mentors/TomasMarconi.png",
      details: ["Co-Founder @ Xtract"],
      mail: "tomas@xtract.app",
      linkedin: "https://www.linkedin.com/in/tom%C3%A1s-marconi-024374257/",
      description:
        "✅ Co-Founder & CEO @ Xtract\n\n" +
        "&nbsp; \n\n" +
        "✅ Ingeniero en Sistemas y Administración de Empresas ITBA\n\n" +
        "&nbsp; \n\n" +
        "✅ Experiencia en B2B, automatización y fintech\n\n",
      revealed: true,
    },
    {
      name: "Ariel Mirra",
      imgSrc: "/images/mentors/ArielMirra.jpeg",
      details: [
        "Sr Software Engineer @ Salesforce | Profesor de emprendedurismo",
      ],
      mail: "ariel.mirra@ing.austral.edu.ar",
      linkedin: "https://www.linkedin.com/in/arielmirra/",
      description:
        "✅ Docente de Emprendedurismo en Universidad Austral\n\n" +
        "&nbsp; \n\n" +
        "✅ Creador de contenido en tecnología y host del podcast @ esporahi.dev\n\n" +
        "&nbsp; \n\n" +
        "✅ Mentor de emprendedores tecnológicos, impulsando el desarrollo de startups de alto impacto\n\n",
      revealed: true,
    },
    {
      name: "Cristobal Papendieck",
      imgSrc: "/images/mentors/CristobalPapendieck.webp",
      details: ["Founder & COO @ DMOdesigncompany"],
      mail: "cristobal.papendieck@dmo.company",
      linkedin: "https://www.linkedin.com/in/cristobalpapendieck/",
      description:
        "✅ Founder, COO, Head of Design @ DMOdesigncompany\n\n" +
        "&nbsp; \n\n" +
        "✅ Co-founder @ Clonify\n\n" +
        "&nbsp; \n\n" +
        "✅ Founding member @ Iotly\n\n",
      revealed: true,
    },

    {
      name: "Marisabel Rodriguez",
      imgSrc: "/images/mentors/MarisabelRodriguez.png",
      details: ["AI Services Manager @ Google Cloud | Senior Member IEEE"],
      mail: "marisabel@ieee.org",
      linkedin: "https://www.linkedin.com/in/marisabelrb/",
      description:
        "✅ AI Services Manager @ Google Cloud \n\n" +
        "&nbsp; \n\n" +
        "✅ Ex Cloud Delivery Center Manager @ Google \n\n" +
        "&nbsp; \n\n" +
        "✅ Senior Member @ IEEE \n\n",
      revealed: true,
    },

    {
      name: "Federico Viarnés",
      imgSrc: "/images/mentors/FedericoViarnes.jpeg",
      details: ["CTO & Co-Founder @ volanti.ai"],
      mail: "fede.viar@gmail.com",
      linkedin: "https://www.linkedin.com/in/viarnes/",
      description:
        "✅ CTO & Co-Founder @ volanti.ai \n\n" +
        "&nbsp; \n\n" +
        "✅ Ex VP of Product @ Buenbit \n\n" +
        "&nbsp; \n\n" +
        "✅ Desarrollador de proyectos en Blockchain \n\n",
      revealed: true,
    },
    {
      name: "Martin Zahnd",
      imgSrc: "/images/mentors/MartinZahnd.png",
      details: ["Ex CTO @ Woocar | Ex CS"],
      mail: "mzahnd@itba.edu.ar",
      linkedin: "https://www.linkedin.com/in/martin-e-zahnd/",
      description:
        "✅ Ex CTO @ Woocar \n\n" +
        "&nbsp; \n\n" +
        "✅ Backend Dev Ssr. @ Mendel \n\n" +
        "&nbsp; \n\n" +
        "✅ Ingeniero en Informática ITBA \n\n" +
        "&nbsp; \n\n" +
        "✅ Ex miembro de Computer Society \n\n",
      revealed: true,
    },
    {
      name: "Matías Piñero",
      imgSrc: "/images/mentors/MatiasPiñero.jpg",
      details: ["Software Engineer @ IOL"],
      mail: "",
      linkedin: "https://www.linkedin.com/in/matias-pinero/",
      description:
        "✅ Frontend Developer \n\n" +
        "&nbsp; \n\n" +
        "✅ Engineering Manager @ IOL \n\n" +
        "&nbsp; \n\n",
      revealed: true,
    },
    {
      name: "Pablo Fernandez",
      imgSrc: "/images/mentors/PabloFernandez.jpg",
      details: ["Software Engineer @ IOL"],
      mail: "",
      linkedin: "https://www.linkedin.com/in/fernandezpablo85/",
      description:
        "✅ Software Engineer @ IOL\n\n" +
        "&nbsp; \n\n",
      revealed: true,
    },
    {
      name: "Federico Macchi",
      imgSrc: "/images/mentors/FedericoMacchi.jpg",
      details: ["Software Engineer @ IOL"],
      mail: "",
      linkedin: "https://www.linkedin.com/in/federico-macchi-44a7a182/",
      description:
        "✅ Software Engineer @ IOL" +
        "&nbsp; \n\n",
      revealed: true,
    },
  ];
  return (
    <VStack width="full" {...extendedProps}>
      <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
        Mentores
      </Heading>
      <Text fontSize={TextSize}>
        Mentores expertos en tecnología y negocios
      </Text>
      <Flex
        width="full"
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="start"
        verticalAlign="top"
      >
        {mentors
          .toSorted((m1, m2) =>
            m1.name.toLowerCase().localeCompare(m2.name.toLowerCase())
          )
          .map((mentor, index) => {
            return (
              <Mentor
                key={index}
                mentor={mentor}
                my="2%"
                mx="4%"
                minWidth="100px"
                width={["20%"]}
              />
            );
          })}
      </Flex>
    </VStack>
  );
};

const SponsorsSection = ({ ...extendedProps }) => {
  const sponsors = [
    {
      name: "Diamond",
      items: [
        {
          name: "IOL",
          theme: "Educación",
          logo: "/images/logos/IOL.png",
          link: "https://www.invertironline.com/",
        },
        {
          name: "Boston Scientific",
          theme: "Salud",
          logo: "/images/logos/BostonScientific.png",
          link: "https://www.bostonscientific.com/es-ar/home.html",
        },
        {
          name: "Accenture",
          theme: "Sustentabilidad",
          logo: "/images/logos/Accenture.png",
          link: "https://www.accenture.com/ar-es",
        },
      ],
      dimensions: ["83%", "83%", "73%", "68%", "63%"],
    },
    {
      name: "Gold",
      items: [
        {
          name: "Emprelatam",
          theme: "",
          logo: "/images/logos/emprelatam.png",
          link: "https://emprelatam.com/",
        },
        {
          name: "Tango ID",
          theme: "",
          logo: "/images/logos/tangoid.png",
          link: "https://www.tangoid.com.ar/",
        },
        {
          name: "Droguería Del Sud",
          theme: "",
          logo: "/images/logos/DDS.png",
          link: "https://www.delsud.com.ar",
        },
      ],
      dimensions: ["78%", "78%", "68%", "63%", "58%"],
    },
    {
      name: "Platinum",
      items: [
        {
          name: "MultiLED",
          theme: "",
          logo: "/images/logos/multiled.png",
          link: "https://multiled.com.ar/",
        },
        {
          name: "Xtract",
          theme: "",
          logo: "/images/logos/xtract.png",
          link: "https://www.xtract.app/",
        },
        {
          name: "La Anónima",
          theme: "",
          logo: "/images/logos/laanonima.png",
          link: "https://www.laanonima.com.ar/",
        },
      ],
      dimensions: ["73%", "73%", "63%", "58%", "53%"],
    },
    {
      name: "Silver",
      items: [
        {
          name: "Deloitte",
          theme: "",
          logo: "/images/logos/deloitte.svg",
          link: "https://www2.deloitte.com/ar",
        },
        {
          name: "Zennon",
          theme: "",
          logo: "/images/logos/zennon.png",
          link: "https://zennonbi.com/",
        },
      ],
      dimensions: ["68%", "68%", "58%", "53%", "48%"],
    },
  ];

  return (
    <VStack w="full" mt={0} {...extendedProps}>
      {/*<Img
        src="/images/Sponsor_corner_1.svg"
        alt="decoration image"
        alignSelf="start"
        w={["20%", "18%", "15%", "12%", "10%"]}
      ></Img>*/}
      <VStack top="-1">
        <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
          Sponsors 2025
        </Heading>
        <Text fontSize={TextSize}>Empresas que nos acompañan</Text>

        {/* aca arranca */}

        {sponsors.map((theme, idx) => {
          return (
            <Box key={theme.name} align="center" pt="1%" pb="2%" width="100%">
              <Heading textAlign="center" pb="1%" size={TextSize}>
                {theme.name}
              </Heading>
              <Grid
                paddingX={`${idx * 3 + 6}%`}
                templateColumns={`repeat(${theme.items.length},1fr)`}
                w="full"
              >
                {theme.items.map((sponsor) => {
                  return (
                    <GridItem padding="1%" pt="2%" key={sponsor.name}>
                      <Heading size={TextSize} textAlign="center">
                        {sponsor.theme}
                      </Heading>
                      <Box paddingBottom="4%"></Box>
                      <SponsorLogo
                        height={theme.dimensions}
                        width={theme.dimensions}
                        link={sponsor.link}
                        logo={sponsor.logo}
                        name={sponsor.name}
                      ></SponsorLogo>
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>
          );
        })}

        {/* <Text fontSize={TextSize}>Próximamente...</Text> */}
      </VStack>
      <VStack
        px="8%"
        pt="2%"
        divider={<StackDivider variant="thick"></StackDivider>}
        w="full"
      >
        {/* TODO - Descomentar esto cuando estén todos los sponsors
        sponsors.map((category) => {
          let columns;
          switch (category.name) {
            case "Standard":
              columns = "repeat(4, 1fr)";
              break;
            case "Black":
              columns = "repeat(3, 1fr)";
              break;
            default:
              columns = `repeat(${category.items.length},1fr)`;
          }

          return (
            <Box key={category.name} align="center" pt="1%" width="100%">
              <Heading textAlign="center" size={TextSize}>
                {category.name}
              </Heading>
              {/* Lo dejamos como para que sea una fila por categoría *\/}
              <Grid paddingX="6%" templateColumns={columns} w="full">
                {category.items.map((sponsor) => {
                  return (
                    <GridItem padding="1%" pt="2%" key={sponsor.name}>
                      <SponsorLogo
                        height={category.dimensions}
                        width={category.dimensions}
                        link={sponsor.link}
                        logo={sponsor.logo}
                        name={sponsor.name}
                      ></SponsorLogo>
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>
          );
        })*/}
      </VStack>
      {/*<Img
        src="/images/Sponsor_corner_2.svg"
        alt="decoration image"
        alignSelf="end"
        w={["20%", "18%", "15%", "12%", "10%"]}
      ></Img>*/}
    </VStack>
  );
};

//Tiene que estar definido aca, si no pierde focus cada vez que se agrega una tecla
//https://github.com/final-form/react-final-form/issues/730
const LocalInput = ({ ...extendedProps }) => (
  <Input
    borderWidth="1.5px"
    errorBorderColor="red.500"
    focusBorderColor="white"
    borderRadius="4px"
    backgroundColor="CSAltField"
    color="white"
    _placeholder={{ color: "white" }}
    {...extendedProps}
  ></Input>
);
const Form = ({ ...extendedProps }) => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emailError, setEmailError] = useState(false);
  //Estos errores estan para que de entrada no este como error, pero que si cuando empiece a completar y deje ese
  const [subjectError, setSubjectError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validateEmail = (email) => {
    return (
      joi
        .string()
        .email({ tlds: { allow: false } })
        .validate(email).error === undefined
    );
  };
  const sendEmail = async () => {
    const msg = {
      email: email,
      subject: subject,
      body: body,
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_WEBPAGE_TOKEN ,
      },
      body: JSON.stringify(msg),
    };
    setIsLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mail/send`,
        fetchOptions
      );
      toastIdRef.current = toast({
        title: "¡La inscripción fue registrada!",
        status: "success",
        isClosable: true,
        duration: 5000,
        render: () => {
          return (
            <Box backgroundColor="green" borderRadius="4px" p="4%" w="full">
              <VStack>
                <HStack w="full">
                  <CheckCircleIcon />
                  <Heading fontSize={HeadingSize}>¡Consulta enviada!</Heading>
                  <Spacer />
                  <Button onClick={() => toast.close(toastIdRef.current)}>
                    Cerrar
                  </Button>
                </HStack>
                <HStack>
                  <Text>Nos comunicaremos por email brevemente</Text>
                  <CircularProgress
                    isIndeterminate
                    color="grey"
                    value={20}
                  ></CircularProgress>
                </HStack>
              </VStack>
            </Box>
          );
        },
      });
      setEmail("");
      setSubject("");
      setBody("");
      setEmailError(false);
      setSubjectError(false);
      setBodyError(false);
    } catch (err) {
      toastIdRef.current = toast({
        title: "¡La inscripción fue registrada!",
        status: "success",
        isClosable: true,
        duration: 5000,
        render: () => {
          return (
            <Box backgroundColor="red.500" borderRadius="4px" p="4%" w="full">
              <VStack>
                <HStack w="full">
                  <CloseIcon />
                  <Heading fontSize={HeadingSize}>¡Ocurrió un error!</Heading>
                  <Spacer />
                  <Button onClick={() => toast.close(toastIdRef.current)}>
                    Cerrar
                  </Button>
                </HStack>
                <HStack>
                  <Text>Por favor, intenta nuevamente en un momento</Text>
                  <CircularProgress
                    isIndeterminate
                    color="grey"
                    value={20}
                  ></CircularProgress>
                </HStack>
              </VStack>
            </Box>
          );
        },
      });
    }
    setIsLoading(false);
  };
  return (
    <VStack w={["100%", "100%", "100%", "50%", "40%"]} {...extendedProps}>
      <LocalInput
        onClick={() => setEmailError(!validateEmail(email))}
        onChange={(event) => {
          setEmail(event.target.value);
          setEmailError(!validateEmail(event.target.value));
        }}
        placeholder="Email"
        value={email}
        isInvalid={emailError}
      ></LocalInput>
      <LocalInput
        onClick={() => setSubjectError(subject.length === 0)}
        onChange={(event) => {
          setSubject(event.target.value);
          setSubjectError(event.target.value === "");
        }}
        placeholder="Asunto"
        value={subject}
        isInvalid={subjectError}
      ></LocalInput>
      <Textarea
        onClick={() => setBodyError(body.length === 0)}
        isInvalid={bodyError}
        value={body}
        onChange={(event) => {
          setBody(event.target.value);
          setBodyError(event.target.value === "");
        }}
        height={["4em", "6em", "8em", "10em", "10em"]}
        focusBorderColor="white"
        borderRadius="4px"
        backgroundColor="CSAltField"
        borderWidth="1.5px"
        errorBorderColor="red.500"
        color="white"
        _placeholder={{ color: "white" }}
        placeholder="Mensaje"
      ></Textarea>
      <PrimaryButton
        mt={10}
        width="full"
        _disabled={{
          borderRadius: "4px",
          opacity: 0.4,
          fontWeight: 500,
          borderWidth: "1px",
          transition: "all 0.3s ease",
          padding: "4% 8%",
          "&:hover": {
            backgroundColor: "black",
            color: "#FFFFFF",
            borderRadius: "4px",
            borderWidth: "1px",
            borderColor: "var(--chakra-colors-chakra-border-color)",
            "svg path": {},
          },
        }}
        isDisabled={
          emailError ||
          subjectError ||
          bodyError ||
          email === "" ||
          subject === "" ||
          body === ""
        }
        isLoading={isLoading}
        onClick={sendEmail}
      >
        Enviar
      </PrimaryButton>
    </VStack>
  );
};
const DoubtSection = ({ ...extendedProps }) => {
  const CSImg = "/images/IEEE_CS.png";
  return (
    <Stack
      spacing="4%"
      direction={["column", "column", "row", "row", "row"]}
      width="full"
      justify="center"
      px="4%"
      {...extendedProps}
    >
      <VStack spacing="4%">
        <Heading size={["md", "lg", "xl", "2xl", "3xl"]}>¿Tenés dudas?</Heading>
        <Heading size={["md", "lg", "xl", "2xl", "3xl"]} color="CSOrange">
          ¡Contáctanos!
        </Heading>
        <Img
          paddingY="2%"
          src={CSImg}
          alt="ITBA IEEE Computer Society image"
          width={["200px", "250px", "300px", "450px", "500px"]} // Adjust sizes as needed
        />
      </VStack>
      <Form />
    </Stack>
  );
};

const Editions = () => {
  return (
    <VStack width="full">
      <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
        Ediciones Anteriores
      </Heading>
      <HStack justify="center" spacing="5%">
        <PrimaryButton
          height="2%"
          backgroundColor="CSLightBlue"
          color="#14192D"
          fontSize={["xs", "sm", "xl", "2xl", "3xl"]}
          size={["xs", "xs", "lg", "lg", "lg"]}
          onClick={() => {
            location.href = "/2024";
          }}
        >
          2024
        </PrimaryButton>
        <PrimaryButton
          height="2%"
          backgroundColor="CSLightBlue"
          color="#14192D"
          fontSize={["xs", "sm", "xl", "2xl", "3xl"]}
          size={["xs", "xs", "lg", "lg", "lg"]}
          onClick={() => {
            location.href = "/2023";
          }}
        >
          2023
        </PrimaryButton>
        <PrimaryButton
          height="2%"
          backgroundColor="CSLightBlue"
          color="#14192D"
          fontSize={["xs", "sm", "xl", "2xl", "3xl"]}
          size={["xs", "xs", "lg", "lg", "lg"]}
          onClick={() => {
            location.href = "/2022";
          }}
        >
          2022
        </PrimaryButton>
        <Spacer />
      </HStack>
    </VStack>
  );
};

const ThankYouMessage = () => {
  return (
    <Flex
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      height="20%"
      pt="4%"
      zIndex={90}
    >
      <Img src="/images/chars-left.png" alt="Decoration" width="20%"></Img>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        flexDirection="column"
      >
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} color="#ffffff">
          Muchas gracias por participar
        </Text>
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} color="#ffffff">
          ¡Nos vemos el año que viene!
        </Text>
      </Box>
      <Img src="/images/chars-right.png" alt="Decoration" width="20%"></Img>
    </Flex>
  );
};

const RegisteredSection = () => {
  return (
    <Flex
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      pt="8%"
      zIndex={90}
    >
      <Img src="/images/chars-left.png" alt="Decoration" width={["12%"]}></Img>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        flexDirection="column"
      >
        <Text
          fontSize={["md", "lg", "xl", "2xl", "3xl"]}
          textAlign="center"
          color="#ffffff"
        >
          ¡Muchas gracias por inscribirte!
        </Text>
        <Text
          fontSize={["md", "lg", "xl", "2xl", "3xl"]}
          textAlign="center"
          color="#ffffff"
        >
          Nos estaremos comunicando con vos una vez que cierren las
          inscripciones.
        </Text>
        <Text
          fontSize={["md", "lg", "xl", "2xl", "3xl"]}
          textAlign="center"
          color="#ffffff"
        >
          ¡No te olvides de revisar tu mail!
        </Text>
      </Box>
      <Img src="/images/chars-right.png" alt="Decoration" width={["12%"]}></Img>
    </Flex>
  );
};

const Home = () => {
  const inscriptionsEnabled = useStore((state) => state.inscriptionsEnabled);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const submissions = useStore((state) => state.submissions);
  const [inscriptionsSection, setInscriptionsSection] = useState(<></>);

  useEffect(() => {
    if (inscriptionsEnabled) {
      if (isLoggedIn) {
        setInscriptionsSection(<RegisteredSection />);
        return;
      }
      setInscriptionsSection(<InscriptionSection pt="4%" zIndex={90} />);
      return;
    }

    const now = new Date();
    const submissionsEnd = new Date(submissions?.end);

    if (submissionsEnd < now) {
      setInscriptionsSection(<ThankYouMessage />);
    }
  }, [inscriptionsEnabled, submissions, isLoggedIn]);

  return (
    <VStack>
      {/* Le paso a todos el padding y no lo pongo en gap porque entre workshops y sponsors no tiene que haber espacio */}
      <NewLogo date="28, 29 y 30 de marzo" />
      <GeneralInfo pt="4%" zIndex={90} />
      <Categories pt="4%" zIndex={90} />
      {/* Seccion inscribirse */}
      {inscriptionsSection}
      <JurySection pt="4%" zIndex={90} />
      <MentorsSection pt="4%" zIndex={90} />
      {/* <WorkshopsSection pt='4%' zIndex={90}/> */}
      {/* TODO: sacar pt='4%' cuando vuelvan los workshops */}
      <SponsorsSection zIndex={90} pt="4%" />
      <Editions />
      <DoubtSection pt="4%" zIndex={90} />
      {/* TODO: revisar por que con las particulas no funcionan las animaciones de los logos de sponsors */}
      {/* Lo solucione con zindex, si no creo que toma como que estan atras del canvas que tiene a las particulas */}
    </VStack>
  );
};

export default Home;
