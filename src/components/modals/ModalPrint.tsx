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
    ModalFooter,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import PrintMock from "../../../public/mock/PrintMock";
import { ItemsTYPE } from "../../types/itensType";

type ModalPrintType = {
    isOpen: boolean;
    onClose: any;
    itens: ItemsTYPE | null;
};

export default function ModalPrint({ isOpen, onClose, itens }: ModalPrintType) {
    const [checked, setCheched] = useState<any[]>([]);
    const [unchecked, setUncheched] = useState<any[]>([]);
    const [newItem, setNewItem] = useState<any[]>([]);

    useEffect(() => {
        let check: any = [];
        let uncheck: any = [];
        let newI: any = [];
        console.log("entrou aq ", itens?.orders);
        itens?.orders?.forEach((prod) => {
            if (prod?.remaining === true) {
                newI.push(prod);
            } else if (
                prod?.qty === prod?.checked &&
                prod?.remaining === false
            ) {
                check.push(prod);
            } else {
                uncheck.push(prod);
            }
        });
        setCheched(check);
        setUncheched(uncheck);
        setNewItem(newI);
        // res === true ? setIsAllChecked(true) : setIsAllChecked(false);
    }, [itens]);

    const componentRef = useRef<any>();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Testando</ModalHeader>
                <ModalCloseButton />
                <ReactToPrint
                    trigger={() => {
                        return <Button>teste</Button>;
                    }}
                    content={() => componentRef.current}
                    documentTitle="Etiqueta"
                    pageStyle="print"
                    onBeforeGetContent={() => Promise.resolve()}
                    // onAfterPrint={() => setTimeout(() => window.location.reload(), 500)}
                />
                <ModalBody>
                    <Flex
                        ref={componentRef}
                        p="1rem"
                        w="100%"
                        h="100%"
                        direction="column"
                    >
                        {/* {itens?.orders.map((order, index) => ( */}
                        <TableContainer>
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
                                            <Td fontSize={"10px"} w={"10%"}>
                                                {order?.itemCode}
                                            </Td>
                                            <Td
                                                fontSize={
                                                    order?.description.length >
                                                    70
                                                        ? "10px"
                                                        : "10px"
                                                }
                                                w={"60%"}
                                            >
                                                {order?.description}
                                            </Td>
                                            <Td fontSize={"10px"} w={"20%"}>
                                                {order?.barcode
                                                    ? order?.barcode
                                                    : "-"}
                                            </Td>
                                            <Td fontSize={"10px"} w={"10%"}>
                                                {order?.qty}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            <Text my={"20px"}>ITENS ADICIONADOS NO PEDIDO</Text>
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
                                            <Td fontSize={"10px"} w={"10%"}>
                                                {order?.itemCode}
                                            </Td>
                                            <Td
                                                fontSize={
                                                    order?.description.length >
                                                    70
                                                        ? "10px"
                                                        : "10px"
                                                }
                                                w={"60%"}
                                            >
                                                {order?.description}
                                            </Td>
                                            <Td fontSize={"10px"} w={"20%"}>
                                                {order?.barcode
                                                    ? order?.barcode
                                                    : "-"}
                                            </Td>
                                            <Td fontSize={"10px"} w={"10%"}>
                                                {order?.qty}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
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
                                            <Td fontSize={"10px"} w={"10%"}>
                                                {order?.itemCode}
                                            </Td>
                                            <Td
                                                fontSize={
                                                    order?.description?.length >
                                                    70
                                                        ? "10px"
                                                        : "10px"
                                                }
                                                w={"60%"}
                                            >
                                                {order?.description}
                                            </Td>
                                            <Td fontSize={"10px"} w={"20%"}>
                                                {order?.barcode
                                                    ? order?.barcode
                                                    : "-"}
                                            </Td>
                                            <Td fontSize={"10px"} w={"10%"}>
                                                {order?.qty}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
