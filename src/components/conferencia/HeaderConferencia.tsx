import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import InputWithLabel from "../tools/InputWithLabel";

type HeaderConferenciaType = {
    verifyScanner: any;
    setVerifyScanner: any;
    setBarcodeScan: any;
    findOrder: any;
    itens: any;
};

export default function HeaderConferencia({
    setBarcodeScan,
    setVerifyScanner,
    verifyScanner,
    findOrder,
    itens,
}: HeaderConferenciaType) {
    const [numeroPedido, setNumeroPedido] = useState("");
    const [separador, setSeparador] = useState("");
    const [conferente, setConferente] = useState("");

    return (
        <Flex w="100%" mt="2rem" justify="space-evenly">
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
                />
                <InputWithLabel
                    value={conferente}
                    setValue={setConferente}
                    text={"CONFERENTE"}
                    isDisabled={itens !== null ? false : true}
                />
            </Flex>
            <Flex justify={"space-between"} w={"100%"}>
                <Button
                    // isDisabled={verifyScanner ? true : false}
                    mr="1rem"
                    w="100px"
                    bgColor={"#005F27"}
                    color="white"
                    _hover={{
                        bgColor: "#083b19",
                    }}
                    onClick={() => {
                        findOrder();
                    }}
                >
                    Buscar
                </Button>
                <Flex w={"50%"}>
                    <Button
                        isDisabled={verifyScanner ? true : false}
                        mr="1rem"
                        w="full"
                        bgColor={"#005F27"}
                        color="white"
                        _hover={{
                            bgColor: "#083b19",
                        }}
                        onClick={() => {
                            setVerifyScanner(true);
                        }}
                        disabled={itens !== null ? false : true}
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
                        }}
                    >
                        Cancelar conferencia
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
