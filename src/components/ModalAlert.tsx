import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";

interface ModalType {
  isOpen?: any;
  onClose?: any;
}

export function PrintModal({ isOpen, onClose }: any) {
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
            borderWidth="1px"
            w="400px"
            h="600px"
            p="1rem"
            align="center"
            direction="column"
          >
            <Flex
              mb="1rem"
              borderColor="gray"
              borderWidth="2px"
              w="195px"
              h="140px"
              p="0.5rem"
              direction="column"
            >
              <Flex>
                <Text fontSize="26px">Barcode: </Text>
                <Text fontSize="26px" fontWeight="bold"></Text>
              </Flex>
              <Flex>
                <Text fontSize="26px">Translovato</Text>
              </Flex>
              <Flex>
                <Text fontSize="26px">Volume:</Text>
                <Text fontSize="26px" fontWeight="bold">
                  01/126
                </Text>
              </Flex>
            </Flex>
            <Flex
              borderColor="gray"
              borderWidth="2px"
              w="195px"
              h="140px"
              p="0.5rem"
              direction="column"
              mb="1rem"
            >
              <Flex>
                <Text fontSize="26px">Pedido:</Text>
                <Text fontSize="26px" fontWeight="bold">
                  1057
                </Text>
              </Flex>
              <Flex>
                <Text fontSize="26px">Translovato</Text>
              </Flex>
              <Flex>
                <Text fontSize="26px">Volume:</Text>
                <Text fontSize="26px" fontWeight="bold">
                  01/126
                </Text>
              </Flex>
            </Flex>
            <Flex
              bgColor="black"
              borderColor="gray"
              borderWidth="2px"
              w="195px"
              h="140px"
              p="0.5rem"
              direction="column"
              align="center"
            >
              <Text fontSize="36px" color="white">
                Pedido
              </Text>

              <Text fontSize="36px" fontWeight="bold" color="white">
                1057
              </Text>
            </Flex>
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
