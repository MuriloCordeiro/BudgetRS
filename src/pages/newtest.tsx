// import Lottie from "react-lottie";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import useScanDetection from "use-scan-detection";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import KeyPressButton from "../services/test";
import ReactToPrint from "react-to-print";

export default function Scanner() {
  const [barcodeScan, setBarcodeScan] = useState<any>("");
  const [verifyTest, setVerifyTest] = useState<Boolean>();
  const [test, setTest] = useState<any>();
  const [errorCode, setErrorCode] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const componentRef = useRef<any>();
  const Mock = [
    {
      itens: "185/65R15 88H OUTRUN M2 MOMO",
      end1: "1A-2D",
      end2: "3A-A",
      end3: "3A-A",
      EAN: "1189189600024300092459400010004",
      QTD: 5,
      CONFERIDO: 0,
    },
    {
      itens: "185/65R14 86T F600 FIRESTONE",
      end1: "1A-2D",
      end2: "1A-2D",
      end3: "1A-2D",
      EAN: "1189189600024300092429600040004",
      QTD: 10,
      CONFERIDO: 0,
    },
    {
      itens: "185/65R14 86T F600 FIRESTONE",
      end1: "1A-2D",
      end2: "1A-2D",
      end3: "1A-2D",
      EAN: "1189189600024300092429600040004",
      QTD: 10,
      CONFERIDO: 0,
    },
  ];

  const toast = useToast();

  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScanDetection({
      onComplete: (barcode): any => {
        {
          verifyTest === true
            ? setBarcodeScan(barcode)
            : setBarcodeScan("Nenhum item escaneado");
        }
      },
      // onError: setErrorCode,
      preventDefault: false,
      minLength: 14,
      stopPropagation: true,
    });

    console.log("Esse é o código de barras", barcodeScan);
    console.log("Esse é o código de error", errorCode);
  }

  return (
    <>
      {/* <Flex p="2rem">teste:{barcodeScan}</Flex>
      <Button mt="10rem">teste</Button> */}

      <Flex p="2rem" direction="column">
        <Flex>Esse é o código correto: {barcodeScan}</Flex>
        <Flex w="80%" mt="5rem" justify="space-evenly">
          <Input
            mr="1rem"
            placeholder="Número do pedido"
            onChange={(e) => {
              setTest(e.target.value);
            }}
            value={test}
          />
          <KeyPressButton keyCode={70} label="Enter" />
          <KeyPressButton keyCode={27} label="Esc" />
          <Input mr="1rem" placeholder="Separador" />
          <Input mr="1rem" placeholder="Conferente" />
          <Button
            mr="1rem"
            w="full"
            bgColor={"#005F27"}
            color="white"
            onClick={() => {
              setVerifyTest(true);
            }}
            onClickCapture={() => {
              toast({
                title: "Verificação Iniciada.",
                description: "Você já pode usar o Scanner.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            Iniciar conferencia
          </Button>

          <Button
            w="full"
            bgColor={"red"}
            color="white"
            onClick={() => {
              setVerifyTest(false);
            }}
            onClickCapture={() => {
              toast({
                title: "Verificação Encerrada.",
                description: "O scanner foi desabilitado.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            Cancelar conferencia
          </Button>
        </Flex>
        <TableContainer mt="2rem" mb="2rem">
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>
                  <Text>ITENS</Text>
                </Th>
                <Th>END 1</Th>
                <Th>END 2</Th>
                <Th>END 3</Th>
                <Th>EAN</Th>
                <Th>QTD</Th>
                <Th>CONFERIDO</Th>
                <Th>%</Th>
              </Tr>
            </Thead>

            <Tbody>
              {Mock.map((prod, index) => (
                <Tr key={index}>
                  <Td>{prod.itens}</Td>
                  <Td>{prod.end1}</Td>
                  <Td>{prod.end2}</Td>
                  <Td>{prod.end3}</Td>
                  <Td>{prod.EAN}</Td>
                  <Td>{prod.QTD}</Td>
                  <Td>{prod.CONFERIDO}</Td>
                  <Td>
                    <Button>teste</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex>
          <Flex w="full" justify="start">
            <Button mr="1rem" bgColor="#005F27" color="white">
              Gerar Etiquetas
            </Button>
            <Button mr="1rem" bgColor="#ABB4BD" color="white">
              Reiniciar Conferências
            </Button>
            <Button mr="1rem" bgColor="#F9B000" color="white">
              Imprimir Itens Pendentes
            </Button>
          </Flex>
          <Button justifySelf="end" bgColor="#005F27" color="white">
            Separação Concluída
          </Button>
        </Flex>
      </Flex>
      <Button onClick={onOpen}>Open Modal</Button>

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
                  <Text fontSize="26px" fontWeight="bold">
                    {barcodeScan}
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
    </>
  );
}
