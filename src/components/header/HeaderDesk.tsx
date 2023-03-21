import { Flex, Image, Box, Text } from "@chakra-ui/react";

export default function HeaderDesk() {
    return (
        <Flex direction="column">
            <Flex
                align={"center"}
                w={"50%"}
                justify={"space-between"}
                fontFamily={"Arial"}
                fontWeight={"600"}
            >
                <Image alt="Logo da RS" src={"/RS.png"} />
                <Text>CONFERÊNCIA</Text>
                <Text>PEDIDOS FATURADOS</Text>
                <Text>ENDEREÇAMENTO</Text>
            </Flex>
            <Box
                borderBottomWidth="2px"
                mt="1rem"
                w="100%"
                borderColor="gray.200"
            />
        </Flex>
    );
}
