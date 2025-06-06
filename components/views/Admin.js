'use client';
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  EmailIcon,
  LockIcon,
  MinusIcon,
  StarIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Text,
  Flex,
  Spacer,
  IconButton,
  useDisclosure,
  Collapse,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Center,
  InputGroup,
  CircularProgress,
  InputLeftElement,
  Input,
  InputRightElement,
  Box,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosApiInstance } from "../../config/axiosConfig";
import styled from "@emotion/styled";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];
const TeamCard = ({
  team,
  onTeamSelected,
  onTeamRejected,
  ...extendedProps
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [errorrMessage, setErrorMessage] = useState("");
  const rejectTeam = async () => {
    setIsLoading(true);
    try {
      await onTeamRejected();
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Ocurrio un error al rechazar al equipo");
    }
    setIsLoading(false);
  };
  const acceptTeam = async () => {
    setIsLoading(true);
    try {
      await onTeamSelected();
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Ocurrio un error al aceptar al equipo");
    }
    setIsLoading(false);
  };
  return (
    <VStack
      p="2%"
      align="center"
      borderRadius="8px"
      borderWidth="2px 2px 6px 2px"
      borderColor="CSBlue"
      {...extendedProps}
    >
      <Flex
        onClick={onToggle}
        direction="row"
        verticalAlign="middle"
        width="full"
      >
        <Heading
          fontSize={HeadingSize}
        >{`Equipo ${team.number}: ${team.name}`}</Heading>
        <Spacer></Spacer>
        <HStack>
          {team.qualified === undefined ? (
            <MinusIcon color="gray" />
          ) : team.qualified ? (
            <CheckIcon color="CSGreen" />
          ) : (
            <CloseIcon color="red.500" />
          )}
          <IconButton
            _hover={{ backgroundColor: "grey" }}
            mx="4%"
            onClick={onToggle}
            backgroundColor="transparent"
            icon={isOpen ? <MinusIcon /> : <AddIcon />}
          ></IconButton>
        </HStack>
      </Flex>
      <Flex></Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack width="full" align="start">
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Email del equipo:
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.email}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Describe al equipo: intereses, estudios, mentalidad:
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.teamDescription}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            ¿Por qué les interesa participar en HackITBA?
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.motivation}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Participantes
          </Text>
          <Accordion width="full" defaultIndex={[]} allowMultiple>
            {team.participants.map((participant, index) => {
              return (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>{participant.name}</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <VStack align="start" width="full">
                      <Text size={TextSize} textAlign="start" color="CSOrange">
                        DNI:{" "}
                        <Text
                          as="span"
                          size={TextSize}
                          color="white"
                          display="inline"
                        >
                          {participant.DNI}
                        </Text>
                      </Text>
                      <Text size={TextSize} textAlign="start" color="CSOrange">
                        email:{" "}
                        <Text
                          as="span"
                          size={TextSize}
                          color="white"
                          display="inline"
                        >
                          {participant.email}
                        </Text>
                      </Text>
                      <Text size={TextSize} textAlign="start" color="CSOrange">
                        edad:{" "}
                        <Text
                          as="span"
                          size={TextSize}
                          color="white"
                          display="inline"
                        >
                          {participant.age}
                        </Text>
                      </Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </VStack>
        <Center>
          <Text fontSize={TextSize} color="red.500">
            {errorrMessage}
          </Text>
        </Center>
        <Flex width="full">
          <Button
            onClick={rejectTeam}
            size={["sm", "lg"]}
            height="48px"
            width="40%"
            isLoading={isLoading}
            border="5px"
            color="black"
            variant="solid"
            bgColor="red.500"
            _hover={{ backgroundColor: "red.400" }}
            my="4%"
            leftIcon={<CloseIcon />}
          >
            Rechazar
          </Button>
          <Spacer />
          <Button
            onClick={acceptTeam}
            size={["sm", "lg"]}
            height="48px"
            width="40%"
            isLoading={isLoading}
            border="5px"
            color="black"
            variant="solid"
            bgColor="CSGreen"
            _hover={{ backgroundColor: "#05eda7" }}
            my="4%"
            leftIcon={<CheckIcon />}
          >
            Aceptar
          </Button>
        </Flex>
      </Collapse>
    </VStack>
  );
};

const TeamSelection = ({ token }) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const modifyTeamQualification = (index, uid, qualification) => {
    return async () => {
      try {
        await axiosApiInstance.put(`/users/${uid}/qualified`, {
          qualified: qualification,
        });
        const aux = teams.slice();
        aux[index].qualified = qualification;
        setTeams(aux);
      } catch (err) {
        alert("Error in qualification");
      }
    };
  };

  const getUsersReport = (qualifiedOnly) => {
    axiosApiInstance
      .get("/users/report", {
        params: { qualifiedOnly },
        responseType: "arraybuffer",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );

        const link = document.createElement("a");
        link.style.display = "none";
        document.body.appendChild(link);
        link.href = url;
        link.setAttribute("download", "users_report.xlsx");
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        alert("Error! Could not download file");
      });
  };

  useEffect(() => {
    async function getUsersFromApi() {
      setIsLoading(true);
      try {
        const users = (await axiosApiInstance.get("/users")).data.users;
        setTeams(users.filter((user) => user.role === "user"));
      } catch (err) {
        alert("Error getting users");
      }
      //dejamos a los participantes solo

      setIsLoading(false);
    }

    getUsersFromApi();
  }, []);

  return (
    <VStack align="start" width="full">
      <HStack align="start" width="full">
        <Heading textAlign="">
          {`Equipos aceptados: ${teams.filter((team) => team.qualified).length}`}
        </Heading>
        <Spacer />
        <Button mt={2} mr={2} onClick={() => getUsersReport(false)}>
          Reporte Todos
        </Button>
        <Button mt={2} mr={2} onClick={() => getUsersReport(true)}>
          Reporte Aceptados
        </Button>
      </HStack>

      {isLoading ? (
        <Center width="full">
          <CircularProgress
            isIndeterminate
            color="CSOrange"
            size="40%"
          ></CircularProgress>
        </Center>
      ) : (
        <Flex
          width="full"
          direction="row"
          flexWrap="wrap"
          justifyContent="start"
          alignItems="start"
          verticalAlign="top"
        >
          {teams.map((team, index) => {
            return (
              <TeamCard
                key={index}
                mx="2%"
                my="1%"
                width={["100%", "80%", "45%", "40%", "25%"]}
                team={{ number: index + 1, ...team }}
                onTeamSelected={modifyTeamQualification(index, team.uid, true)}
                onTeamRejected={modifyTeamQualification(index, team.uid, false)}
              ></TeamCard>
            );
          })}
        </Flex>
      )}
    </VStack>
  );
};

const RegisterMentorButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;

  svg path {
    fill: #1e212a;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #2fe0b5;
    border: 1px solid #2fe0b5;

    svg path {
      fill: #2fe0b5;
    }
  }
`;

const MentorRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (event) => setEmail(event.target.value.trim());
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const [errorMessage, setErorrMessage] = useState("");
  const toast = useToast();

  const registerMentor = async (name, email, password) => {
    setIsLoading(true);
    axiosApiInstance
      .post("/mentors", {
        email: email,
        password: password,
        name: name,
      })
      .then(() => {
        toast({
          title: "Mentor registrado correctamente",
          status: "success",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error registrando mentor",
          status: "error",
          duration: 3000,
        });
        setErorrMessage(
          "Ocurrio un error, revisa el que el nombre, el email y la contraseña sean correctos"
        );
      });
    setIsLoading(false);
  };

  return (
    <VStack width="full" direction="column" justifyContent="space-between">
      <Flex
        gap="2em"
        align="center"
        direction="column"
        width={["85%", "65%", "50%", "40%", "30%"]}
      >
        <Heading>Registrar Mentor</Heading>
        <Spacer></Spacer>
        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <StarIcon />
          </InputLeftElement>
          <Input
            value={name}
            onChange={handleNameChange}
            minH="3.5em"
            placeholder="Nombre del mentor"
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
            <EmailIcon />
          </InputLeftElement>
          <Input
            value={email}
            onChange={handleEmailChange}
            minH="3.5em"
            placeholder="Email del mentor"
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
            type={showPassword ? "text" : "password"}
            minH="3.5em"
            placeholder="Contraseña para el mentor"
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
        <Text fontSize={TextSize} color="red.500">
          {errorMessage}
        </Text>
        <RegisterMentorButton
          isLoading={isLoading}
          disabled={email === "" || password === ""}
          onClick={() => registerMentor(name, email, password)}
          backgroundColor="CSGreen"
          width="full"
        >
          Registrar mentor
        </RegisterMentorButton>
      </Flex>
    </VStack>
  );
};

const SubmissionCard = ({
  submission,
  mentors,
  setMentors,
  ease,
  setEase,
  voteAmount,
  ...extendedProps
}) => {
  const { isOpen, onToggle } = useDisclosure();

  const [selectedMentors, setSelectedMentors] = useState(submission.mentors);
  const [selectedValue, setSelectedValue] = useState(
    ease.length > 0 ? ease[0].ease : null
  );
  const handleSelectedValueChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    setEase(submission.submission.id, selectedValue);
  };

  const handleSelectedMentorsChange = (selectedMentors) => {
    setSelectedMentors(selectedMentors);

    for (const mentor of mentors) {
      mentor.submissions = Array.isArray(mentor.submissions)
        ? mentor.submissions.filter((sub) => sub !== submission.submission.id)
        : [];

      if (selectedMentors.some((m) => m.id === mentor.id)) {
        mentor.submissions.push(submission.submission.id);
      }
    }

    setMentors(mentors);
  };
  return (
    <VStack
      p="2%"
      align="center"
      borderRadius="8px"
      borderWidth="2px 2px 6px 2px"
      borderColor="CSBlue"
      {...extendedProps}
    >
      <Flex
        onClick={onToggle}
        direction="row"
        verticalAlign="middle"
        width="full"
      >
        <Heading
          fontSize={HeadingSize}
        >{`Equipo ${submission.number}: ${submission.name}`}</Heading>
        <Spacer></Spacer>
        <HStack>
          <IconButton
            _hover={{ backgroundColor: "grey" }}
            mx="4%"
            onClick={onToggle}
            backgroundColor="transparent"
            icon={isOpen ? <MinusIcon /> : <AddIcon />}
          ></IconButton>
        </HStack>
      </Flex>

      <Box as={Collapse} in={isOpen} animateOpacity w="100%">
        <VStack width="full" align="start">
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Email del equipo:
          </Text>
          <Text size={TextSize} textAlign="start">
            {submission.email}
          </Text>
          {ease.length === 0 || !ease[0].voted ? (
            <Select
              my="1%"
              placeholder="Facilidad de Ejecución"
              value={selectedValue}
              onChange={handleSelectedValueChange}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          ) : (
            <>
              Ya votó: {ease[0].ease} <br></br>
            </>
          )}
          {selectedValue === "" ? null : Number(selectedValue) === 0 ? (
            <>No se entrega</>
          ) : (
            <div>
              <Text fontSize={TextSize} textAlign="start" color="CSOrange">
                Asignar Mentores:
              </Text>
              <MultiSelect
                value={selectedMentors}
                onChange={(e) => handleSelectedMentorsChange(e.value)}
                options={mentors}
                optionLabel="name"
                placeholder="Seleccione los mentores"
                display="chip"
                className="w-full md:w-20rem"
              />
            </div>
          )}
          {voteAmount > 0 ? (
            <Text>Cantidad de Votos: {voteAmount}</Text>
          ) : (
            <></>
          )}
        </VStack>
      </Box>
    </VStack>
  );
};

const MentorAssignment = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [ease, setEase] = useState([]);

  const toast = useToast();
  useEffect(() => {
    const getTeams = async (mentors) => {
      try {
        const response = await axiosApiInstance.get(`/submissions`);
        const submissions = response.data;
        const updatedTeams = [];
        for (const sub of submissions) {
          try {
            const submissionReq = await axiosApiInstance.get(
              `/submissions/${sub.id}`
            );
            const submissionObj = submissionReq.data;
            const team = await axiosApiInstance.get(
              `/users/${submissionObj.userId}`
            );
            const teamData = team.data;
            const submissionMentors = [];

            for (const mentor of mentors) {
              if (
                Array.isArray(mentor.submissions) &&
                mentor.submissions.includes(sub.id)
              ) {
                submissionMentors.push(mentor);
              }
            }

            const teamObj = {
              name: teamData.name,
              email: teamData.email,
              teamDescription: teamData.teamDescription,
              githubLink: submissionObj.githubLink,
              youtubeLink: submissionObj.youtubeLink,
              submission: sub,
              mentors: submissionMentors,
            };

            updatedTeams.push(teamObj);
          } catch (error) {
            alert("Error getting teams");
          }
        }

        const adminVotesReq = await axiosApiInstance.get(`/votes`);
        const adminVotesObj = adminVotesReq.data;
        const easeArr = [];
        for (const adminVote of adminVotesObj) {
          easeArr.push({
            id: adminVote.submissionId,
            ease: adminVote.facilidad,
            voted: Boolean(adminVote.facilidad) || Boolean(adminVote.userId),
          });
        }

        setEase([...easeArr]);
        setTeams([...updatedTeams]);
      } catch (err) {
        alert("Error getting submissions");
      }
    };

    const getMentors = async () => {
      try {
        const response = await axiosApiInstance.get(`/mentors`);
        const mentors = response.data.mentors;
        setMentors([...mentors]);

        return mentors;
      } catch (err) {
        alert("Error getting mentors");
      }
    };

    setIsLoading(true);
    getMentors().then((mentors) =>
      getTeams(mentors).finally(() => setIsLoading(false))
    );
  }, []);

  const handleSaveChanges = async (mentors) => {
    const requests = [];
    for (const mentor of mentors) {
      const request = axiosApiInstance.put(
        `/mentors/${mentor.id}/submissions`,
        {
          submissions: mentor.submissions,
        }
      );

      requests.push(request);
    }
    const easeToUpload = ease.filter((e) => !e.voted);
    for (const e of easeToUpload) {
      if (!e || !e.ease) continue;
      const votingRequest = axiosApiInstance.post("/votes", {
        submissionId: e.id,
        facilidad: e.ease,
      });
      requests.push(votingRequest);
    }
    Promise.all(requests)
      .then(() => {
        toast({
          title: "Cambios guardados exitosamente",
          status: "success",
          duration: 3000,
        });
      })
      .catch((err) => {
        toast({
          title: "Error guardando cambios",
          status: "error",
          duration: 3000,
        });
      });
    const easeNotUpdated = ease.filter((e) => !easeToUpload.includes(e));
    easeToUpload.forEach((e) => (e.voted = true));
    setEase([...easeNotUpdated, ...easeToUpload]);
  };

  const getVotingReport = () => {
    axiosApiInstance
      .get("/votes/report", { responseType: "arraybuffer" })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );

        const link = document.createElement("a");
        link.style.display = "none";
        document.body.appendChild(link);
        link.href = url;
        link.setAttribute("download", "report.xlsx");
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        alert("Error! Could not download file");
      });
  };

  const handleSetEase = (submissionId, val) => {
    const newEase = ease.filter((e) => e.id !== submissionId);
    setEase([{ id: submissionId, ease: val }, ...newEase]);
  };

  return (
    <HStack width="full" align="start" justifyContent="start">
      <VStack align="start" width="full">
        {isLoading ? (
          <Center width="full">
            <CircularProgress
              isIndeterminate
              color="CSOrange"
              size="40%"
            ></CircularProgress>
          </Center>
        ) : (
          <Flex
            width="full"
            direction="row"
            flexWrap="wrap"
            justifyContent="start"
            alignItems="start"
            verticalAlign="top"
          >
            {teams.map((submission, index) => {
              return (
                <SubmissionCard
                  key={index}
                  mx="2%"
                  my="1%"
                  width={["100%", "80%", "45%", "40%", "25%"]}
                  ease={ease.filter(
                    (e) => e.id === submission.submission.id && e.ease
                  )}
                  setEase={handleSetEase}
                  submission={{ number: index + 1, ...submission }}
                  mentors={mentors}
                  setMentors={setMentors}
                  voteAmount={
                    ease.filter((e) => e.id === submission.submission.id).length
                  }
                ></SubmissionCard>
              );
            })}
          </Flex>
        )}
      </VStack>
      <Button mt={2} mr={2} onClick={() => handleSaveChanges(mentors)}>
        Guardar Cambios
      </Button>
      <Button mt={2} mr={2} onClick={getVotingReport}>
        Generar Reporte
      </Button>
    </HStack>
  );
};

const AdminView = ({ token }) => {
  return (
    <Tabs variant="enclosed">
      <TabList paddingY="5%">
        <Tab>Selección de equipos</Tab>
        <Tab>Registro de mentores</Tab>
        <Tab>Asignación de mentores a equipos</Tab>
      </TabList>

      <TabPanels>
        {/* Selección de proyectos */}
        <TabPanel>
          <TeamSelection token={token} />
        </TabPanel>
        {/* Registrar mentor*/}
        <TabPanel>
          <MentorRegistration />
        </TabPanel>
        {/* Asignar mentores a equipos*/}
        <TabPanel>
          <MentorAssignment token={token} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AdminView;
