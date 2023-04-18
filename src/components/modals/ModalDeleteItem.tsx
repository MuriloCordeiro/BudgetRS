import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Flex,
} from "@chakra-ui/react";

type ModalComponentType = {
    Title: string;
    Phrase: string | null;
    TextButton?: string;
    isOpen: any;
    onClose: any;
    func?: any;
};

export default function ModalDeleteItem({
    Title,
    Phrase,
    TextButton,
    isOpen,
    onClose,
    func,
}: ModalComponentType) {
    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="25px" textStyle={"Bold"}>
                        {Title}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"} textStyle={"Regular"}>
                        <Text>{Phrase}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Flex justify={"space-between"} w={"100%"}>
                            <Button
                                textColor={"white"}
                                bg={"#F9B000"}
                                _hover={{ opacity: "80%" }}
                                onClick={onClose}
                            >
                                Voltar
                            </Button>
                            {TextButton && (
                                <Button
                                    textColor={"white"}
                                    bg={"red"}
                                    _hover={{ opacity: "80%" }}
                                    onClick={() => {
                                        func();
                                        onClose();
                                    }}
                                >
                                    {TextButton}
                                </Button>
                            )}
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
