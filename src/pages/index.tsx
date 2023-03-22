import { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection";
import { Box, Flex, useDisclosure, useToast } from "@chakra-ui/react";

import HeaderDesk from "../components/header/HeaderDesk";
import HeaderConferencia from "../components/conferencia/HeaderConferencia";
import TableComponent from "../components/conferencia/TableComponent";
import FooterConferencia from "../components/conferencia/FooterConferencia";
import ItensMock from "../../public/mock/ItensMock";
import ModalPrint from "../components/modals/ModalPrint";
import ModalError from "../components/modals/ModalError";
import { getSoapData } from "../hooks/getSoapData";

export default function Scanner() {
    const [barcodeScan, setBarcodeScan] = useState<any>(
        "Nenhum código de barra escaneado"
    );
    const [verifyScanner, setVerifyScanner] = useState<Boolean>();
    const [errorMessage, setErrorMessage] = useState<any>(false);
    const [eanError, setEanError] = useState<string>();
    const [qtd, setQtd] = useState<any>();
    const [checked, setChecked] = useState<any>();
    const [itens, setItens] = useState<any[] | null>(null);

    async function teste() {
        const result = await getSoapData();
        console.log("result", result);
    }

    function findOrder() {
        setItens(ItensMock);
    }

    function resetItens() {
        if (itens !== null) {
            const resetedItens = itens.map((prod) => {
                return { ...prod, CONFERIDO: 0 };
            });
            setItens(resetedItens);
        }
    }

    const toast = useToast({
        duration: 1500,
        isClosable: true,
        containerStyle: {
            color: "white",
        },
    });

    const {
        isOpen: isOpenPrinter,
        onOpen: onOpenPrinter,
        onClose: onClosePrinter,
    } = useDisclosure();
    const {
        isOpen: isOpenError,
        onOpen: onOpenError,
        onClose: onCloseError,
    } = useDisclosure();

    function handleScanner() {
        const checkEAN = (Mock: any) => Mock.EAN === barcodeScan;
        if (itens !== null) {
            const result = itens.some(checkEAN);

            if (verifyScanner === true && result === true) {
                const mappedMock = itens?.map((prod) => {
                    if (prod?.EAN && prod?.EAN === barcodeScan) {
                        setBarcodeScan(null);
                        if (
                            prod?.EAN === barcodeScan &&
                            prod?.CONFERIDO + 1 > prod?.QTD
                        ) {
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
                setItens(mappedMock);
            } else if (verifyScanner === true) {
                setBarcodeScan(null);
                // fetch("https://localhost:5001/ExpeditionScannerAPI");
            }
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

    return (
        <Flex height="100vh" display="flex" flexDirection="column">
            <Flex direction="column">
                <Flex
                    p="2rem"
                    position={"fixed"}
                    w={"100%"}
                    top={0}
                    bg={"white"}
                    h={"160px"}
                    justify={"center"}
                    direction="column"
                    zIndex={15}
                    // opacity={"50%"}
                >
                    <HeaderDesk />
                    <HeaderConferencia
                        verifyScanner={verifyScanner}
                        setVerifyScanner={setVerifyScanner}
                        setBarcodeScan={setBarcodeScan}
                        findOrder={findOrder}
                        itens={itens}
                    />
                </Flex>
                {itens !== null && (
                    <>
                        <TableComponent
                            arrayItens={itens}
                            setArrayItens={setItens}
                        />
                        <FooterConferencia
                            imprimirModal={onOpenPrinter}
                            resetItens={resetItens}
                        />
                    </>
                )}
            </Flex>

            <ModalPrint isOpen={isOpenPrinter} onClose={onClosePrinter} />
            <ModalError
                checked={checked}
                eanError={eanError}
                errorMessage={errorMessage}
                onCloseError={onCloseError}
                qtd={qtd}
                setErrorMessage={setErrorMessage}
            />
        </Flex>
    );
}
