import { Link as ReachLink } from "react-router-dom";
import { Icon, Box, Link } from "@chakra-ui/react";

export const SideNavAction = ({data}) => {
    const { active, module, icon, title } = data;
    return (
        <Link as={ReachLink} to={`/${module}`} width={{sm: "max-content", md: "full" }}
            my={2} p={2} fontSize="1rem"
            display="flex" alignItems="center" justifyContent="start"
            color={ active && "cyan.500"}
            _hover={{
                background: "gray.100",
                color: "cyan.500",
            }}>
            <Icon as={icon} fontSize={28} label={title}/>
            <Box pl={1} fontSize={14} display={{base: "none", md: "block"}}>{title}</Box>
        </Link>
    )
}