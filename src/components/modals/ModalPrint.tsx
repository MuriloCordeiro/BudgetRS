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
    ModalFooter,
} from "@chakra-ui/react";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import PrintMock from "../../../public/mock/PrintMock";

type ModalPrintType = {
    isOpen: boolean;
    onClose: any;
};

export default function ModalPrint({ isOpen, onClose }: ModalPrintType) {
    const componentRef = useRef<any>();
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Testando</ModalHeader>
                <ModalCloseButton />
                <ReactToPrint
                    trigger={() => {
                        return <Button>teste</Button>;
                    }}
                    content={() => componentRef.current}
                    documentTitle="Etiqueta"
                    pageStyle="print"
                    onBeforeGetContent={() => Promise.resolve()}
                    // onAfterPrint={() => setTimeout(() => window.location.reload(), 500)}
                />
                <ModalBody>
                    <Flex
                        ref={componentRef}
                        p="1rem"
                        w="100%"
                        h="100%"
                        // borderWidth="2px"
                        direction="column"
                    >
                        {PrintMock.map((order, index) => (
                            <Flex
                                key={index}
                                borderColor="gray"
                                w="full"
                                direction="column"
                                align="center"
                                mb="1.5rem"
                            >
                                <Flex>
                                    <Text fontSize="22px">
                                        Pedido: <b>{order.pedido}</b>
                                    </Text>
                                    {/* <Text fontSize="12px" fontWeight="bold">
                    </Text> */}
                                </Flex>
                                <Flex>
                                    <Text fontSize="22px">
                                        {order.transportadora}
                                    </Text>
                                </Flex>
                                <Flex>
                                    <Text fontSize="22px">Volume:</Text>
                                    <Text fontSize="22px" fontWeight="bold">
                                        {order.volume}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
