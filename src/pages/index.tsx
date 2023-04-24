import {
  Flex,
  Button,
  Text,
  useBreakpointValue,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Stack,
  Image,
  useToast,
  useDisclosure,
  Toast,
  IconButton,
  Icon,
  Box,
  Img,
  Tooltip,
} from "@chakra-ui/react";
import LayoutDesk from "../components/Layouts/layoutDesktop";
// import Lottie from "react-lottie";
import animationData from "../animations/login.json";
import { useAuth } from "../contexts/AuthContext";
import { AiOutlineUser, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";

import { destroyCookie, parseCookies } from "nookies";
import Router, { useRouter } from "next/router";
import {
  MotionFlex,
  animationFlex,
  itemAnimation,
  InputMotion,
  inputAnimation,
} from "../styles/animation";
export default function HomeLogin() {
  const toast = useToast({
    duration: 5000,
    isClosable: true,
  });
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { signInEmailPasswordWebservices, isLoading } = useAuth();

  const Toast = useToast({
    position: "bottom",
    isClosable: true,
    duration: 1500,
    containerStyle: {
      color: "white",
    },
  });

  async function handleLogin() {
    await signInEmailPasswordWebservices(email, password);
    // handleToast();
  }
  // function handleToast() {
  //   Toast({
  //     title: onError === true ? "Usuário não existe" : "Você logou!.",
  //     description:
  //       onError === true
  //         ? "Tente entrar com outra conta"
  //         : "Seja bem vindo ao SERS.",
  //     status: onError === true ? "error" : "success",
  //     duration: 9000,
  //     isClosable: true,
  //   });
  // }

  return (
    <>
      <Flex
        bgColor="#EBEBEB"
        w="full"
        h="100vh"
        align="center"
        justify="center"
      >
        <MotionFlex
          boxShadow="lg"
          rounded="lg"
          initial="hidden"
          animate="visible"
          variants={itemAnimation}
          borderRadius="15px"
          direction="column"
          align="center"
          justify="center"
          px="3rem"
          py="1rem"
          bgColor="#FFFFFF"
          w="35%"
        >
          <MotionFlex
            justify="start"
            direction="column"
            variants={itemAnimation}
            initial="hidden"
            animate="visible"
            align="center"
            w="full"
          >
            {/* <Button
              onClick={() => {
                teste();
              }}
            ></Button> */}
            <Flex justify="center">
              <Image alt="Logo da RS" src={"/Image/RS-icon.svg"} w="120x" />
              <Text fontSize={"70px"} fontWeight="Bold">
                SE
              </Text>
              <Text fontSize={"70px"} textColor={"#E30613"} fontWeight="Bold">
                RS
              </Text>
            </Flex>
            <Text fontSize="18px" fontWeight="bold" align="center" mb="1rem">
              Seja bem-vindo
            </Text>
            <Text
              opacity="45%"
              fontSize="14px"
              color="black"
              fontWeight="medium"
              alignSelf="center"
            >
              Faça o login para começar.
            </Text>
          </MotionFlex>
          <InputMotion
            variants={inputAnimation}
            initial="hidden"
            animate="visible"
            mt="1rem"
            w="full"
            variant="solid"
            size="md"
          >
            <InputLeftElement>
              <AiOutlineUser opacity="45%" />
            </InputLeftElement>
            <Input
              opacity="70%"
              borderColor="gray.300"
              variant="outline"
              borderRadius="15px"
              placeholder="Digite seu usuário do senior."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputMotion>
          <InputMotion
            variants={inputAnimation}
            initial="hidden"
            animate="visible"
            w="full"
            variant="solid"
            size="md"
            mt="1rem"
          >
            <InputLeftElement>
              <BsShieldLock opacity="45%" />
            </InputLeftElement>
            <Input
              type="password"
              opacity="70%"
              borderColor="gray.300"
              variant="outline"
              borderRadius="15px"
              placeholder="Digite sua senha. "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputMotion>
          <>
            <Tooltip
              display={
                password.length >= 3 && email.length >= 3 ? "none" : "flex"
              }
              label="Todos os campos devem ser preenchidos"
              aria-label="A tooltip"
            >
              <Button
                w="10rem"
                boxShadow="lg"
                isLoading={isLoading}
                borderWidth="1px"
                mt="2rem"
                h="40px"
                colorScheme="green"
                onClick={() => {
                  handleLogin();
                }}
                isDisabled={
                  password.length >= 3 && email.length >= 3 ? false : true
                }
              >
                Entrar
              </Button>
            </Tooltip>
          </>
        </MotionFlex>
      </Flex>
    </>
  );
}
