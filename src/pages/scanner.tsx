// import Lottie from "react-lottie";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
  useToast,
  Textarea,
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

import ReactToPrint from "react-to-print";
// import myFunction from "../utils";
export default function Scanner() {
  const [barcodeScan, setBarcodeScan] = useState<any>(
    "Nenhum código de barra escaneado"
  );
  const [verifyScanner, setVerifyScanner] = useState<Boolean>();
  const [errorMessage, setErrorMessage] = useState<any>();

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
    {
      itens: "185/65R14 86T F600 FIRESTONE",
      end1: "1A-2D",
      end2: "1A-2D",
      end3: "1A-2D",
      EAN: "1189189600024300092508900020002",
      QTD: 10,
      CONFERIDO: 0,
    },
  ]);

  const toast = useToast({
    duration: 1500,
    isClosable: true,
    containerStyle: {
      color: "white",
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const componentRef = useRef<any>();

  function encontraDadoParecido() {
    const checkEAN = (Mock: any) => Mock.EAN === barcodeScan;

    const result = mock.some(checkEAN);

    if (verifyScanner === true && result === true) {
      const mappedMock = mock?.map((prod) => {
        if (prod?.EAN === barcodeScan) {
          setBarcodeScan(null);
          if (prod?.EAN === barcodeScan && prod?.CONFERIDO + 1 > prod?.QTD) {
            console.log("deu errado pq o conferido ta maior");
            setVerifyScanner(false);
            fetch("https://localhost:5001/ExpeditionScannerAPI");
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
      fetch("https://localhost:5001/ExpeditionScannerAPI");
    }
  }

  useEffect(() => {
    if (barcodeScan !== null) {
      encontraDadoParecido();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodeScan]);

  // const mappedMock = mock?.map((prod)=>{
  //   if (prod?.EAN === barcodeScan){
  //     return { ...prod, CONFERIDO: prod.CONFERIDO + 1 };
  //   } else {
  //       return prod;
  //   }
  // })

  //     const mappedMock = mock?.map((prod) => {

  //       if (prod?.EAN === barcodeScan) {
  //       } else {
  //           if (prod?.CONFERIDO > prod?.QTD) {
  //             // fetch("https://localhost:5001/ExpeditionScannerAPI");
  //             console.log(
  //               `Item: ${prod?.EAN}, CONFERIDO: ${prod?.CONFERIDO + 1} de ${
  //                 prod?.QTD
  //               }`
  //             );
  //           return { ...prod, CONFERIDO: prod.CONFERIDO + 1 };
  //         }
  //       } else if (verifyScanner === true && prod?.EAN !== barcodeScan) {
  //         console.log("QTD do item máximo");
  //         fetch("https://localhost:5001/ExpeditionScannerAPI");

  //         setIsOpenError(true);
  //         setErrorMessage("QTD do item máximo");
  //         handlePlayError();
  //       }
  //       return prod;
  //     });
  //   } else if (verifyScanner === true && result === false) {
  //     fetch("https://localhost:5001/ExpeditionScannerAPI");
  //     console.log("EAN não existe", result);
  //   }
  // }

  // useEffect(() => {
  //   encontraDadoParecido();
  // }, [barcodeScan]);

  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScanDetection({
      onComplete: (barcode): any => {
        if (verifyScanner === true) {
          setBarcodeScan(barcode.trim());
        } else {
          setBarcodeScan("Nenhum código válido escaneado");
        }
        // encontraDadoParecido();
        // ? : setBarcodeScan("");
      },
      // onError: setErrorCode,
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

  // useEffect(() => {
  //   if (barcodeScan.trim(" ") !== "1189189600024300092462600020004") {
  //     fetch("https://localhost:5001/ExpeditionScannerAPI");
  //   }
  // }, [barcodeScan]);
  // function fetchScanner() {}
  return (
    <>
      {/* <Flex p="2rem">teste:{barcodeScan}</Flex>
      <Button mt="10rem">teste</Button> */}

      {/* <Button onClick={() => fetchScanner()}>Olá</Button> */}
      <Flex p="2rem" direction="column">
        <Flex>Esse é o código correto: {barcodeScan}</Flex>
        <Flex w="80%" mt="5rem" justify="space-evenly">
          <Input mr="1rem" placeholder="Número do pedido" />
          {/* <Button onClick={encontraDadoParecido}>Comparar</Button> */}

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
