import { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection";
import {
  Button,
  Flex,
  Img,
  useDisclosure,
  useToast,
  Spinner,
  useBreakpointValue,
  Tooltip,
  Text,
  Select,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
} from "@chakra-ui/react";

import HeaderDesk from "../components/header/HeaderDesk";
import TableComponent from "../components/conferencia/TableComponent";
import ModalPrint from "../components/modals/ModalPrint";
import { getSoapData } from "../hooks/get/getSoapData";
import { ItemsTYPE, Order } from "../types/itensType";
import ModalComponent from "../components/modals/ModalDeleteItem";
import { postSoapData } from "../hooks/post/postSoapData";
import InputWithLabel from "../components/tools/InputWithLabel";
import ModalConfFinished from "../components/modals/ModalConfFinished";
import ModalNewOrder from "../components/modals/ModalNewOrder";
import ModalTags from "../components/modals/ModalTags";
import LayoutDesk from "../components/Layouts/layoutDesktop";

import InputMask from "react-input-mask";

export default function Homepage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [personType, setPersonType] = useState<any>("CPF");
  const [test, setTest] = useState<any>();

  useEffect(() => {
    test?.length < 14 ? setPersonType("CPNJ") : setPersonType("CPF");
    console.log("personType", personType);
    console.log("person", test);
  }, [test]);
  return (
    <>
      <LayoutDesk>
        <Flex direction="column" w="100%" h="100%">
          <Flex justify="space-between">
            {/* <Image alt="Logo da RS" src={"/Image/RS-icon.svg"} w="40px" /> */}
            <Flex>
              <Text fontSize={"24px"} fontWeight="Bold">
                Sistema de Orçamento -
              </Text>
              <Text
                fontSize={"24px"}
                textColor={"#E30613"}
                fontWeight="Bold"
                ml="3px"
              >
                RS
              </Text>
            </Flex>
            <Flex gap="1">
              <Text fontSize="24px" fontWeight="bold">
                Oferta:
              </Text>
              <Text fontSize="24px" fontWeight="bold" color="green">
                0%
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            mt="1rem"
            bgColor="white"
            h="full"
            borderRadius="15px"
            p="1.5rem"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
          >
            <Flex w="100%" justify="space-evenly" gap="1rem">
              <Flex gap="1rem" w="full" align="center">
                {/* <Input
                  placeholder="CNPJ/CPF"
                  w="50%"
                  type="text"
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                /> */}

                <Input
                  // {...inputProps}
                  type="text"
                  placeholder="CPF/CNPJ"
                  isRequired
                  // value={test}
                  as={InputMask}
                  onChange={(e) => setTest(e.target.value)}
                  mask={
                    personType === "CPF"
                      ? "999.999.999-99"
                      : "99.999.999/9999-99"
                  }
                />

                <Select placeholder="Prazo" w="50%">
                  <option value={0}>À vista</option>
                  <option value={28}>28 dias</option>
                  <option value={56}>56 dias</option>
                </Select>
                <Select placeholder="Transação" w="50%">
                  <option value={"90111"}>90111 - Frota</option>
                  <option value={"90110"}>90110 - Frota s/ IE</option>
                  <option value={"90100"}>90100 - Revenda</option>
                  <option value={"90115"}>90115 - Revenda s/ ST</option>
                  <option value={"90119"}>90119 - Industria</option>
                </Select>

                <Button w="50%" onClick={onOpen} colorScheme="green">
                  BUSCAR
                </Button>
              </Flex>
            </Flex>

            <Flex align="center" w="100%" h="100%" direction="column">
              <Img
                src="/Image/RS-icon.svg"
                w={"220px"}
                mt={"8rem"}
                opacity={"70%"}
              />
              <Text mt="2rem" opacity={"70%"} fontWeight="Bold">
                Preencha os campos necessários para buscar
              </Text>
            </Flex>
            {/* <Button mt="1rem">Oi</Button> */}
            {/* <TableContainer mt="2rem">
              <Table variant="simple">
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer> */}
          </Flex>
        </Flex>
        {/* <Button>Open Modal</Button> */}
      </LayoutDesk>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal de busca</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Busque por descrição ou marca" />
            <TableContainer mt="2rem">
              <Table variant="striped">
                <TableCaption>Tabela de itens</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Códido Produto</Th>
                    <Th>Descrição</Th>
                    <Th>Preço de Tabela</Th>
                    <Th>Marca</Th>
                    <Th>Quantidade</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>10983</Td>
                    <Td>PNEU XBRI </Td>
                    <Td>10</Td>
                    <Td>XBRI</Td>
                    <Td>Input aqui</Td>
                  </Tr>
                </Tbody>
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="green">Buscar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Flex flexDirection="column">
        <Flex
          w="full"
          top={0}
          bg={"white"}
          h={"160px"}
          justify={"center"}
          direction="column"
          zIndex={15}
        >
          <HeaderDesk />

          <Flex
            px="2rem"
            w="100%"
            mt="1rem"
            justify="space-evenly"
            paddingBottom={"1rem"}
            borderBottom={"2px solid #E2E8F0"}
            gap="1rem"
          >
            <Flex gap="1rem" w="full">
              <Select placeholder="Estado" w="full">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select placeholder="ICMS ST/DIFAL" w="full">
                <option value="option1">Sim</option>
                <option value="option2">Não</option>
              </Select>
              <Select placeholder="Prazo de pag." w="full">
                <option value="option1">Sim</option>
                <option value="option2">Não</option>
              </Select>
              <Select placeholder="Tipo de frete" w="full">
                <option value="option1">Sim</option>
                <option value="option2">Não</option>
              </Select>{" "}
              <Select placeholder="Cat. cliente" w="full">
                <option value="option1">Sim</option>
                <option value="option2">Não</option>
              </Select>
              <Button w="full">BUSCAR</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <TableContainer h="full" px="1rem">
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer> */}
    </>
  );
}
