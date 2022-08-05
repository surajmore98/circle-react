import { Box, Button, Checkbox, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../components/FormField";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { GUESTCREDENTIALS, HOME, SIGN_UP } from "../helper/Constant";
import { setLocalStorageToken, setLocalStorageUser } from "../helper/LocalStorageHelper";
import { useNavigator } from "../helper/NavigateHelper";
import { LOGIN_CREDENTIAL_DEFAULT_VALUE } from "../helper/StateDefaultValues";
import { loginThunk } from "../store/thunks/AuthThunk";

export const Login = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigator();
    const { user, token } = useSelector((state) => state.auth);
    const [credential, setCredentials] = useState(LOGIN_CREDENTIAL_DEFAULT_VALUE);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      dispatch(loginThunk({ username: credential.username, password: credential.password }));
      setCredentials(LOGIN_CREDENTIAL_DEFAULT_VALUE);
    };

    const updateLocalStorage = (token, user, rememberMeFlag) => {
      if(rememberMeFlag && token && user && Object.keys(user).length) {
        setLocalStorageToken(token);
        setLocalStorageUser(user);
      }
    }

    const onUserNameChange = (event) => setCredentials({...credential, username: event.target.value});
    const onPasswordChange = (event) => setCredentials({...credential, password: event.target.value});
    const toggleRememberMe = () => setRememberMe(!rememberMe);

    const guestLogin = () => {
      setCredentials({ username: GUESTCREDENTIALS.username, password: GUESTCREDENTIALS.password });
      dispatch(loginThunk({ username: GUESTCREDENTIALS.username, password: GUESTCREDENTIALS.password }));
    }

    updateLocalStorage(token, user, rememberMe);

    useEffect(() => { 
      if(token) {
        navigateTo(HOME);
      }
    });
    
    return (
      <Box p={8} pb={4} maxWidth="20rem" borderWidth={1} boxShadow="lg">
        <Box textAlign="center">
          <Heading fontSize={24}>Login</Heading>
        </Box>
        <Box mt={2} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormField data={{label: "User Name", placeholder:"Enter User Name", type: "text", action: onUserNameChange, value: credential.username }}></FormField>
            <FormField data={{label: "Password", placeholder:"*******", type: "password", action: onPasswordChange, value: credential.password }}></FormField>
            <Checkbox colorScheme="cyan" onChange={toggleRememberMe} checked={rememberMe} mt={2}>
              <Box fontSize={12}>Remember Me</Box>
            </Checkbox>
            <Button type="submit" colorScheme="cyan" width="full" mt={2} variant="solid"
                borderRadius={0} height={8}>
                Sign In
            </Button>
            <Button variant="outline" colorScheme="cyan" width="full" mt={2} borderRadius={0} 
              onClick={guestLogin} height={8}>
                Guest Login
            </Button>
            <Button variant="ghost" colorScheme="cyan" width="full" mt={2} borderRadius={0}
                onClick={() => navigateTo(SIGN_UP)} height={8}>
                Create New Account
            </Button>
          </form>
        </Box>
      </Box>
    );
}
