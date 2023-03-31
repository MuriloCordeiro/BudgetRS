import {
    useDisclosure,
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
} from "@chakra-ui/react";
import { useState } from "react";
import { ItemsTYPE } from "../../types/itensType";

type ModalConfFinishedType = {
    itens: ItemsTYPE;
    isOpen: any;
    onClose: any;
    isAllChecked: boolean;
    sendInsertOrders: any;
};

export default function ModalConfFinished({
    itens,
    isOpen,
    onClose,
    isAllChecked,
    sendInsertOrders,
}: ModalConfFinishedType) {
    const [orderNumber, setOrderNumber] = useState("");

    function finishConf() {
        if (orderNumber === itens?.general?.orderId) {
            sendInsertOrders();
            // toast({
            //     title: "Conferencia concluida",
            //     status: "success",
            // });
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
            textStyle: "BarlowRegular",
        },
    });

    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

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
                                <Button
                                    colorScheme={"blue"}
                                    bg={"#339CD8"}
                                    _hover={{ opacity: "70%" }}
                                    onClick={() => finishConf()}
                                >
                                    Imprimir
                                </Button>
                                <Button
                                    colorScheme={"gren"}
                                    bg={"#005F27"}
                                    _hover={{ opacity: "70%" }}
                                    onClick={() => finishConf()}
                                >
                                    Concluir
                                </Button>
                            </Flex>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
