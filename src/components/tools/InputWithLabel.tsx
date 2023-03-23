import { Input, Flex, Text } from "@chakra-ui/react";

type InputWithLabelType = {
    value: string | number;
    setValue: any;
    text: string;
    isDisabled?: boolean;
    borderColor?: boolean;
};

export default function InputWithLabel({
    value,
    setValue,
    text,
    isDisabled,
    borderColor,
}: InputWithLabelType) {
    return (
        <Flex mr={"1rem"}>
            <Flex
                position={"absolute"}
                bg={"white"}
                paddingX={"10px"}
                mt={"-8px"}
                zIndex={"10"}
                ml={"20px"}
                textColor={"#ABB4BD"}
            >
                <Text fontFamily={"Arial"} fontSize={"11px"}>
                    {text}
                </Text>
            </Flex>
            <Input
                disabled={isDisabled === true ? true : false}
                w={"250px"}
                borderColor={borderColor ? "red" : "gray.200"}
                _focusVisible={{
                    borderColor: "none",
                    boxShadow: "0px 0px 2px 0px #000",
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </Flex>
    );
}
