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
} from "@chakra-ui/react";

export default function ModalComponent() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cancelar Conferencia</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            Voce está cancelando a conferencia do pedido 7331
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="orange" mr={3} onClick={onClose}>
                            Voltar
                        </Button>
                        <Button variant="ghost" colorScheme={"red"}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
