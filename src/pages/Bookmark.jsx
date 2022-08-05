import { Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { NoPosts } from "../components/NoPosts";
import { Post } from "../components/Post";

export const Bookmark = () => {
    const { posts } = useSelector((state) => state.post);
    const { bookmarks } = useSelector((state) => state.auth);
    
    const bookmarkPosts = posts.filter(x => bookmarks.includes(x._id));

    return(
        <Flex flexDirection="column" flexGrow={1} alignItems="center">
            <Heading fontSize="1.5rem" color="cyan.600" my={4} >My Bookmarks</Heading>
            {
                bookmarkPosts && bookmarkPosts.length 
                    ? bookmarkPosts
                        .sort((x,y) => new Date(y.createdAt) - new Date(x.createdAt))
                        .map((item, index) => <Post key={index} data={item} />)
                    : <NoPosts/>
            }
        </Flex>
    );
}