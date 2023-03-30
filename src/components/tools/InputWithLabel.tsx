import { Input, Flex, Text, InputProps } from "@chakra-ui/react";

type InputWithLabelType = {
    value: string | number;
    setValue: any;
    text: string;
    width?: string;
    textColor?: string;
    fontSize?: string;
    isDisabled?: boolean;
    borderColor?: boolean;
};

export default function InputWithLabel({
    value,
    setValue,
    text,
    width,
    fontSize,
    textColor,
    isDisabled,
    borderColor,
}: InputWithLabelType) {
    return (
        <Flex w={"full"}>
            <Flex
                position={"absolute"}
                bg={"white"}
                paddingX={"10px"}
                mt={"-8px"}
                zIndex={"10"}
                ml={"20px"}
                textColor={textColor ? textColor : "#ABB4BD"}
            >
                <Text
                    fontFamily={"BarlowBold"}
                    fontSize={fontSize ? fontSize : "11px"}
                >
                    {text}
                </Text>
            </Flex>
            <Input
                fontFamily={"BarlowRegular"}
                disabled={isDisabled === true ? true : false}
                w={width ? width : "250px"}
                // w={"full"}
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
