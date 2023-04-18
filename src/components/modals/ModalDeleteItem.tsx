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

export default function ModalComponent({
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
                bg={"#E30613"}
                textColor={"white"}
                _hover={{ opacity: "70%" }}
                onClick={onClose}
              >
                Voltar
              </Button>
              {TextButton && (
                <Button
                  // variant="outline"
                  colorScheme={"gren"}
                  bg={"#005F27"}
                  _hover={{ opacity: "70%" }}
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
