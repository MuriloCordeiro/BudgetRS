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
    Phrase: string;
    TextButton?: string;
    isOpen: any;
    onClose: any;
    func?: any;
};

export default function ModalComponent({
    Title,
    Phrase,
    TextButton,
    isOpen,
    onClose,
    func,
}: ModalComponentType) {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{Title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{Phrase}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Flex justify={"space-between"} w={"100%"}>
                            <Button
                                colorScheme="orange"
                                mr={3}
                                onClick={onClose}
                            >
                                Voltar
                            </Button>
                            {TextButton && (
                                <Button
                                    variant="outline"
                                    colorScheme={"red"}
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
