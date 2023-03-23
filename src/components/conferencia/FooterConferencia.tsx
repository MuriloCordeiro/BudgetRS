import { Flex, Button } from "@chakra-ui/react";

type FooterConferenciaType = {
    imprimirModal: any;
    resetItens: any;
};

export default function FooterConferencia({
    imprimirModal,
    resetItens,
}: FooterConferenciaType) {
    return (
        <Flex
            fontFamily={"Montserrat"}
            justifyContent={"center"}
            position={"fixed"}
            w={"100%"}
            bottom={0}
            bg={"white"}
            h={"70px"}
            align={"center"}
            p="2rem"
            // paddingTop={"10px"}
            borderTop={"2px solid #E2E8F0"}
        >
            <Flex w="full" justify="start">
                <Button
                    fontSize={"12px"}
                    w="208px"
                    mr="1rem"
                    bgColor="#005F27"
                    color="white"
                    colorScheme={"green"}
                >
                    GERAR ETIQUETAS
                </Button>
                <Button
                    fontSize={"12px"}
                    w="208px"
                    mr="1rem"
                    bgColor="#339CD8"
                    color="white"
                    colorScheme={"blue"}
                    onClick={() => resetItens()}
                >
                    ADICIONAR ITEM
                </Button>
                <Button
                    fontSize={"12px"}
                    mr="1rem"
                    w="208px"
                    bgColor="#F9B000"
                    color="white"
                    colorScheme={"yellow"}
                    onClick={() => imprimirModal()}
                >
                    IMPRIMIR ITENS PENDENTES
                </Button>
            </Flex>
            <Button
                fontSize={"12px"}
                w="208px"
                justifySelf="end"
                bgColor="#005F27"
                color="white"
                colorScheme={"green"}
            >
                SEPARAÇÃO CONCLUÍDA
            </Button>
        </Flex>
    );
}
