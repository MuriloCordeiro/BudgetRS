import {
    Table,
    TableContainer,
    Th,
    Thead,
    Tr,
    Td,
    Text,
    Tbody,
    Input,
    Button,
    Flex,
} from "@chakra-ui/react";
import ChangeConferido from "../../helpers/changeConferido";
import { ItemsTYPE } from "../../types/itensType";

type TableComponentType = {
    arrayItens: ItemsTYPE;
    setArrayItens: any;
};

export default function TableComponent({
    arrayItens,
    setArrayItens,
}: TableComponentType) {
    function calcularPorcentagem(numero1: number, numero2: number): number {
        const porcentagem = (numero2 / numero1) * 100;
        return Number(porcentagem.toFixed(2));
    }

    return (
        <TableContainer mt="160px" paddingX="2rem" paddingY="3.5rem">
            <Table variant="striped" size="md">
                <Thead w={"100%"}>
                    <Tr
                        w={"100%"}
                        position={"fixed"}
                        bg={"white"}
                        mt={"-3.5rem"}
                        zIndex={1}
                    >
                        <Flex w={"100%"}>
                            <Th w="10%">itemID</Th>
                            <Th w="32.5%">ITENS</Th>
                            <Th w="5%">END 1</Th>
                            <Th w="9%">END 2</Th>
                            <Th w="17%">EAN</Th>
                            <Th w="9%">QTD</Th>
                            <Th w="10%">CONFERIDO</Th>
                            <Th w="5%">%</Th>
                        </Flex>
                    </Tr>
                </Thead>
                {/* {console.log("arrayItens", arrayItens)} */}
                <Tbody fontFamily={"Arial"}>
                    {arrayItens?.orders.map((prod, index) => (
                        <Tr key={index}>
                            <Td w="10%">{prod?.itemCode}</Td>
                            <Td w="34%">{prod?.description}</Td>
                            <Td w="5%">
                                {prod?.address1
                                    ? prod?.address1.replace(/\|/g, "")
                                    : "-"}
                            </Td>
                            <Td w="9%">
                                {prod?.address2
                                    ? prod?.address2.replace(/\|/g, "")
                                    : "-"}
                            </Td>
                            <Td w="19%">
                                {prod?.barcode ? prod?.barcode : "-"}
                            </Td>
                            <Td w="9%">{prod?.qty}</Td>
                            <Td w="10%">{0}</Td>
                            <Td w="5%">{"0%"}</Td>
                            {/* <Td w="10%">
                                {prod?.barcode.length === 0 &&
                                prod?.CONFERIDO !== prod?.QTD ? (
                                    <ChangeConferido
                                        arrayItens={arrayItens}
                                        setArrayItens={setArrayItens}
                                        index={index}
                                    />
                                ) : (
                                    prod?.CONFERIDO
                                )}
                            </Td> */}
                            {/* <Td w="5%">
                                <Text
                                    textAlign={"center"}
                                    bg={
                                        calcularPorcentagem(
                                            prod?.QTD,
                                            prod?.CONFERIDO
                                        ) === 100
                                            ? "#005F27"
                                            : "#F9B000"
                                    }
                                    paddingY={"5px"}
                                    paddingX={"15px"}
                                    borderRadius={"15px"}
                                    textColor={"white"}
                                >
                                    {calcularPorcentagem(
                                        prod?.QTD,
                                        prod?.CONFERIDO
                                    )}
                                    %
                                </Text>
                            </Td> */}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
