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
} from "@chakra-ui/react";
import { useState } from "react";
import { ItemsTYPE } from "../../types/itensType";
import ModalTags from "./ModalTags";

type ModalConfFinishedType = {
    itens: ItemsTYPE;
    isOpen: any;
    onClose: any;
    isAllChecked: boolean;
    sendInsertOrders: any;
    orderNumbers: string;
};

export default function ModalConfFinished({
    itens,
    isOpen,
    onClose,
    isAllChecked,
    sendInsertOrders,
    orderNumbers,
}: ModalConfFinishedType) {
    const [orderNumber, setOrderNumber] = useState("");

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

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="25px" textStyle={"Bold"}>
                        Concluir Separação
                    </ModalHeader>
                    <ModalCloseButton />
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
                            AVISO: Essa ação é irreversível. Tenha certeza.
                        </Text>
                        {!isAllChecked && (
                            <Text
                                mb={"20px"}
                                fontSize={"14px"}
                                bg={"#F9B000"}
                                paddingY={"10px"}
                                paddingX={"15px"}
                                textColor={"white"}
                                borderRadius={"5px"}
                            >
                                AVISO: Nem todos os pedidos foram conferidos.
                            </Text>
                        )}

                        <Flex direction={"column"} align={"flex-start"}>
                            <Text>
                                Escreva o número do pedido para continuar.
                            </Text>
                            <Input
                                borderRadius={"5px"}
                                h="45px"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                            />
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Flex w={"100%"} justify={"space-between"}>
                            <Button
                                mr={3}
                                bg={"#E30613"}
                                textColor={"white"}
                                _hover={{ opacity: "70%" }}
                                onClick={onClose}
                            >
                                Cancelar
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
                                        Imprimir Etiquetas
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    label="Digite o numero do pedido para finalizar a conferencia"
                                    display={correctNumber() ? "none" : "flex"}
                                    borderRadius={"15px"}
                                    textAlign={"center"}
                                    paddingX={"15px"}
                                >
                                    <Button
                                        disabled={!correctNumber()}
                                        colorScheme={"gren"}
                                        bg={"#005F27"}
                                        _hover={{ opacity: "70%" }}
                                        onClick={() => finishConf()}
                                    >
                                        Concluir
                                    </Button>
                                </Tooltip>
                            </Flex>
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
