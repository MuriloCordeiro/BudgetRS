import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import { ItemsTYPE } from "../../types/itensType";
import ModalConfFinished from "../modals/ModalConfFinished";

type FooterConferenciaType = {
    imprimirModal: any;
    resetItens: any;
    orderType: boolean;
    isAllChecked: boolean;
    itens: ItemsTYPE;
};

export default function FooterConferencia({
    imprimirModal,
    resetItens,
    orderType,
    isAllChecked,
    itens,
}: FooterConferenciaType) {
    const {
        isOpen: isOpenFinishConf,
        onOpen: onOpenFinishConf,
        onClose: onCloseFinishConf,
    } = useDisclosure();
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
                    disabled={orderType ? (isAllChecked ? false : true) : true}
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
                    disabled={orderType ? false : true}
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
                    disabled={orderType ? false : true}
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
                disabled={orderType ? false : isAllChecked ? false : true}
                onClick={() => onOpenFinishConf()}
            >
                SEPARAÇÃO CONCLUÍDA
            </Button>
            {/* <ModalConfFinished
                isOpen={isOpenFinishConf}
                onClose={onCloseFinishConf}
                isAllChecked={isAllChecked}
                itens={itens}
            /> */}
        </Flex>
    );
}
