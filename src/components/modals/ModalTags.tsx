import {
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Button,
    ModalBody,
    Flex,
    Img,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ItemsTYPE } from "../../types/itensType";

type ModalPrintTagsType = {
    isOpen: boolean;
    onClose: any;
    itens: ItemsTYPE;
    orderNumber: string;
};

export default function ModalTags({
    isOpen,
    onClose,
    itens,
    orderNumber,
}: ModalPrintTagsType) {
    const [checked, setChecked] = useState<any[]>([]);
    const [allCheckedsNumber, setAllCheckedsNumber] = useState<number>(0);

    useEffect(() => {
        setAllCheckedsNumber(0);
        let allCheckeds = 0;
        itens?.orders?.forEach((prod) => {
            allCheckeds += prod?.checked;
        });

        setAllCheckedsNumber(allCheckeds);
    }, [itens]);

    useEffect(() => {
        checkeds();
    }, [allCheckedsNumber]);

    function checkeds() {
        setChecked([]);
        const teste = [];
        for (let i = 0; i < allCheckedsNumber; i += 1) {
            if (allCheckedsNumber !== 0) {
                teste.push(
                    <Flex
                        p="1rem"
                        direction="column"
                        align={"center"}
                        border={"1px solid black"}
                    >
                        <Flex direction="column">
                            <Flex direction="row" align="end" fontSize="18px">
                                <Img
                                    src="/Image/logo-rs-pneus.svg"
                                    w="140px"
                                    h="40px"
                                    mr="4rem"
                                />
                                <Text fontWeight="bold">
                                    PED: {orderNumber}
                                </Text>
                            </Flex>
                            <Flex mt="1rem" direction="column" fontSize="18px">
                                <Text fontWeight="bold">
                                    {itens?.orders &&
                                        itens?.orders[0].shippingCompany}
                                </Text>
                                <Text fontWeight="bold">
                                    {itens?.orders &&
                                        itens?.orders[0].city.replace(" ", "")}
                                </Text>
                                <Text fontWeight="bold">
                                    VOL. {i + 1}/{allCheckedsNumber}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                );
            }
        }
        setChecked(teste);
    }

    console.log("orderNumber", orderNumber);

    const componentRef = useRef<any>();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader alignSelf={"center"}>
                    Imprimir etiquetas
                </ModalHeader>
                <ModalCloseButton />
                <ReactToPrint
                    trigger={() => {
                        return (
                            <Button
                                w="208px"
                                bgColor="#339CD8"
                                color="white"
                                colorScheme={"blue"}
                                alignSelf={"center"}
                                _hover={{ opacity: "70%" }}
                            >
                                Imprimir
                            </Button>
                        );
                    }}
                    content={() => componentRef.current}
                    documentTitle="Etiqueta"
                    pageStyle="print"
                    onBeforeGetContent={() => Promise.resolve()}
                />
                <ModalBody>
                    {/* <div style={{ display: "none" }}> */}
                    <Flex
                        ref={componentRef}
                        p="1rem"
                        direction="column"
                        align={"center"}
                        gap={"5px"}
                    >
                        {checked.length > 0 && checked?.map((prod) => prod)}
                    </Flex>
                    {/* </div> */}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
