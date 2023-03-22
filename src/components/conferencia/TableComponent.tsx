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

type TableComponentType = {
    arrayItens: any[];
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
                    >
                        <Flex w={"100%"}>
                            <Th w="30%">
                                <Text>ITENS</Text>
                            </Th>
                            <Th w="10%">END 1</Th>
                            <Th w="10%">END 2</Th>
                            <Th w="21%">EAN</Th>
                            <Th w="10%">QTD</Th>
                            <Th w="11%">CONFERIDO</Th>
                            <Th w="5%">%</Th>
                        </Flex>
                    </Tr>
                </Thead>

                <Tbody fontFamily={"Arial"}>
                    {arrayItens.map((prod, index) => (
                        <Tr key={index}>
                            <Td w="30%">{prod?.itens}</Td>
                            <Td w="10%">{prod?.end1}</Td>
                            <Td w="10%">{prod?.end2}</Td>
                            <Td w="20%">{prod?.EAN}</Td>
                            <Td w="10%">{prod?.QTD}</Td>
                            <Td w="10%">
                                {prod?.EAN === null &&
                                prod?.CONFERIDO !== prod?.QTD ? (
                                    <ChangeConferido
                                        arrayItens={arrayItens}
                                        setArrayItens={setArrayItens}
                                        index={index}
                                    />
                                ) : (
                                    prod?.CONFERIDO
                                )}
                            </Td>
                            <Td w="5%">
                                <Text
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
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
