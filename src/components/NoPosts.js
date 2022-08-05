import { Heading } from "@chakra-ui/react"
import { useCustomColor } from "../helper/CustomColor"

export const NoPosts = () => {
    const { textColor } = useCustomColor();
    return (
        <Heading size="sm" mt="1rem" color={textColor}>No Posts Available!</Heading>
    )
}