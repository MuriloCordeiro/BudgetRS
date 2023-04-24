import {
    Flex,
    Button,
    Text,
    Input,
    InputLeftElement,
    Image,
    useToast,
} from "@chakra-ui/react";
import LayoutDesk from "../components/Layouts/layoutDesktop";
import animationData from "../animations/login.json";
import { useAuth } from "../contexts/AuthContext";
import { AiOutlineUser, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";

import { useEffect, useState } from "react";

import { destroyCookie, parseCookies } from "nookies";
import {
    MotionFlex,
    itemAnimation,
    InputMotion,
    inputAnimation,
} from "../styles/animation";
export default function HomeLogin() {
    const toast = useToast({
        duration: 5000,
        isClosable: true,
    });
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const { signInEmailPasswordWebservices, isLoading, isLoged, setIsLoged } =
        useAuth();

    const Toast = useToast({
        position: "bottom",
        isClosable: true,
        duration: 2500,
        containerStyle: {
            color: "white",
        },
    });

    function handleLogin() {
        signInEmailPasswordWebservices(email, password);
    }

    useEffect(() => {
        if (isLoged && isLoged !== null) {
            Toast.closeAll();
            Toast({
                title: "Logado com sucesso",
                status: "success",
            });
            setIsLoged(null);
        } else if (!isLoged && isLoged !== null) {
            Toast.closeAll();
            Toast({
                title: "Email ou senha incorretas",
                status: "error",
            });
            setIsLoged(null);
        }
    }, [isLoged]);

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
                        <Flex justify="center">
                            <Image
                                alt="Logo da RS"
                                src={"/Image/RS-icon.svg"}
                                w="120x"
                            />
                            <Text fontSize={"70px"} fontWeight="Bold">
                                SE
                            </Text>
                            <Text
                                fontSize={"70px"}
                                textColor={"#E30613"}
                                fontWeight="Bold"
                            >
                                RS
                            </Text>
                        </Flex>
                        <Text
                            fontSize="18px"
                            fontWeight="bold"
                            align="center"
                            mb="1rem"
                        >
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
                    >
                        Entrar
                    </Button>
                </MotionFlex>
            </Flex>
        </>
    );
}
