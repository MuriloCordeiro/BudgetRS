import { Flex, Text, Button, Spinner, Center, Img } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import pedidosFaturados from "../../public/mock/PedidosFaturadosMock";
import HeaderDesk from "../components/header/HeaderDesk";
import TableComponentPedidosFaturados from "../components/pedidosFat/PedidosFatTable";
import { getTodayInvoices } from "../hooks/get/getInvoices";

export default function PedidosFaturados() {
  const [pedidosFat, setPedidosFat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);

  const router = useRouter();

  async function getAllInvoices() {
    setIsLoading(true);
    const data = await getTodayInvoices();
    setPedidosFat(data?.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getAllInvoices();
  }, []);

  return (
    <Flex p="2rem" direction={"column"}>
      <HeaderDesk />
      <Flex align={"center"} justify={"space-between"}>
        <Text mt={"20px"} fontSize={"22px"}>
          PEDIDOS FATURADOS
        </Text>
        <Button
          bg={"#339CD8"}
          textColor={"white"}
          onClick={() => getAllInvoices()}
          paddingX={"40px"}
          _hover={{ opacity: "80%" }}
          colorScheme={"cyan"}
        >
          ATUALIZAR TELA
        </Button>
      </Flex>

      {isLoading ? (
        <Center>
          <Img
            src="/Image/RS-icon.svg"
            w={"220px"}
            position={"absolute"}
            mt={"140px"}
            opacity={"70%"}
            // display={whenIsLoading}
          />
          <Spinner
            thickness="10px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.400"
            w="350px"
            h="350px"
            mt="150px"
            //   display={whenIsLoading}
          />
        </Center>
      ) : (
        <TableComponentPedidosFaturados
          pedidosFat={pedidosFat}
          isLoading={isLoading}
        />
      )}
    </Flex>
  );
}
