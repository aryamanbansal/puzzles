import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  RadioGroup,
  Radio,
  Image,
  Center,
  Select,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import "./Register.css";
import { useProvider } from "../../context/Provider";
import { useNavigate } from "react-router";
const Couter = chakra(AiOutlineUser);

export const Register = () => {
  const navigate = useNavigate();
  const { user, registerUser } = useProvider();
  const [avtar, setavtar] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Easy");

  const handleData = (e: FormEvent) => {
    e.preventDefault();
    if (!avtar || !name) return alert("please Fill all fields");
    registerUser({ name, avtar, level });
  };

  console.log("user: ", user);

  useEffect(() => {
    if (!user) return navigate("/register");
  }, [user]);

  return (
    <Flex
      className="back"
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleData}>
            <Center>
              <Stack
                className="card"
                borderRadius={"50px"}
                spacing={4}
                p="1rem"
                h={{ base: "60vh", md: "60vh", lg: "60vh", sm: "60vh" }}
                w={{ base: "75vw", md: "45vw", lg: "25vw", sm: "75vw" }}
                boxShadow="md"
              >
                <Center>
                  {" "}
                  <Heading id="heading" color={"white"} fontSize={"30px"}>
                    Let the Hunt Begin!
                  </Heading>
                </Center>

                <FormControl>
                  <Center>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<Couter color="white" />}
                      />

                      <Input
                        color={"white"}
                        type="text"
                        placeholder="Ahoy matey! What's your name?"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                  </Center>
                </FormControl>
                <Select
                  color={"whiteAlpha.900"}
                  name="Select the level"
                  id="Easy"
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="hard">Hard</option>
                  <option value="Medium">Medium</option>
                </Select>
                <RadioGroup defaultValue="2">
                  <Heading
                    fontSize={"15px"}
                    color={"skyblue"}
                    marginTop={"10px"}
                    marginBottom={"20px"}
                  >
                    No treasure hunt is complete without a companion. Pick your avatar and let's go find some loot!
                  </Heading>
                  <Stack spacing={5} direction="row">
                    <Radio
                      colorScheme="green"
                      value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIQGklKp0DBSuhONZUGk8DWvs4VUZJ79FTn0dQxqCh-aCU_RTDwGCbWeAe0UnPjywfkY&usqp=CAU"
                      onChange={(e) => setavtar(e.target.value)}
                    >
                      <Image
                        w={"60px"}
                        borderRadius={"100%"}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIQGklKp0DBSuhONZUGk8DWvs4VUZJ79FTn0dQxqCh-aCU_RTDwGCbWeAe0UnPjywfkY&usqp=CAU"
                      />
                    </Radio>

                    <Radio
                      colorScheme="green"
                      value="https://img.freepik.com/premium-vector/gamer-mascot-logo-gaming-badge_10051-451.jpg?w=2000"
                      onChange={(e) => setavtar(e.target.value)}
                    >
                      <Image
                        w={"65px"}
                        borderRadius={"100%"}
                        src="https://img.freepik.com/premium-vector/gamer-mascot-logo-gaming-badge_10051-451.jpg?w=2000"
                      />
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Center>
                  <Button
                    className="container"
                    borderRadius={20}
                    type="submit"
                    variant="solid"
                    _hover={{ bg: " rgba(0, 212, 255, 1) 100%" }}
                    colorScheme="teal"
                   
                    w={{ base: "75vw", md: "30vw", lg: "20vw", sm: "75vw" }}
                  >
                    START
                  </Button>
                </Center>
              </Stack>
            </Center>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};