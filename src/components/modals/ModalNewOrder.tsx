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
    Checkbox,
    useToast,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Lottie from "react-lottie";
import InputWithLabel from "../tools/InputWithLabel";
import SearchLottie from "../../../public/lottie/Search.json";
import { getProductById } from "../../hooks/get/getProductById";
import { Order } from "../../types/itensType";
import ChangeQty from "../../helpers/changeQty";

type ModalComponentType = {
    isOpen: any;
    onClose: any;
    func?: any;
    itens?: any;
};

export default function ModalNewOrder({
    isOpen,
    onClose,
    func,
    itens,
}: ModalComponentType) {
    const [itemId, setItemId] = useState("");
    const [checkedProduct, setCheckedProduct] = useState<Order[]>([]);
    const [product, setProduct] = useState<any[]>(checkedProduct);
    const [isLoading, setIsLoading] = useState(false);

    const wideVersion = useBreakpointValue({
        md: false,
        lg: true,
    });

    const toast = useToast({
        duration: 3000,
        isClosable: true,
        containerStyle: {
            color: "white",
            textAlign: "center",
        },
    });

    const loadingDefaultOptions = {
        loop: true,
        isAutoPlay: false,
        animationData: SearchLottie,
        rendererSettings: {},
    };

    async function findProduct() {
        setIsLoading(true);
        const response = await getProductById(itemId);
        if (response !== undefined) {
            if (product.length === 0) {
                setProduct([response?.data, ...checkedProduct]);
            } else if (
                product.every(
                    (prod) => prod?.itemCode !== response?.data?.itemCode
                )
            ) {
                setProduct([response?.data, ...checkedProduct]);
            } else {
                toast({
                    title: "Produto já selecionado",
                    status: "warning",
                });
                setProduct(checkedProduct);
            }
        } else {
            toast({
                title: "Item não encontrado",
                status: "error",
            });
        }
        setItemId("");
        setIsLoading(false);
    }

    function checkIsChecked(id: string) {
        if (checkedProduct.some((prod) => prod?.itemCode === id)) {
            return true;
        } else {
            return false;
        }
    }

    function handleProductCheck(id: string, checked: boolean) {
        const productId = product.filter((prod) => prod?.itemCode === id);
        if (checked) {
            setCheckedProduct([...checkedProduct, ...productId]);
        } else {
            const newChecked = checkedProduct.filter(
                (prod) => prod?.itemCode !== id
            );
            setCheckedProduct([...newChecked]);
        }
    }

    function newItens() {
        const hasremaingItens = itens?.orders.some((item: any) => {
            const hasCheckYet = checkedProduct.some(
                (check) =>
                    check?.itemCode === item?.itemCode &&
                    item?.remaining === true
            );

            return hasCheckYet;
        });
        const qtyNotEmpty = checkedProduct.some((check) => check?.qty === 0);

        if (qtyNotEmpty) {
            toast({
                title: "Insira a quantidade em todos os itens selecionados",
                status: "warning",
            });
        } else if (hasremaingItens) {
            toast({
                title: "Item ja adicionado",
                description:
                    "Um ou mais itens já foram adicionados como itens adicionados, caso queira mudar a quantidade, remova o item pendente e adicione com a quantidade correta",
                status: "warning",
            });
        } else {
            func(checkedProduct);
            onClose();
            toast({
                title: "Itens adicionados",
                status: "success",
            });
            setCheckedProduct([]);
            setProduct([]);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent h={wideVersion ? "" : "500px"}>
                    <ModalHeader>Buscar itens por ID</ModalHeader>
                    <ModalBody>
                        <Flex
                            w={"100%"}
                            direction="column"
                            h={wideVersion ? "450px" : "350px"}
                        >
                            <Flex gap={"1rem"}>
                                <InputWithLabel
                                    isDisabled={isLoading}
                                    value={itemId}
                                    setValue={setItemId}
                                    text={
                                        "ESCREVA O NÚMERO DO ITEM PARA BUSCAR"
                                    }
                                    width={"full"}
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
                                        <Flex mb={"10px"} w={"100%"}>
                                            <Flex w={"20%"} justify="center">
                                                <Text>ID</Text>
                                            </Flex>
                                            <Flex w={"40%"} justify="center">
                                                <Text>ITEM</Text>
                                            </Flex>
                                            <Flex w={"20%"} justify="center">
                                                <Text>EAN</Text>
                                            </Flex>
                                            <Flex w={"20%"} justify="center">
                                                <Text>QTD</Text>
                                            </Flex>
                                        </Flex>
                                        {product?.map((prod, index) => (
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
                                                        isChecked={checkIsChecked(
                                                            prod?.itemCode
                                                        )}
                                                        onChange={(event) =>
                                                            handleProductCheck(
                                                                prod?.itemCode,
                                                                event.target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                    <Text alignSelf={"center"}>
                                                        {prod?.itemCode}
                                                    </Text>
                                                    <Text></Text>
                                                </Flex>
                                                <Flex
                                                    w={"40%"}
                                                    justify="center"
                                                >
                                                    <Text alignSelf={"center"}>
                                                        {prod?.description
                                                            .substring(0, 40)
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
                                                <Flex
                                                    w={"20%"}
                                                    justify="center"
                                                >
                                                    <Text alignSelf={"center"}>
                                                        {checkedProduct.some(
                                                            (checkProd) =>
                                                                checkProd?.itemCode ===
                                                                prod?.itemCode
                                                        ) ? (
                                                            prod?.qty === 0 ? (
                                                                <ChangeQty
                                                                    index={
                                                                        index
                                                                    }
                                                                    arrayItens={
                                                                        product
                                                                    }
                                                                    setArrayItens={
                                                                        setProduct
                                                                    }
                                                                    id={
                                                                        prod?.itemCode
                                                                    }
                                                                    checkedProduct={
                                                                        checkedProduct
                                                                    }
                                                                    setCheckedProduct={
                                                                        setCheckedProduct
                                                                    }
                                                                />
                                                            ) : (
                                                                prod?.qty
                                                            )
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        ))}
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
                                bgColor={"red"}
                                textStyle={"MontserratBold"}
                                fontSize={"12px"}
                                color="white"
                                _hover={{
                                    opacity: "80%",
                                }}
                                onClick={onClose}
                            >
                                VOLTAR
                            </Button>

                            <Button
                                isDisabled={
                                    checkedProduct.length > 0 ? false : true
                                }
                                bgColor={"#005F27"}
                                color="white"
                                textStyle={"MontserratBold"}
                                fontSize={"12px"}
                                _hover={{
                                    opacity: "80%",
                                }}
                                onClick={() => {
                                    newItens();
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
