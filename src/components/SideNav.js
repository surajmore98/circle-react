import { Flex } from "@chakra-ui/react";
import { Modules } from "../helper/Modules";
import { SideNavAction } from "./SideNavAction";
import { useLocation } from "react-router-dom"
import { MdHome, MdBookmark, MdAccountCircle, MdExplore } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export const SideNav = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const current = location.pathname;

    return(
        <Flex position="fixed" top="5rem" justifyContent="start" height="full">
            <Flex p={2} pl={4}  flexDirection="column" alignItems={{base: "end", md: "start" }}>
                <SideNavAction data = {{title:"Home", module: Modules.HOME, icon:MdHome, active: current.substring(1) === Modules.HOME }}/>
                <SideNavAction data = {{title:"Explore", module: Modules.EXPLORE, icon:MdExplore, active: current.includes(Modules.EXPLORE)}}/>
                <SideNavAction data = {{title:"Bookmarks", module: Modules.BOOKMARK, icon:MdBookmark, active: current.includes(Modules.BOOKMARK) }}/>
                <SideNavAction data = {{title:"Like", module: Modules.LIKE, icon:FaHeart, active: current.includes(Modules.LIKE) }}/>
                <SideNavAction data = {{title:"Profile", module: `profile/${user._id}`, icon:MdAccountCircle, active: current.includes(Modules.PROFILE) }}/>
            </Flex>
        </Flex>
        
    );
    //  width="25%"
}