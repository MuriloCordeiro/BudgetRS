import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Input,
    Flex,
    useToast,
    Tooltip,
    useDisclosure,
    Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ItemsTYPE } from "../../types/itensType";
import ModalTags from "./ModalTags";
import Lottie from "react-lottie";
import { useRouter } from "next/router";
import successLottie from "../../../public/lottie/success.json";
import errorLottie from "../../../public/lottie/error.json";

type ModalConfFinishedType = {
    itens: ItemsTYPE;
    isOpen: any;
    onClose: any;
    isAllChecked: boolean;
    sendInsertOrders: any;
    orderNumbers: string;
    conferenciaConcluida: boolean;
    finishConfLoading: boolean;
};

export default function ModalConfFinished({
    itens,
    isOpen,
    onClose,
    isAllChecked,
    sendInsertOrders,
    orderNumbers,
    conferenciaConcluida,
    finishConfLoading,
}: ModalConfFinishedType) {
    const [orderNumber, setOrderNumber] = useState("");
    const [showBody, setShowBody] = useState<boolean>(true);
    const router = useRouter();

    function correctNumber() {
        if (orderNumber === itens?.general?.orderId) {
            return true;
        } else {
            return false;
        }
    }

    function finishConf() {
        if (orderNumber === itens?.general?.orderId) {
            sendInsertOrders();
        } else if (orderNumber.length === 0) {
            toast({
                title: "Digite o numero do pedido para finalizar a conferencia",
                status: "error",
            });
        } else {
            toast({
                title: "Numero do pedido errado",
                status: "error",
            });
        }
    }

    const toast = useToast({
        duration: 3000,
        isClosable: true,
        containerStyle: {
            color: "white",
        },
    });

    const {
        isOpen: isOpenTags,
        onOpen: onOpenTags,
        onClose: onCloseTags,
    } = useDisclosure();

    const SuccessLottieOptions = {
        loop: false,
        autoplay: true,
        animationData: successLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const errorLottieOptions = {
        loop: false,
        autoplay: true,
        animationData: errorLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <>
            <Modal
                closeOnOverlayClick={conferenciaConcluida ? false : true}
                isOpen={isOpen}
                onClose={onClose}
                size={"xl"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="25px" textStyle={"Bold"}>
                        Concluir Separação
                    </ModalHeader>

                    {showBody ? (
                        <ModalBody textAlign={"center"} textStyle={"Regular"}>
                            <Text mb={"20px"} fontSize="20px">
                                Deseja concluir a separaçao do pedido{" "}
                                {itens?.general?.orderId} ?
                            </Text>
                            <Text
                                mb={"20px"}
                                fontSize={"14px"}
                                bg={"#FC0000"}
                                paddingY={"10px"}
                                paddingX={"15px"}
                                textColor={"white"}
                                borderRadius={"5px"}
                            >
                                <b>AVISO:</b> Essa ação é irreversível. Tenha
                                certeza.
                            </Text>
                            {!isAllChecked ? (
                                <Text
                                    mb={"20px"}
                                    fontSize={"14px"}
                                    bg={"#F9B000"}
                                    paddingY={"10px"}
                                    paddingX={"15px"}
                                    textColor={"white"}
                                    borderRadius={"5px"}
                                >
                                    <b>AVISO:</b> Nem todos os pedidos foram
                                    conferidos.
                                </Text>
                            ) : (
                                <Text
                                    mb={"20px"}
                                    fontSize={"14px"}
                                    bg={"#005F27"}
                                    paddingY={"10px"}
                                    paddingX={"15px"}
                                    textColor={"white"}
                                    borderRadius={"5px"}
                                >
                                    <b>AVISO:</b> Todos os itens foram
                                    conferidos, este pedido será{" "}
                                    <b>FATURADO AUTOMATICAMENTE</b>. Tenha
                                    certeza.
                                </Text>
                            )}

                            <Flex direction={"column"} align={"flex-start"}>
                                <Flex gap={"5px"}>
                                    <Text>Digite o número do pedido:</Text>
                                    <Text fontWeight={"bold"}>
                                        {itens?.general?.orderId}
                                    </Text>
                                    <Text>para continuar.</Text>
                                </Flex>
                                <Input
                                    borderRadius={"5px"}
                                    h="45px"
                                    value={orderNumber}
                                    onChange={(e) =>
                                        setOrderNumber(e.target.value)
                                    }
                                />
                            </Flex>
                        </ModalBody>
                    ) : finishConfLoading ? (
                        <ModalBody
                            textAlign={"center"}
                            textStyle={"Regular"}
                            h={"260px"}
                        >
                            <Flex
                                h={"230px"}
                                justify={"center"}
                                align={"center"}
                            >
                                <Spinner
                                    thickness="10px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="red.400"
                                    w="120px"
                                    h="120px"
                                />
                            </Flex>
                        </ModalBody>
                    ) : conferenciaConcluida ? (
                        <ModalBody textAlign={"center"} textStyle={"Regular"}>
                            <Flex direction={"column"}>
                                <Lottie
                                    options={SuccessLottieOptions}
                                    height={250}
                                    width={250}
                                />
                                {!isAllChecked ? (
                                    <Text
                                        mb={"20px"}
                                        fontSize={"14px"}
                                        bg={"#005F27"}
                                        paddingY={"10px"}
                                        paddingX={"15px"}
                                        textColor={"white"}
                                        borderRadius={"5px"}
                                    >
                                        <b>CONCLUIDO:</b> Nem todos os itens
                                        foram conferidos.
                                        <br /> Nenhum faturamento foi efetuado
                                        para o pedido: <b>{orderNumbers}</b>.
                                    </Text>
                                ) : (
                                    <Text
                                        mb={"20px"}
                                        fontSize={"14px"}
                                        bg={"#005F27"}
                                        paddingY={"10px"}
                                        paddingX={"15px"}
                                        textColor={"white"}
                                        borderRadius={"5px"}
                                    >
                                        <b>CONCLUIDO:</b> Todos os itens foram
                                        conferidos.
                                        <br /> O pedido: <b>
                                            {orderNumbers}
                                        </b>{" "}
                                        foi encaminhado para a fila de
                                        faturamento.
                                    </Text>
                                )}
                            </Flex>
                        </ModalBody>
                    ) : (
                        <ModalBody textAlign={"center"} textStyle={"Regular"}>
                            <Flex direction={"column"}>
                                <Lottie
                                    options={errorLottieOptions}
                                    height={250}
                                    width={250}
                                />
                                <Text
                                    mb={"20px"}
                                    fontSize={"14px"}
                                    bg={"red"}
                                    paddingY={"10px"}
                                    paddingX={"15px"}
                                    textColor={"white"}
                                    borderRadius={"5px"}
                                >
                                    <b>ERRO:</b> Ocorreu um erro com o seguinte
                                    pedido: <b>{orderNumbers}</b>. <br />{" "}
                                    Atualize a página e tente novamente.
                                </Text>
                            </Flex>
                        </ModalBody>
                    )}

                    <ModalFooter>
                        <Flex
                            w={"100%"}
                            justify={"space-between"}
                            display={!showBody ? "none" : "flex"}
                        >
                            <Button
                                mr={3}
                                bg={"#E30613"}
                                textColor={"white"}
                                _hover={{ opacity: "70%" }}
                                onClick={onClose}
                            >
                                CANCELAR
                            </Button>

                            <Flex gap="15px">
                                <Tooltip
                                    label="Digite o numero do pedido para imprimir as etiquetas"
                                    display={correctNumber() ? "none" : "flex"}
                                    borderRadius={"15px"}
                                    textAlign={"center"}
                                    paddingX={"15px"}
                                >
                                    <Button
                                        disabled={!correctNumber()}
                                        w="208px"
                                        bgColor="#339CD8"
                                        color="white"
                                        colorScheme={"blue"}
                                        _hover={{ opacity: "70%" }}
                                        onClick={() => onOpenTags()}
                                    >
                                        IMPRIMIR ETIQUETAS
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    label="Digite o numero do pedido para finalizar a conferencia "
                                    display={correctNumber() ? "none" : "flex"}
                                    borderRadius={"15px"}
                                    textAlign={"center"}
                                    paddingX={"15px"}
                                >
                                    <Button
                                        disabled={!correctNumber()}
                                        bg={"#005F27"}
                                        textColor={"white"}
                                        _hover={{ opacity: "70%" }}
                                        onClick={() => {
                                            finishConf();
                                            setShowBody(false);
                                        }}
                                    >
                                        CONCLUIR
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </Flex>
                        <Flex
                            display={
                                showBody
                                    ? "none"
                                    : finishConfLoading
                                    ? "none"
                                    : "flex"
                            }
                        >
                            <Button
                                bg={"#005F27"}
                                textColor={"white"}
                                _hover={{ opacity: "70%" }}
                                onClick={() => router.reload()}
                            >
                                ATUALIZAR PÁGINA
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ModalTags
                itens={itens}
                isOpen={isOpenTags}
                onClose={onCloseTags}
                orderNumber={orderNumbers}
            />
        </>
    );
}
