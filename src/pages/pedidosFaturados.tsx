import { Flex, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import pedidosFaturados from "../../public/mock/PedidosFaturadosMock";
import HeaderDesk from "../components/header/HeaderDesk";
import TableComponentPedidosFaturados from "../components/pedidosFat/PedidosFatTable";

export default function PedidosFaturados() {
    const [pedidosFat, setPedidosFat] = useState(pedidosFaturados);

    const router = useRouter();
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
                    onClick={() => router.reload()}
                    paddingX={"40px"}
                    _hover={{ opacity: "80%" }}
                    colorScheme={"cyan"}
                >
                    ATUALIZAR TELA
                </Button>
            </Flex>
            <TableComponentPedidosFaturados />
        </Flex>
    );
}
