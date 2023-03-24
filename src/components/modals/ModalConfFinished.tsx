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
        duration: 1500,
        isClosable: true,
        containerStyle: {
            color: "white",
        },
    });

    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Concluir Conferencia</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"}>
                        {!isAllChecked && (
                            <Text
                                mb={"20px"}
                                padding={"5px"}
                                border={"1px solid orange"}
                                borderRadius="15px"
                            >
                                Nem todos os pedidos foram conferidos
                            </Text>
                        )}
                        <Text mb={"20px"}>
                            Deseja concluir a conferencia do pedido
                            {itens?.general?.orderId} ?
                        </Text>
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
                        <Text>
                            Para concluir a conferencia digite o numero do
                            pedido - {itens?.general?.orderId}
                        </Text>
                        <Input
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Flex w={"100%"} justify={"space-between"}>
                            <Button
                                colorScheme="orange"
                                mr={3}
                                onClick={onClose}
                            >
                                Voltar
                            </Button>

                            <Button
                                variant="outline"
                                colorScheme={"gren"}
                                textColor={"#005F27"}
                                _hover={{ opacity: "70%" }}
                                onClick={() => finishConf()}
                            >
                                Confirmar
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
