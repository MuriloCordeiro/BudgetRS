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

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textStyle={"Bold"}>
                        Concluir Separação
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"} textStyle={"Regular"}>
                        {/* {!isAllChecked && (
                            <Text
                                mb={"20px"}
                                padding={"5px"}
                                border={"1px solid orange"}
                                borderRadius="15px"
                            >
                                Nem todos os pedidos foram conferidos
                            </Text>
                        )} */}
                        <Text mb={"20px"} fontSize="16px">
                            Deseja concluir a separaçao do pedido{" "}
                            {itens?.general?.orderId} ?
                        </Text>

                        <Text
                            mb={"20px"}
                            fontSize={"14px"}
                            bg={"#FC0000"}
                            paddingY={"5px"}
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
                                paddingY={"5px"}
                                paddingX={"15px"}
                                textColor={"white"}
                                borderRadius={"5px"}
                            >
                                AVISO: Nem todos os pedidos foram conferidos.
                            </Text>
                        )}
                        <Button
                            variant="outline"
                            textColor={"black"}
                            border={"2px solid"}
                            borderColor={"yellow.900"}
                            borderRadius={"15px"}
                            _hover={{
                                borderColor: "yellow.500",
                                opacity: "80%",
                            }}
                            mb="20px"
                        >
                            {itens?.general?.ordertype === "REDE"
                                ? "IMPRIMIR ITENS PENDENTES"
                                : "GERAR ETIQUETAS"}
                        </Button>
                        <Flex direction={"column"}>
                            <Text>
                                Escreva o número do pedido para continuar.
                            </Text>
                            <Input
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

                            <Button
                                colorScheme={"gren"}
                                bg={"#005F27"}
                                _hover={{ opacity: "70%" }}
                                onClick={() => finishConf()}
                            >
                                Concluir
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
