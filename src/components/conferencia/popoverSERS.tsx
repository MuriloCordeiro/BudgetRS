import {
  Flex,
  Text,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverBody,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Img,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import Barcode from "react-barcode";

type PrintBarcode = {
  prodName?: string;
  prodBarcode?: any;
};

export default function PopoverSERS({ prodName, prodBarcode }: PrintBarcode) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const componentRef = useRef<any>();

  return (
    <Flex>
      <Popover placement="left">
        <PopoverTrigger>
          <IconButton
            variant="ghost"
            aria-label="Interaction Button"
            icon={<BsThreeDots />}
            display={prodBarcode === null ? "none" : "flex"}
          />
        </PopoverTrigger>
        <PopoverContent bgColor="white" w="full">
          <PopoverBody>
            <Button onClick={onOpen} bgColor="#339CD8" color="white" mr="2rem">
              Imprimir cod. barras
            </Button>
            <Button
              onClick={onOpen}
              bgColor={"red"}
              color="white"
              _hover={{
                bgColor: "#b40505",
              }}
            >
              Excluir
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Imprimir a etiqueta do produto:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              ref={componentRef}
              px="1rem"
              direction="column"
              w="full"
              align="center"
            >
              <Text fontWeight="bold" fontSize="12px">
                {prodName}
              </Text>
              <Barcode value={prodBarcode} lineColor="black" />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <ReactToPrint
              trigger={() => {
                return (
                  <Button
                    mr="2rem"
                    bgColor={"#005F27"}
                    color="white"
                    _hover={{
                      bgColor: "#083b19",
                    }}
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
            <Button
              variant="ghost"
              bgColor={"red"}
              color="white"
              _hover={{
                bgColor: "#b40505",
              }}
              onClick={onClose}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
