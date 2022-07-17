import { FiMessageSquare, FiBookmark, FiHeart } from "react-icons/fi";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { Flex, Button, Avatar, Text, IconButton,
    Input, Box, Image } from "@chakra-ui/react";
import { Comment } from "./Comment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusCode } from "../helper/StatusCode";
import { ButtonIcon } from "./ButtonIcon";
import { createComment } from "../services/CommentService";
import { MdDelete } from "react-icons/md";
import { EditPost } from "./EditPost";
import { EmojiInput } from "./EmojiInput";
import { deletePostThunk } from "../store/thunks/PostThunk";
import { addLikeThunk, removeLikeThunk } from "../store/thunks/LikeThunk";
import { addBookmarkThunk, removeBookmarkThunk } from "../store/thunks/BookmarkThunk";
import { toast } from "react-toastify";
import { useCustomColor } from "../helper/CustomColor";

export const Post = ({ data }) => {
    const { token, user:authUser, bookmarks } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.post);
    const { _id, comments, content, media, username, likes } = data;
    const { bgColor, themeColor } = useCustomColor();
    const dispatch = useDispatch();

    const user = users.find(x => x.username === username);
    const [comment, setComment] = useState({ isOpen: false, value: "", comments: []});

    const isLike = likes.likedBy.length ? likes.likedBy.some(x => x._id === authUser._id): false;
    const isBookmark = bookmarks.length ? bookmarks.some(x => x === _id) : false;

    const toggleBookmark = () => {
        const request = {
            id: _id,
            token: token
        };

        isBookmark ?  dispatch(removeBookmarkThunk(request)):  dispatch(addBookmarkThunk(request));
    }

    const toggleLike = () => {
        const request = {
            id: _id,
            token: token
        };

        isLike ?  dispatch(removeLikeThunk(request)):  dispatch(addLikeThunk(request));
    }

    const toggleComment = () => { setComment({ ...comment, isOpen: !comment.isOpen }) }

    const handleCommentChange = (event) => { setComment({ ...comment, value: event.target.value }) };

    const addComment = async () => {
        if(comment.value) {
            try {
                const response = await createComment({id: _id, data: { text: comment.value }, token});
                if(response.status === StatusCode.CREATED) {
                    setComment({ ...comment, comments: response.data.comments, value: ""});
                }
            }
            catch(e) {
                toast.error("Error while Creating Comment.");
            }
        }
    }

    const emojiInputHandler = (value) => setComment({ ...comment, value: comment.value + value});

    const deletePost = () => dispatch(deletePostThunk({ id: _id, token: token }));

    useEffect(() => {
        if(comments) {
            setComment({ ...comment, comments: comments});
        }
    }, []);

    return (
        <Flex flexDirection="column" gap="0.25rem" p={2} background={bgColor} width={{ base: "19rem", md: "22rem"}} my={2}>
            <Flex justifyContent="start" alignItems="center" gap="0.25rem" width="full">
                    <Flex alignItems="start"><Avatar name={username} src={user ? user.profileImage: ""} size="md"/></Flex>
                    {
                        username === authUser.username ?
                        <>
                            <Flex gap="0.25rem" alignItems="center">
                                <Text fontSize="0.875rem" fontWeight="bold">You</Text>
                            </Flex>
                            <Flex ml="auto" alignItems="center">
                                <EditPost data={data}/>
                                <IconButton aria-label="open" color="gray.400" bg="transparent" icon={<MdDelete />} fontSize="1rem" borderRadius="full" minWidth={6} height={6} onClick={deletePost}/>
                            </Flex>
                        </>
                        :
                        <Flex gap="0.25rem" alignItems="start" flexDirection="column">
                            <Text fontSize="0.75rem" fontWeight="bold">{user ? `${user.firstName} ${user.lastName}`: "" }</Text>
                            <Text fontSize="0.75rem" color="gray.400">@{username}</Text>
                        </Flex>
                    }
                </Flex>
            <Box>
                <Text fontSize="0.875rem" textAlign="justify" p={1}>
                    {content}
                </Text>
                { media && <Image src={media} height="20rem" width="full" objectFit="scaledown" py={1}/>}
            </Box>
            <Flex justifyContent="space-between">
                <Flex flexDirection="row" justifyContent="center" alignItems="center">
                    <ButtonIcon data={{label:"like", icon: isLike ? <FaHeart/> : <FiHeart/>, color: isLike ? "red.400" : "gray.400", fontSize:16, clickAction: toggleLike }}/>
                    {likes.likeCount > 0 && <Text mt={1} height="full" color="gray.400" fontSize={12}>{likes.likeCount}</Text>}
                </Flex>

                <Flex flexDirection="row" justifyContent="center" alignItems="center">
                    <ButtonIcon data={{label:"comment", icon:<FiMessageSquare/>, color: comment.isOpen ? "blue.400" : "gray.400", fontSize:16, clickAction: toggleComment }}/>
                    {comment.comments.length > 0 && <Text mt={1} height="full" color="gray.400" fontSize={12}>{comment.comments.length}</Text>}
                </Flex>
                <ButtonIcon data={{label:"bookmark", icon: isBookmark ? <FaBookmark/>: <FiBookmark />, color: isBookmark ? "green.400" : "gray.400", fontSize:16, clickAction: toggleBookmark }}/>
            </Flex>
            { comment.isOpen &&
                <Flex flexDirection="column" width="full">
                    <Flex width="full" px={1} py={2}>
                        <Flex flexGrow={1} alignItems="start">
                            <Input width="full" placeholder="Enter Comment" borderRadius={0} fontSize="0.75rem" height="1.75rem" variant="flushed" background={bgColor} pl={1}  onChange={handleCommentChange} value={comment.value}/>
                            <EmojiInput action={emojiInputHandler} size={16} height="1.75rem"/>
                        </Flex>
                        <Button colorScheme={themeColor} borderRadius={0} fontSize="0.75rem" height="1.75rem" onClick={addComment}>Comment</Button>
                    </Flex>
                    {
                        comment.comments && comment.comments.map((data, index) => <Comment data={data} postId={_id} action={setComment} key={index}/>)
                    }
                </Flex>
            }
        </Flex>
    )
}