import {
    Flex,
    Image,
    Box,
    Text,
    useBreakpointValue,
    Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function HeaderDesk() {
    const wideVersion = useBreakpointValue({
        md: false,
        lg: true,
    });
    const Router = useRouter();

    const { asPath } = useRouter();

    return (
        <Flex direction="column">
            <Flex
                align={"center"}
                w={"40%"}
                justify={"space-between"}
                fontSize={wideVersion ? "16px" : "14px"}
            >
                <Flex>
                    <Image
                        alt="Logo da RS"
                        src={"/Image/RS-icon.svg"}
                        w="40px"
                    />
                    <Text fontSize={"32px"} fontWeight="Bold">
                        SE
                    </Text>
                    <Text
                        fontSize={"32px"}
                        textColor={"#E30613"}
                        fontWeight="Bold"
                    >
                        RS
                    </Text>
                </Flex>
                <Button
                    variant="ghost"
                    _hover={
                        asPath !== "/"
                            ? {
                                  border: "1px solid #E30613",
                                  textColor: "#E30613",
                              }
                            : {}
                    }
                    fontWeight="Regular"
                    onClick={() => {
                        Router.push("/");
                    }}
                    w={"140px"}
                    bgColor={asPath === "/" ? "red" : ""}
                    color={asPath === "/" ? "white" : ""}
                >
                    CONFERÊNCIA
                </Button>
                <Button
                    variant="ghost"
                    _hover={
                        asPath !== "/pedidosFaturados"
                            ? {
                                  border: "1px solid #E30613",
                                  textColor: "#E30613",
                              }
                            : {}
                    }
                    w={"130px"}
                    fontWeight="Regular"
                    onClick={() => {
                        Router.push("/pedidosFaturados");
                    }}
                    bgColor={asPath === "/pedidosFaturados" ? "red" : ""}
                    color={asPath === "/pedidosFaturados" ? "white" : ""}
                >
                    FATURADOS
                </Button>
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
