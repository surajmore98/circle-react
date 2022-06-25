import { IconButton } from "@chakra-ui/react";

export const ButtonIcon = ({ data }) => {
    const { label, color, icon, fontSize, clickAction } = data
    return (
        <IconButton 
            aria-label={label} 
            color={color} 
            bg="transparent"
            icon={icon} 
            fontSize={fontSize} 
            minWidth={6} 
            height={6}
            borderRadius="full"
            onClick={clickAction}
        />
    )
}