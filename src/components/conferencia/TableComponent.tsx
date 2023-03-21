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
        return porcentagem;
    }
    return (
        <TableContainer mt="2rem" mb="2rem">
            <Table variant="striped" size="sm">
                <Thead>
                    <Tr>
                        <Th>
                            <Text>ITENS</Text>
                        </Th>
                        <Th>END 1</Th>
                        <Th>END 2</Th>
                        <Th>END 3</Th>
                        <Th>EAN</Th>
                        <Th>QTD</Th>
                        <Th>CONFERIDO</Th>
                        <Th>%</Th>
                    </Tr>
                </Thead>

                <Tbody fontFamily={"Arial"}>
                    {arrayItens.map((prod, index) => (
                        <Tr key={index}>
                            <Td>{prod?.itens}</Td>
                            <Td>{prod?.end1}</Td>
                            <Td>{prod?.end2}</Td>
                            <Td>{prod?.end3}</Td>
                            <Td>{prod?.EAN}</Td>
                            <Td>{prod?.QTD}</Td>
                            <Td>
                                {prod?.EAN === null ? (
                                    <ChangeConferido
                                        arrayItens={arrayItens}
                                        setArrayItens={setArrayItens}
                                        index={index}
                                    />
                                ) : (
                                    prod?.CONFERIDO
                                )}
                            </Td>
                            <Td>
                                {calcularPorcentagem(
                                    prod?.QTD,
                                    prod?.CONFERIDO
                                )}
                                %
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
