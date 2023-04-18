import {
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Button,
    ModalBody,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ItemsTYPE } from "../../types/itensType";

type ModalPrintType = {
    isOpen: boolean;
    onClose: any;
    itens: ItemsTYPE | null;
};

export default function ModalPrint({ isOpen, onClose, itens }: ModalPrintType) {
    const [checked, setChecked] = useState<any[]>([]);
    const [unchecked, setUnchecked] = useState<any[]>([]);
    const [newItem, setNewItem] = useState<any[]>([]);

    useEffect(() => {
        let check: any = [];
        let uncheck: any = [];
        let newI: any = [];
        itens?.orders?.forEach((prod) => {
            if (prod?.remaining === true) {
                newI.push(prod);
            } else if (
                prod?.qty === prod?.checked &&
                prod?.remaining === false
            ) {
                check.push(prod);
            } else {
                if (prod?.checked !== 0) {
                    const resp = prod?.qty - prod?.checked;
                    check.push({ ...prod, qty: prod?.checked });
                    uncheck.push({ ...prod, qty: resp });
                } else {
                    uncheck.push(prod);
                }
            }
        });
        setChecked(check);
        setUnchecked(uncheck);
        setNewItem(newI);
    }, [itens]);

    console.log("checked", checked);

    const componentRef = useRef<any>();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Relatório de itens</ModalHeader>
                <ModalCloseButton />
                <ReactToPrint
                    trigger={() => {
                        return (
                            <Button
                                colorScheme="yellow"
                                bg={"#F9B000"}
                                alignSelf={"center"}
                                w={"25%"}
                                textColor={"white"}
                            >
                                Imprimir
                            </Button>
                        );
                    }}
                    content={() => componentRef.current}
                    documentTitle="Etiqueta"
                    pageStyle="print"
                    onBeforeGetContent={() => Promise.resolve()}
                />
                <ModalBody>
                    <Flex ref={componentRef} p="1rem" direction="column">
                        <TableContainer>
                            {checked.length > 0 && (
                                <>
                                    <Text mb={"20px"}>
                                        ITENS CARREGADOS E CONFERIDOS
                                    </Text>
                                    <Table size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>ID</Th>
                                                <Th>DESCRIÇÃO</Th>
                                                <Th>EAN</Th>
                                                <Th>Qtde</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {checked?.map((order, index) => (
                                                <Tr>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"10%"}
                                                    >
                                                        {order?.itemCode}
                                                    </Td>
                                                    <Td
                                                        fontSize={
                                                            order?.description
                                                                .length > 70
                                                                ? "10px"
                                                                : "10px"
                                                        }
                                                        w={"60%"}
                                                    >
                                                        {order?.description}
                                                    </Td>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"20%"}
                                                    >
                                                        {order?.barcode
                                                            ? order?.barcode
                                                            : "-"}
                                                    </Td>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"10%"}
                                                    >
                                                        {order?.qty}
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </>
                            )}

                            {newItem.length > 0 && (
                                <>
                                    <Text my={"20px"}>
                                        ITENS ADICIONADOS NO PEDIDO
                                    </Text>
                                    <Table size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>ID</Th>
                                                <Th>DESCRIÇÃO</Th>
                                                <Th>EAN</Th>
                                                <Th>Qtde</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {newItem?.map((order, index) => (
                                                <Tr>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"10%"}
                                                    >
                                                        {order?.itemCode}
                                                    </Td>
                                                    <Td
                                                        fontSize={
                                                            order?.description
                                                                .length > 70
                                                                ? "10px"
                                                                : "10px"
                                                        }
                                                        w={"60%"}
                                                    >
                                                        {order?.description}
                                                    </Td>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"20%"}
                                                    >
                                                        {order?.barcode
                                                            ? order?.barcode
                                                            : "-"}
                                                    </Td>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"10%"}
                                                    >
                                                        {order?.qty}
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </>
                            )}
                            {unchecked.length > 0 && (
                                <>
                                    <Text my={"20px"}>ITENS PENDENTES</Text>
                                    <Table size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>ID</Th>
                                                <Th>DESCRIÇÃO</Th>
                                                <Th>EAN</Th>
                                                <Th>Qtde</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {unchecked?.map((order, index) => (
                                                <Tr>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"10%"}
                                                    >
                                                        {order?.itemCode}
                                                    </Td>
                                                    <Td
                                                        fontSize={
                                                            order?.description
                                                                ?.length > 70
                                                                ? "10px"
                                                                : "10px"
                                                        }
                                                        w={"60%"}
                                                    >
                                                        {order?.description}
                                                    </Td>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"20%"}
                                                    >
                                                        {order?.barcode
                                                            ? order?.barcode
                                                            : "-"}
                                                    </Td>
                                                    <Td
                                                        fontSize={"10px"}
                                                        w={"10%"}
                                                    >
                                                        {order?.qty}
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </>
                            )}
                        </TableContainer>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
