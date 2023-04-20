import {
    Flex,
    Text,
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverBody,
    Button,
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
import ModalDeleteItem from "../modals/ModalDeleteItem";

type PrintBarcode = {
    prodName?: string;
    prodBarcode?: any;
    func?: any;
    isRemaining: boolean;
};

export default function PopoverSERS({
    prodName,
    prodBarcode,
    func,
    isRemaining,
}: PrintBarcode) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();

    const componentRef = useRef<any>();

    return (
        <Flex>
            <Popover placement="left">
                <PopoverTrigger>
                    <IconButton
                        variant="ghost"
                        aria-label="Interaction Button"
                        icon={<BsThreeDots />}
                        display={
                            !isRemaining && prodBarcode === null
                                ? "none"
                                : "flex"
                        }
                    />
                </PopoverTrigger>
                <PopoverContent bgColor="white" w="full">
                    <PopoverBody>
                        <Button
                            disabled={prodBarcode === null}
                            onClick={onOpen}
                            bgColor="#339CD8"
                            color="white"
                            colorScheme="blue"
                            mr="2rem"
                        >
                            Imprimir cod. barras
                        </Button>
                        <Button
                            onClick={onOpenDelete}
                            disabled={!isRemaining}
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
            <ModalDeleteItem
                Title="Remover item adicionado"
                Phrase={`Deseja deletar o item pendente ${prodName}?`}
                func={func}
                TextButton="REMOVER ITEM"
                isOpen={isOpenDelete}
                onClose={onCloseDelete}
            />
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
                        <Flex w={"100%"} justify={"space-between"}>
                            <Button
                                variant="ghost"
                                bgColor={"red"}
                                color="white"
                                mr="2rem"
                                _hover={{
                                    bgColor: "#b40505",
                                }}
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <ReactToPrint
                                trigger={() => {
                                    return (
                                        <Button
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
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
