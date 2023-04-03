import {
    Flex,
    Text,
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverBody,
    Button,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsExclamationLg } from "react-icons/bs";

export default function PopoverSERS() {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <Popover>
            <PopoverTrigger>
                <Button>Trigger</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                    Are you sure you want to have that milkshake?
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
