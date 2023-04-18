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
    Img,
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
                uncheck.push(prod);
            }
        });
        setChecked(check);
        setUnchecked(uncheck);
        setNewItem(newI);
        // res === true ? setIsAllChecked(true) : setIsAllChecked(false);
    }, [itens]);

    console.log("checked", checked);

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
                />
                <ModalBody>
                    <Flex ref={componentRef} p="1rem" direction="column">
                        {/* <Flex direction="row" align="end" fontSize="18px">
              <Img
                src="/Image/logo-rs-pneus.svg"
                w="140px"
                h="40px"
                mr="4rem"
              />
              <Text fontWeight="bold">PED: 1057</Text>
            </Flex>
            <Flex mt="1rem" direction="column" fontSize="18px">
              <Text fontWeight="bold">TRANSLOVATO</Text>
              <Text fontWeight="bold">PINDAMONHAGABA/SP</Text>
              <Text fontWeight="bold">VOL. 01/126</Text>
            </Flex> */}

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
