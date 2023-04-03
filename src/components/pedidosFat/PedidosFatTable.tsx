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
  Center,
  Img,
  Spinner,
  Flex,
} from "@chakra-ui/react";

import { Invoices } from "../../types/invoicesType";

type tableTypes = {
  pedidosFat: Invoices[];
};

export default function TableComponentPedidosFaturados({
  pedidosFat,
}: tableTypes) {
  return (
    <>
      {pedidosFat ? (
        <TableContainer
          mt="2rem"
          mb="2rem"
          // display={pedidosFat ? "flex" : "none"}
        >
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
            <Tbody>
              {pedidosFat &&
                pedidosFat?.map((prod, index) => (
                  <Tr key={index}>
                    <Td>{prod?.orderNumber}</Td>

                    <Td>{prod?.invoiceNumber}</Td>
                    <Td>{prod?.emissionDate}</Td>
                    <Td>{prod?.expectedDate}</Td>
                    <Td>{prod?.GNRE === "true" ? "Sim" : "Não"}</Td>
                    <Td>{prod?.client}</Td>
                    <Td>{prod?.volumeQty}</Td>
                    <Td>{prod?.shippingCompany}</Td>
                    {/* <Td>{prod?.clientCode}</Td> */}

                    <Td>
                      <a href={prod.pdf} target="\_blank" className="btn">
                        <Button
                          bg={"#005F27"}
                          borderRadius={"30px"}
                          textColor={"white"}
                          colorScheme={"green"}
                        >
                          IMPRIMIR NOTA
                        </Button>
                      </a>
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
    </>
  );
}
