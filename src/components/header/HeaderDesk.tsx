import {
    Flex,
    Image,
    Box,
    Text,
    Link,
    useBreakpointValue,
} from "@chakra-ui/react";

export default function HeaderDesk() {
    const wideVersion = useBreakpointValue({
        md: false,
        lg: true,
    });
    return (
        <Flex direction="column">
            <Flex
                align={"center"}
                w={"50%"}
                justify={"space-between"}
                textStyle={"Regular"}
                fontSize={wideVersion ? "16px" : "14px"}
            >
                <Flex>
                    <Image
                        alt="Logo da RS"
                        src={"/Image/RS-icon.svg"}
                        w="30px"
                    />
                    <Text fontSize={"30px"}>SE</Text>
                    <Text fontSize={"30px"} textColor={"#E30613"}>
                        RS
                    </Text>
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
