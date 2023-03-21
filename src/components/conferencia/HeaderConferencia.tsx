import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import InputWithLabel from "../tools/InputWithLabel";

type HeaderConferenciaType = {
    verifyScanner: any;
    setVerifyScanner: any;
    setBarcodeScan: any;
};

export default function HeaderConferencia({
    setBarcodeScan,
    setVerifyScanner,
    verifyScanner,
}: HeaderConferenciaType) {
    const [numeroPedido, setNumeroPedido] = useState("");

    return (
        <Flex w="80%" mt="3rem" justify="space-evenly">
            <Flex>
                <InputWithLabel
                    value={numeroPedido}
                    setValue={setNumeroPedido}
                    text={"NÚMERO DO PEDIDO"}
                />
                <InputWithLabel
                    value={numeroPedido}
                    setValue={setNumeroPedido}
                    text={"SEPARADOR"}
                />
                <InputWithLabel
                    value={numeroPedido}
                    setValue={setNumeroPedido}
                    text={"CONFERENTE"}
                />
            </Flex>

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
    );
}
