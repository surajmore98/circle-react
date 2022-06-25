import { Button, Flex, Heading } from "@chakra-ui/react";
import { HOME } from "../helper/Constant";
import { useNavigator } from "../helper/NavigateHelper";

export const NotFound = () => {
    const navigateTo = useNavigator();
    const navigateToHome = () => navigateTo(HOME);

    return (
        <Flex alignItems="center" justifyContent="center" mt="3.5rem">
            <Flex direction="column" alignItems="center" justifyContent="center" h="200px">
                <Heading size="md" p={4}>404 - Not Found!</Heading>
                <Button width="10rem" colorScheme="cyan" onClick={navigateToHome}>Go Home</Button>
            </Flex>  
        </Flex>
    )
}