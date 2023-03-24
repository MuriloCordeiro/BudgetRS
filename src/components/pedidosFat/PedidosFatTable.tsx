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
} from "@chakra-ui/react";
import { useState } from "react";
import pedidosFaturados from "../../../public/mock/PedidosFaturadosMock";
import ChangeConferido from "../../helpers/changeConferido";

type TableComponentType = {
    arrayItens: any[];
    setArrayItens: any;
};
// {
//     arrayItens,
//     setArrayItens,
// }: TableComponentType
export default function TableComponentPedidosFaturados() {
    const [pedidosFat, setPedidosFat] =
        useState<typeof pedidosFaturados>(pedidosFaturados);
    return (
        <TableContainer mt="2rem" mb="2rem">
            <Table variant="striped" size="md">
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

                <Tbody fontFamily={"Arial"}>
                    {pedidosFat.map((prod, index) => (
                        <Tr key={index}>
                            <Td>{prod?.pedido}</Td>
                            <Td>{prod?.NF}</Td>
                            <Td>{prod?.EMITIDO}</Td>
                            <Td>{prod?.PREVISÃO}</Td>
                            <Td>{prod?.GNRE}</Td>
                            <Td>{prod?.CLIENTE}</Td>
                            <Td>{prod?.QTD}</Td>
                            <Td>{prod?.TRASPORTADORA}</Td>
                            <Td>
                                <Button
                                    bg={"#005F27"}
                                    borderRadius={"30px"}
                                    textColor={"white"}
                                    colorScheme={"green"}
                                >
                                    IMPRIMIR NOTA
                                </Button>
                            </Td>
                            <Td>
                                <Button
                                    bg={"#005F27"}
                                    borderRadius={"30px"}
                                    textColor={"white"}
                                    colorScheme={"green"}
                                >
                                    EXPEDIR
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
