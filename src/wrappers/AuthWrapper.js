import { Box, Flex, Heading, IconButton, Image } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useCustomColor } from "../helper/CustomColor";

export const AuthWrapper = ({ children }) => {
    const { isDark, toggleColorMode, themeColor, layoutColor } = useCustomColor();
        
    return (
        <>
            <Flex>
                <Box width={{ sm: "100%", md: "50%" }} height="100vh" border={1}>
                    <Flex height="4rem" justifyContent="space-between" alignItems="center" px={4}>
                        <Heading fontSize={24} color={themeColor}>Circle</Heading>
                        <IconButton
                            aria-label={ isDark ? "light" : "dark" }
                            bg="transparent"
                            fontSize={20}
                            icon={ isDark ? <FaSun /> : <FaMoon /> }
                            onClick={toggleColorMode}
                            borderRadius="full"
                        />
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" height="calc(100vh - 4rem)">
                        { children }
                    </Flex>
                </Box>
                <Flex width={{ sm: "0", md: "50%" }} background={layoutColor} justifyContent="center" alignItems="center">
                    <Image src="/landing_image.svg" objectFit="fill" height="20rem" width="20rem"/>
                </Flex>
            </Flex>
        </>

    );
}