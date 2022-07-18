import { useColorMode } from "@chakra-ui/react";

export const useCustomColor = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";
    const themeColor = "cyan";
    const fontColor = isDark ? "white" : "black";
    const bgColor = isDark ? "black" : "white";
    const layoutColor = isDark ? "gray.800" : "gray.100";
    return { isDark, themeColor, toggleColorMode, fontColor, bgColor, layoutColor }
}