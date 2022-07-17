import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateToken, updateUser } from "../store/AuthSlice";
import { LOG_IN } from "../helper/Constant";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigator } from "../helper/NavigateHelper";
import { removeLocalStorageData } from "../helper/LocalStorageHelper";

export const Logout = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigator();

    useEffect(() => {
        dispatch(updateToken(""));
        dispatch(updateUser({ }));
        removeLocalStorageData();
    }, []);

    const navigateToSignIn = () => navigateTo(LOG_IN);

    return(
        <>
            <Flex direction="column" alignItems="center" justifyContent="center" h="200px">
                <Heading size="md" p={4}>You are logged out, Please sign in again.</Heading>
                <Button width="10rem" colorScheme="cyan" onClick={navigateToSignIn}>Sign In</Button>
            </Flex>  
        </>
    )
}