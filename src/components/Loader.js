import { CircularProgress, Flex } from "@chakra-ui/react";

export const Loader = () => {
    return (
        <Flex minHeight="full" width="full" zIndex="tooltip" background="gray.100" 
        opacity={0.5} position="fixed" top={0} left={0} justifyContent="center"
        alignItems="center">
            <CircularProgress size='60px' isIndeterminate />
        </Flex>
    )
}