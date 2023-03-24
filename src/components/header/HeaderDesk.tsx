import { Flex, Image, Box, Text, Link } from "@chakra-ui/react";

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
                <Flex>
                    <Image
                        alt="Logo da RS"
                        src={"/Image/RS-icon.svg"}
                        w="25px"
                    />
                    <Text>SE</Text>
                    <Text textColor={"#E30613"}>RS</Text>
                </Flex>
                <Link href={"/"}>
                    <Text>CONFERÊNCIA</Text>
                </Link>
                <Link href={"/pedidosFaturados"}>
                    <Text>PEDIDOS FATURADOS</Text>
                </Link>
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
