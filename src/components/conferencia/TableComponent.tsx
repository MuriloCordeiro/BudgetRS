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
    Tooltip,
    background,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
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

    function deleteRemaningIten(id: string, isRemaing: boolean) {
        const itens = { ...arrayItens };
        const deleteItem = itens?.orders?.filter(
            (prod) => prod?.itemCode !== id && isRemaing === true
        );

        itens.orders = deleteItem;

        setArrayItens(itens);
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
                            <Th w="5%"></Th>
                            <Th w="7%">itemID</Th>
                            <Th w="32.5%">ITENS</Th>
                            <Th w="5%">END 1</Th>
                            <Th w="5%">END 2</Th>
                            <Th w="7%">CID/EST</Th>
                            <Th w="10%">EAN</Th>
                            <Th w="8%">QTD</Th>
                            <Th w="12%">CONFERIDO</Th>
                            <Th w="5%">%</Th>
                        </Flex>
                    </Tr>
                </Thead>
                {/* {console.log("arrayItens", arrayItens)} */}
                <Tbody fontFamily={"Arial"}>
                    {arrayItens?.orders.map((prod, index) => (
                        <Tr key={index}>
                            <Td w="3%">
                                <BsTrash
                                    visibility={
                                        prod?.remaining ? "visible" : "hidden"
                                    }
                                    cursor={"pointer"}
                                    onClick={() =>
                                        deleteRemaningIten(
                                            prod?.itemCode,
                                            prod?.remaining
                                        )
                                    }
                                />
                            </Td>
                            <Td w="10%">
                                <Tooltip
                                    fontFamily={"Arial"}
                                    label={
                                        prod?.remaining
                                            ? "Este é um item pendente"
                                            : ""
                                    }
                                    borderRadius={"15px"}
                                >
                                    <Text
                                        cursor={
                                            prod?.remaining ? "help" : "false"
                                        }
                                        textAlign={"center"}
                                        bgColor={
                                            prod?.remaining ? "#F9B000" : "none"
                                        }
                                        padding={"5px"}
                                        borderRadius={"15px"}
                                    >
                                        {prod?.itemCode}
                                    </Text>
                                </Tooltip>
                            </Td>
                            <Td w="34%">{prod?.description}</Td>
                            <Td w="5%">
                                {prod?.address1
                                    ? prod?.address1.replace(/\|/g, "")
                                    : "-"}
                            </Td>
                            <Td w="5%">
                                {prod?.address2
                                    ? prod?.address2.replace(/\|/g, "")
                                    : "-"}
                            </Td>
                            <Td w="6%">{prod?.city ? prod?.city : "-"}</Td>
                            <Td w="11%">
                                {prod?.barcode ? prod?.barcode : "-"}
                            </Td>
                            <Td w="12%">{prod?.qty}</Td>
                            <Td w="12%">
                                {prod?.barcode === null &&
                                prod?.checked !== prod?.qty ? (
                                    <ChangeConferido
                                        arrayItens={arrayItens}
                                        setArrayItens={setArrayItens}
                                        index={index}
                                    />
                                ) : (
                                    prod?.checked
                                )}
                            </Td>
                            <Td w="5%">
                                <Text
                                    textAlign={"center"}
                                    bg={
                                        calcularPorcentagem(
                                            prod?.qty,
                                            prod?.checked
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
                                        prod?.qty,
                                        prod?.checked
                                    )}
                                    %
                                </Text>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
