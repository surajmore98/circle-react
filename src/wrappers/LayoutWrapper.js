import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navbar } from  "../components/Navbar";
import { SideNav } from  "../components/SideNav";
import { UserList } from  "../components/UserList";
import { Loader } from "../components/Loader";
import { getBookmarksThunk } from "../store/thunks/BookmarkThunk";
import { getPostsThunk } from "../store/thunks/PostThunk";
import { getUsersThunk } from "../store/thunks/UserThunk";
import { useCustomColor } from "../helper/CustomColor";

export const LayoutWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const { posts, users, isLoading } = useSelector((state) => state.post);
    const { token, bookmarks } = useSelector((state) => state.auth);
    const { layoutColor } = useCustomColor();

    useEffect(() => {
        (async () => {
            !posts.length && dispatch(getPostsThunk());
            !bookmarks.length && dispatch(getBookmarksThunk({token: token}));
            !users.length && dispatch(getUsersThunk());
         })();
    }, []);
    
    return (
        <>
            <Navbar/>
            <Flex width="full" background={layoutColor}>
                <Flex justifyContent="center" width={{ base: "15%", sm: "20%", lg: "25%" }} minHeight="200vh" borderRightWidth={1}>
                    <SideNav/>
                </Flex>
                <Flex width={{ base: "85%", sm: "80%", lg: "75%" }} justifyContent={{ base: "center", md: "start" }} mt="5rem">
                    <Flex mr={{ base: 0 , md: 8 }} justifyContent="center" width={{ base: "100%", md: "60%" }}>
                        {children}
                    </Flex>
                    <UserList/>
                </Flex>
            </Flex>
            {isLoading && <Loader/>}
        </>
    )
}