import { Flex, Button } from "@chakra-ui/react";

type FooterConferenciaType = {
    imprimirModal: any;
};

export default function FooterConferencia({
    imprimirModal,
}: FooterConferenciaType) {
    return (
        <Flex>
            <Flex w="full" justify="start">
                <Button mr="1rem" bgColor="#005F27" color="white">
                    Gerar Etiquetas
                </Button>
                <Button mr="1rem" bgColor="#ABB4BD" color="white">
                    Reiniciar Conferências
                </Button>
                <Button
                    mr="1rem"
                    bgColor="#F9B000"
                    color="white"
                    onClick={() => imprimirModal()}
                >
                    Imprimir Itens Pendentes
                </Button>
            </Flex>
            <Button justifySelf="end" bgColor="#005F27" color="white">
                Separação Concluída
            </Button>
        </Flex>
    );
}
