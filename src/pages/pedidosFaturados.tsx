import { Flex, Text, Button, Spinner, Center, Img } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HeaderDesk from "../components/header/HeaderDesk";
import TableComponentPedidosFaturados from "../components/pedidosFat/PedidosFatTable";
import { getTodayInvoices } from "../hooks/get/getInvoices";
import LayoutDesk from "../components/Layouts/layoutDesktop";
import { postDispatchOrder } from "../hooks/post/postDispatchOrder";

export default function PedidosFaturados() {
  const [pedidosFat, setPedidosFat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);

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
    <LayoutDesk>
      <HeaderDesk />
      <Flex justify={"end"} mt={"18px"}>
        <Button
          bg={"#339CD8"}
          textColor={"white"}
          onClick={() => getAllInvoices()}
          paddingX={"40px"}
          _hover={{ opacity: "80%" }}
          colorScheme={"cyan"}
          mt="1rem"
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
            opacity={"70%"}
          />
          <Spinner
            thickness="10px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.400"
            w="350px"
            h="350px"
          />
        </Center>
      ) : (
        <Flex direction="column" w="full">
          <TableComponentPedidosFaturados pedidosFat={pedidosFat} />
        </Flex>
      )}
    </LayoutDesk>
  );
}
