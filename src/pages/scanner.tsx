import { useState, useEffect, useRef } from "react";
import useScanDetection from "use-scan-detection";
import {
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
  Box,
  ModalCloseButton,
} from "@chakra-ui/react";

import { PrintModal } from "../components/ModalAlert";
import ReactToPrint from "react-to-print";

export default function Scanner() {
  const [barcodeScan, setBarcodeScan] = useState<any>(
    "Nenhum código de barra escaneado"
  );
  const [verifyScanner, setVerifyScanner] = useState<Boolean>();
  const [errorMessage, setErrorMessage] = useState<any>(false);
  const [eanError, setEanError] = useState<string>();
  const [qtd, setQtd] = useState<any>();
  const [checked, setChecked] = useState<any>();
  const [mock, setMock] = useState([
    {
      itens: "185/65R15 88H OUTRUN M2 MOMO",
      end1: "1A-2D",
      end2: "3A-A",
      end3: "3A-A",
      EAN: "1189189600024300092462600020004",
      QTD: 5,
      CONFERIDO: 0,
    },
    {
      itens: "185/65R14 86T F600 FIRESTONE",
      end1: "1A-2D",
      end2: "1A-2D",
      end3: "1A-2D",
      EAN: "1189189600024300092508900020002",
      QTD: 10,
      CONFERIDO: 0,
    },
    // {
    //   itens: "185/65R14 86T F600 FIRESTONE",
    //   end1: "1A-2D",
    //   end2: "1A-2D",
    //   end3: "1A-2D",
    //   EAN: "1189189600024300092508900020002",
    //   QTD: 10,
    //   CONFERIDO: 0,
    // },
  ]);

  const toast = useToast({
    duration: 1500,
    isClosable: true,
    containerStyle: {
      color: "white",
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure();

  function handleScanner() {
    const checkEAN = (Mock: any) => Mock.EAN === barcodeScan;

    const result = mock.some(checkEAN);

    if (verifyScanner === true && result === true) {
      const mappedMock = mock?.map((prod) => {
        if (prod?.EAN === barcodeScan) {
          setBarcodeScan(null);

          if (prod?.EAN === barcodeScan && prod?.CONFERIDO + 1 > prod?.QTD) {
            setErrorMessage(true);
            setEanError(prod?.EAN);
            setQtd(prod?.QTD);
            setChecked(prod?.CONFERIDO + 1);
            setVerifyScanner(false);
            // fetch("https://localhost:5001/ExpeditionScannerAPI");

            return prod;
          } else {
            return { ...prod, CONFERIDO: prod.CONFERIDO + 1 };
          }
        } else {
          setBarcodeScan(null);
          return prod;
        }
      });
      setMock(mappedMock);
    } else if (verifyScanner === true) {
      setBarcodeScan(null);
      // fetch("https://localhost:5001/ExpeditionScannerAPI");
    }
  }

  useEffect(() => {
    if (barcodeScan !== null) {
      handleScanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodeScan]);

  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScanDetection({
      onComplete: (barcode): any => {
        if (verifyScanner === true) {
          setBarcodeScan(barcode.trim());
          console.log("barcode", barcode);
        } else {
          setBarcodeScan("Nenhum código válido escaneado");
        }
      },
      preventDefault: false,
      minLength: 13,
      stopPropagation: true,
    });
  }

  useEffect(() => {
    if (verifyScanner === true) {
      toast({
        title: "Verificação Iniciada.",
        description: "O scanner foi habilitado.",
        status: "success",
      });
    } else if (verifyScanner === false) {
      toast({
        title: "Verificação Finalizada.",
        description: "O scanner foi desabilitado.",
        status: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyScanner]);

  const componentRef = useRef<any>();

  const PrintMock = [
    {
      pedido: 1057,
      transportadora: "Translovato",
      volume: "01/126",
    },
    {
      pedido: 1057,
      transportadora: "Translovato",
      volume: "01/126",
    },
    {
      pedido: 1057,
      transportadora: "Translovato",
      volume: "01/126",
    },
    {
      pedido: 1057,
      transportadora: "Translovato",
      volume: "01/126",
    },
    {
      pedido: 1057,
      transportadora: "Translovato",
      volume: "01/126",
    },
  ];

  return (
    <>
      <Flex p="2rem" direction="column">
        <Flex align="start" direction="column">
          <Image alt="Logo da RS" src={"/RS.png"} />

          <Box
            borderBottomWidth="2px"
            mt="1rem"
            w="100%"
            borderColor="gray.200"
          />
        </Flex>
        {/* <Button onClick={() => fetch("http://localhost:3333/soap")}>
          Buscar soap
        </Button> */}
        <Flex w="80%" mt="3rem" justify="space-evenly">
          <Input mr="1rem" placeholder="Número do pedido" />

          <Input mr="1rem" placeholder="Separador" />
          <Input mr="1rem" placeholder="Conferente" />

          <Button
            isDisabled={verifyScanner ? true : false}
            mr="1rem"
            w="full"
            bgColor={"#005F27"}
            color="white"
            _hover={{
              bgColor: "#083b19",
            }}
            onClick={() => {
              setVerifyScanner(true);
            }}
          >
            Iniciar conferência
          </Button>

          <Button
            isDisabled={!verifyScanner ? true : false}
            w="full"
            bgColor={"red"}
            color="white"
            _hover={{
              bgColor: "#b40505",
            }}
            onClick={() => {
              setVerifyScanner(false);
              setBarcodeScan("Nenhum código de barra escaneado");
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
              {mock.map((prod, index) => (
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
            <Button mr="1rem" bgColor="#F9B000" color="white" onClick={onOpen}>
              Imprimir Itens Pendentes
            </Button>
          </Flex>
          <Button justifySelf="end" bgColor="#005F27" color="white">
            Separação Concluída
          </Button>
        </Flex>
      </Flex>

      {/* <PrintModal isOpen={isOpen} onClose={onClose} /> */}

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
                    <Text fontSize="22px">{order.transportadora}</Text>
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

      <Modal isOpen={errorMessage} onClose={onCloseError} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Erro! - {eanError}
            <Flex ml="20%"></Flex>
          </ModalHeader>

          <ModalBody>
            <Flex direction="column">
              <Text mb="1rem" fontSize="18px">
                Você escaneou <b>{checked}</b> itens, porém a quantidade correta
                é <b>{qtd}</b>. Por favor, verifique novamente e tente escanear
                a quantidade de itens correta.
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
    </>
  );
}
