import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputWithLabel from "../tools/InputWithLabel";

type HeaderConferenciaType = {
    verifyScanner: any;
    setVerifyScanner: any;
    setBarcodeScan: any;
    findOrder: any;
    itens: any;
    resetItens: any;
};

export default function HeaderConferencia({
    setBarcodeScan,
    setVerifyScanner,
    verifyScanner,
    findOrder,
    itens,
    resetItens,
}: HeaderConferenciaType) {
    const [numeroPedido, setNumeroPedido] = useState("");
    const [separador, setSeparador] = useState("");
    const [conferente, setConferente] = useState("");
    const [colorBorder, setColorBorder] = useState(false);

    const toast = useToast({
        duration: 1500,
        isClosable: true,
        containerStyle: {
            color: "white",
        },
    });

    function validateConf() {
        if (separador.length === 0 && conferente.length === 0) {
            setColorBorder(true);
            toast({
                title: "Input vazio",
                description: "Separador e Conferente precisam ser preenchidos.",
                status: "error",
            });
        } else {
            setVerifyScanner(true);
            setColorBorder(false);
        }
    }

    return (
        <Flex
            w="100%"
            mt="2rem"
            justify="space-evenly"
            paddingBottom={"10px"}
            borderBottom={"2px solid #E2E8F0"}
        >
            <Flex>
                <InputWithLabel
                    value={numeroPedido}
                    setValue={setNumeroPedido}
                    text={"NÚMERO DO PEDIDO"}
                />
                <InputWithLabel
                    value={separador}
                    setValue={setSeparador}
                    text={"SEPARADOR"}
                    isDisabled={itens !== null ? false : true}
                    borderColor={colorBorder}
                />
                <InputWithLabel
                    value={conferente}
                    setValue={setConferente}
                    text={"CONFERENTE"}
                    isDisabled={itens !== null ? false : true}
                    borderColor={colorBorder}
                />
            </Flex>
            <Flex justify={"space-between"} w={"100%"}>
                <Button
                    isDisabled={numeroPedido.length > 3 ? false : true}
                    mr="1rem"
                    w="100px"
                    bgColor={"#005F27"}
                    color="white"
                    _hover={{
                        bgColor: "#083b19",
                    }}
                    onClick={() => {
                        findOrder(numeroPedido);
                    }}
                >
                    Buscar
                </Button>
                <Flex w={"50%"}>
                    <Button
                        // isDisabled={verifyScanner ? true : false}
                        mr="1rem"
                        w="full"
                        bgColor={"#005F27"}
                        color="white"
                        _hover={{
                            bgColor: "#083b19",
                        }}
                        onClick={() => {
                            validateConf();
                        }}
                        disabled={
                            itens !== null && !verifyScanner
                                ? // separador.length > 0 && conferente.length > 0
                                  //     ? false
                                  //     :
                                  false
                                : true
                        }
                    >
                        Iniciar conferência
                    </Button>

                    <Button
                        isDisabled={!verifyScanner ? true : false}
                        w="full"
                        bgColor={"red"}
                        color="white"
                        _hover={{
                            bgColor: "#b40505",
                        }}
                        onClick={() => {
                            setVerifyScanner(false);
                            setBarcodeScan("Nenhum código de barra escaneado");
                            resetItens();
                        }}
                    >
                        Cancelar conferencia
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
