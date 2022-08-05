import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useCustomColor } from "../helper/CustomColor";
import { NoPosts } from "../components/NoPosts";

export const Explore = () => {
    const { posts } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.auth);

    const [ filter, setFilter] = useState("");
    const [postList, setPostList] = useState(posts || []);
    const { themeColor } = useCustomColor();

    useEffect(() => {
        sortPosts(filter);
    }, [posts, filter]);

    const updateFilterValue = (val) => setFilter(val);

    const sortPosts = (filter) => {
        switch(filter) {
            case "trending":
                setPostList([...posts].sort((x, y) => y.likes.likeCount - x.likes.likeCount));
                break;
            case "latest":
                setPostList([...posts].sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt)));
                break;
            case "myposts":
                setPostList(posts.filter(x => x.username === user.username));
                break;
            default:
                break;
        }
    }

    return(
        <Flex flexDirection="column" flexGrow={1} alignItems="center" gap={4}>
            <Flex justifyContent="space-evenly" width="full">
                <Button colorScheme={themeColor} variant='ghost' onClick={() => updateFilterValue("latest")}>Latest</Button>
                <Button colorScheme={themeColor} variant='ghost' onClick={() => updateFilterValue("trending")}>Trending</Button>
                <Button colorScheme={themeColor} variant='ghost' onClick={() => updateFilterValue("myposts")}>My Posts</Button>
            </Flex>
            {
                postList && postList.length ? postList.map((item, index) => <Post key={index} data={item} />)
                : <NoPosts/>
            }
        </Flex>
    );
}