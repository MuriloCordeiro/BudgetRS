import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type ModalErrorType = {
  errorMessage: boolean;
  onCloseError: any;
  eanError: any;
  checked: any;
  qtd: any;
  setErrorMessage: any;
};

export default function ModalError({
  checked,
  eanError,
  errorMessage,
  onCloseError,
  qtd,
  setErrorMessage,
}: ModalErrorType) {
  return (
    <Modal isOpen={errorMessage} onClose={onCloseError} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Erro!
          <Flex ml="20%"></Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction="column">
            <Text mb="1rem" fontSize="18px">
              A quantidade de itens verificados não deve ser maior que a
              quantidade padrão.
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              setErrorMessage(false);
            }}
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
