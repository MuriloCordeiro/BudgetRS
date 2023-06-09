import {
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
    bgColor?: string;
    bgSecundaryColor?: string;
};

export default function ModalDeleteItem({
    Title,
    Phrase,
    TextButton,
    isOpen,
    onClose,
    func,
    bgColor,
    bgSecundaryColor,
}: ModalComponentType) {
    return (
        <>
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
                                bg={
                                    bgSecundaryColor
                                        ? bgSecundaryColor
                                        : "#F9B000"
                                }
                                _hover={{ opacity: "80%" }}
                                onClick={onClose}
                            >
                                VOLTAR
                            </Button>
                            {TextButton && (
                                <Button
                                    textColor={"white"}
                                    bg={bgColor ? bgColor : "red"}
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
