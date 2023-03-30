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
  Flex,
  Img,
} from "@chakra-ui/react";
import { useState } from "react";

import { Invoices } from "../../types/invoicesType";
import Router, { useRouter } from "next/router";
import Link from "next/link";
type tableTypes = {
  pedidosFat: Invoices[];
  isLoading: boolean;
};

export default function TableComponentPedidosFaturados({
  pedidosFat,
  isLoading,
}: tableTypes) {
  const [test, setTest] = useState<any>();
  const router = useRouter();
  console.log("test", test);

  function testing() {
    const fileReader = new FileReader();
    const deuboa = fileReader.readAsDataURL(test);
    console.log("deuboa", deuboa);
    console.log("deuboa", test);
  }

  function Resume() {
    return <iframe src="file://192.168.2.214/araquari/danfe/8614.pdf" />;
  }

  return (
    <>
      <Flex>
        <Button>teste</Button>

        <a
          href={"file://192.168.2.214/araquari/danfe/8614.pdf"}
          target="\_blank"
          className="btn"
        >
          Learn More
        </a>
      </Flex>
      <TableContainer
        mt="2rem"
        mb="2rem"
        display={pedidosFat ? "flex" : "none"}
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
          {/* <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}> */}
          <Tbody fontFamily={"Arial"}>
            {pedidosFat &&
              pedidosFat?.map((prod, index) => (
                <>
                  <Button
                    onClick={() => {
                      setTest(prod.pdf);
                    }}
                  >
                    ok
                  </Button>
                  <Tr key={index}>
                    <Td>{prod?.orderNumber}</Td>

                    <Td>{prod?.invoiceNumber}</Td>
                    <Td>{prod?.emissionDate}</Td>
                    <Td>{prod?.expectedDate}</Td>
                    <Td>{prod?.GNRE}</Td>
                    <Td>{prod?.client}</Td>
                    <Td>{prod?.volumeQty}</Td>
                    <Td>{prod?.shippingCompany}</Td>
                    {/* <Td>{prod?.clientCode}</Td> */}

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
                </>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
