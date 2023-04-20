import {
    Table,
    TableContainer,
    Th,
    Thead,
    Tr,
    Td,
    Text,
    Tbody,
    Button,
    Img,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

import { Invoices } from "../../types/invoicesType";
import { postDispatchOrder } from "../../hooks/post/postDispatchOrder";
import { useState } from "react";

type tableTypes = {
    pedidosFat: Invoices[];
};

export default function TableComponentPedidosFaturados({
    pedidosFat,
}: tableTypes) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [order, setOrder] = useState<any>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    function updateOrder(orderToUpdate: any, newParam: any) {
        pedidosFat.forEach((order) => {
            if (order.orderNumber === orderToUpdate) {
                order.isDispatched = newParam;
            }
        });
    }

    async function handleDispatch() {
        const currentDates = new Date();

        const day = String(currentDates.getUTCDate()).padStart(2, "0");
        const month = String(currentDates.getUTCMonth() + 1).padStart(2, "0");
        const year = currentDates.getUTCFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        const currentHourInMinutes =
            currentDates.getHours() * 60 + currentDates.getMinutes();

        setIsLoading(true);
        onClose();
        const response = await postDispatchOrder(
            order,
            formattedDate.toString(),
            currentHourInMinutes.toString()
        );

        if (response.statusCode[0] === "1") {
            updateOrder(order, true);
        } else {
            console.error("Erro ao despachar o pedido:", response.error);
        }
        setIsLoading(false);
    }

    return (
        <>
            {pedidosFat ? (
                <TableContainer mt="2rem" mb="2rem">
                    <Table variant="striped" size="sm">
                        <Thead>
                            <Tr>
                                <Th w="20%">
                                    <Text>PEDIDO</Text>
                                </Th>
                                <Th w="10%">NF</Th>
                                <Th w="10%">EMITIDO</Th>
                                <Th w="10%">PREVISÃO</Th>
                                <Th w="20%">TEM GNRE?</Th>
                                <Th w="10%">CLIENTE</Th>
                                <Th w="10%">QTD. VOL.</Th>
                                <Th w="10%">TRANSP</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {pedidosFat &&
                                pedidosFat?.map((prod, index) => (
                                    <Tr key={index}>
                                        <Td>{prod?.orderNumber}</Td>
                                        <Td>{prod?.invoiceNumber}</Td>
                                        <Td>{prod?.emissionDate}</Td>
                                        <Td>{prod?.expectedDate}</Td>
                                        <Td>
                                            {prod?.GNRE === "true"
                                                ? "Sim"
                                                : "Não"}
                                        </Td>
                                        <Td>{prod?.client}</Td>
                                        <Td>{prod?.volumeQty}</Td>
                                        <Td>{prod?.shippingCompany}</Td>

                                        <Td>
                                            <a
                                                href={prod.pdf}
                                                target="\_blank"
                                                className="btn"
                                            >
                                                <Button
                                                    bg={"#005F27"}
                                                    textColor={"white"}
                                                    colorScheme={"green"}
                                                    borderRadius={"30px"}
                                                >
                                                    IMPRIMIR NOTA
                                                </Button>
                                            </a>
                                        </Td>
                                        <Td>
                                            <Button
                                                isLoading={
                                                    isLoading === true &&
                                                    order === prod.orderNumber
                                                        ? true
                                                        : false
                                                }
                                                disabled={
                                                    prod?.isDispatched === true
                                                        ? true
                                                        : false
                                                }
                                                bg={"#005F27"}
                                                textColor={"white"}
                                                colorScheme={"green"}
                                                borderRadius={"30px"}
                                                onClickCapture={() => {
                                                    setOrder(prod?.orderNumber);
                                                }}
                                                onClick={onOpen}
                                            >
                                                {prod?.isDispatched === true
                                                    ? "CONCLUÍDO"
                                                    : "EXPEDIR"}
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            ) : (
                <Flex align="center" w="100%" h="100%" direction="column">
                    <Img
                        src="/Image/RS-icon.svg"
                        w={"220px"}
                        mt={"4rem"}
                        opacity={"70%"}
                    />
                    <Text mt="2rem" opacity={"70%"} fontWeight="Bold">
                        No momento não há nenhum pedido faturado disponível
                    </Text>
                </Flex>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Tem certeza que deseja expedir o pedido: {order}?
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>

                    <ModalFooter>
                        <Flex w="full" justify="space-between">
                            <Button
                                bgColor={"red"}
                                color="white"
                                _hover={{
                                    bgColor: "#b40505",
                                }}
                                mr={3}
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                bgColor={"#005F27"}
                                color="white"
                                _hover={{
                                    bgColor: "#083b19",
                                }}
                                onClick={() => {
                                    handleDispatch();
                                }}
                            >
                                Sim, desejo continuar
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
