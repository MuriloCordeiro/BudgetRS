import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import InputWithLabel from "../tools/InputWithLabel";
import SearchLottie from "../../../public/lottie/Search.json";
import { getProductById } from "../../hooks/get/getProductById";

type ModalComponentType = {
    isOpen: any;
    onClose: any;
    func?: any;
};

export default function ModalNewOrder({
    isOpen,
    onClose,
    func,
}: ModalComponentType) {
    const [itemId, setItemId] = useState("");
    const [checkedProduct, setCheckedProduct] = useState<any[]>([]);
    const [product, setProduct] = useState<any[]>(checkedProduct);
    const [isLoading, setIsLoading] = useState(false);
    const loadingDefaultOptions = {
        loop: true,
        isAutoPlay: false,
        animationData: SearchLottie,
        rendererSettings: {
            // preserveAspectRatio: "xMidYMid slice",
        },
    };

    async function findProduct() {
        setIsLoading(true);
        const response = await getProductById(itemId);
        console.log("response", response?.data);
        setProduct([...checkedProduct, response?.data]);
        setIsLoading(false);
    }

    useEffect(() => {
        console.log("product", product.length);
    }, [product]);

    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textStyle={"BarlowMedium"}>
                        Buscar itens por ID
                    </ModalHeader>
                    <ModalBody>
                        <Flex w={"100%"} direction="column" h={"350px"}>
                            <Flex gap={"1rem"}>
                                <InputWithLabel
                                    isDisabled={isLoading}
                                    value={itemId}
                                    setValue={setItemId}
                                    text={
                                        "ESCREVA O NÚMERO DO ITEM PARA BUSCAR"
                                    }
                                    width={"100%"}
                                    textColor={"black"}
                                    fontSize={"12px"}
                                />
                                <Button
                                    isLoading={isLoading}
                                    bgColor={"#005F27"}
                                    color="white"
                                    textStyle={"MontserratBold"}
                                    fontSize={"12px"}
                                    _hover={{
                                        opacity: "80%",
                                    }}
                                    onClick={() => {
                                        findProduct();
                                    }}
                                >
                                    BUSCAR
                                </Button>
                            </Flex>
                            {product.length > 0 ? (
                                <>
                                    <Flex direction={"column"} mt={"30px"}>
                                        <Flex
                                            mb={"10px"}
                                            w={"100%"}

                                            // justify={"space-around"}
                                        >
                                            <Flex w={"20%"} justify="center">
                                                <Text>ID</Text>
                                            </Flex>
                                            <Flex w={"60%"} justify="center">
                                                <Text>ITEM</Text>
                                            </Flex>
                                            <Flex w={"20%"} justify="center">
                                                <Text>EAN</Text>
                                            </Flex>
                                        </Flex>
                                        {product?.map((prod) => (
                                            <Flex
                                                key={prod?.itemCode}
                                                w={"100%"}
                                                bg={"#D9D9D9"}
                                                h={"50px"}
                                                padding={"5px"}
                                                borderRadius={"5px"}
                                                mb={"5px"}
                                            >
                                                <Flex
                                                    w={"20%"}
                                                    justify="space-around"
                                                >
                                                    <Checkbox
                                                        colorScheme={"red"}
                                                        borderColor={"gray.600"}
                                                        value={prod?.itemCode}
                                                    />
                                                    <Text alignSelf={"center"}>
                                                        {prod?.itemCode}
                                                    </Text>
                                                    <Text></Text>
                                                </Flex>
                                                <Flex
                                                    w={"60%"}
                                                    justify="center"
                                                >
                                                    <Text alignSelf={"center"}>
                                                        {prod?.description
                                                            .substring(0, 70)
                                                            .replace("PNEU", "")
                                                            .trim()}
                                                        ...
                                                    </Text>
                                                </Flex>
                                                <Flex
                                                    w={"20%"}
                                                    justify="center"
                                                >
                                                    <Text alignSelf={"center"}>
                                                        {prod?.barcode
                                                            ? prod?.barcode
                                                            : "-"}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        ))}
                                        <Flex
                                            w={"100%"}
                                            bg={"#D9D9D9"}
                                            padding={"5px"}
                                            borderRadius={"5px"}
                                            mb={"5px"}
                                        >
                                            <Flex w={"15%"} justify="center">
                                                <Text>prod?.itemCode</Text>
                                            </Flex>
                                            <Flex w={"60%"} justify="center">
                                                <Text>prod?.description</Text>
                                            </Flex>
                                            <Flex w={"20%"} justify="center">
                                                <Text>prod?.barcode</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </>
                            ) : (
                                <Lottie
                                    options={loadingDefaultOptions}
                                    height={"400px"}
                                    width={"400px"}
                                />
                            )}
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Flex justify={"space-between"} w={"100%"}>
                            <Button
                                bgColor={"red.900"}
                                textStyle={"MontserratBold"}
                                fontSize={"12px"}
                                color="white"
                                _hover={{
                                    opacity: "80%",
                                }}
                                onClick={onClose}
                            >
                                CANCELAR
                            </Button>

                            <Button
                                isDisabled={product ? false : true}
                                // w="full"
                                bgColor={"#005F27"}
                                color="white"
                                textStyle={"MontserratBold"}
                                fontSize={"12px"}
                                _hover={{
                                    opacity: "80%",
                                }}
                                onClick={() => {
                                    // validateConf();
                                    // handleScanner();
                                }}
                            >
                                ADICIONAR PRODUTO
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
