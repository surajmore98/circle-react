import { Avatar, Box, Button, Flex, Heading, IconButton, Image, Input, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Textarea, useColorMode } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiImage } from "react-icons/fi";
import { MdClose, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editPostThunk } from "../store/thunks/PostThunk";
import { ButtonIcon } from "./ButtonIcon";
import { EmojiInput } from "./EmojiInput";

export const EditPost = ({data}) => {
    const { _id, content, media, deletetoken } = data;
    const { user, token } = useSelector((state) => state.auth);
    const imageUploader = useRef(null);
    const { colorMode } = useColorMode();
    const dispatch = useDispatch();

    const [editContent, setEditContent] = useState({ text: content, image: media });
    const { username } = user;
    const bgColor = colorMode === "dark" ? "gray.500" : "gray.100";
    
    const clickHandler = () => {
        imageUploader.current.click();
    }

    const emojiInputHandler = (value) => setEditContent({...editContent, text: editContent.text + value});

    const ContentChangeHandler = (event) => setEditContent({...editContent, text: event.target.value});
 
    const onImageSelect = (event) => {
        const [file] = event.target.files;
        if (file) {
            setEditContent({...editContent, image: URL.createObjectURL(file)});
        }
    };

    const removeSelectedImage = (event) => {
        event.preventDefault();
        setEditContent({...editContent, image: null});
    };

    const submitHandler = async (event, closeFun) => {
        event.preventDefault();
        const uploadReq = {
            id: _id,
            content: editContent.text,
            image: imageUploader.current.files?.[0], 
            deleteToken: deletetoken,
            token: token,
            isImageChanged: media !== editContent.image
        }
        dispatch(editPostThunk(uploadReq));
        closeFun();
    }

    return(
        <Popover>
            {({ onClose }) => (
            <>
                <PopoverTrigger>
                    <IconButton aria-label="open" color="gray.400" bg="transparent" icon={<MdEdit />} fontSize="1rem" borderRadius="full" minWidth={6} height={6} />
                </PopoverTrigger>
                <PopoverContent width="30rem">
                    <PopoverCloseButton />
                    <PopoverHeader border={0}><Heading fontSize="1.5rem">Edit Post</Heading></PopoverHeader>
                    <PopoverBody>
                        <Flex gap="0.25rem" p="1rem" minWidth="25rem" width="full" background={bgColor}>
                            <Flex>
                                <Avatar name={username} src="" display="flex" size="lg"/>
                            </Flex>
                            <Flex flexDirection="column" justifyItems="center" width="full">
                                <Textarea placeholder="write something intersting..." borderRadius={0} background="white" resize="none" color="black" value={editContent.text} onChange={ContentChangeHandler}></Textarea>

                                { editContent.image &&
                                    <Box position="relative" width="150px" mt={2}>
                                        <Image src={editContent.image} boxSize="150px" objectFit="cover"/>
                                        <Box pos="absolute" top={0} right={0}>
                                            <ButtonIcon data={{label:"remove", color:"cyan", icon: <MdClose />, fontSize:"1rem", clickAction: removeSelectedImage}} />
                                        </Box>
                                    </Box> 
                                }

                                <Flex justifyContent="space-between" py={2} px={0}>
                                    <Flex>
                                        <IconButton aria-label="image" color="cyan.400" bg="transparent" icon={<FiImage />} fontSize="1.5rem" onClick={clickHandler}/>
                                        <EmojiInput action={emojiInputHandler} borderRadius={0}/>
                                    </Flex>
                                    <Flex gap="0.25rem">
                                        <Button colorScheme="cyan" p="0.5rem 2rem" borderRadius={0} variant="outline" onClick={onClose}>Close</Button>
                                        <Button colorScheme="cyan" p="0.5rem 2rem" borderRadius={0}  ml="auto" onClick={async (e) => {
                                            await submitHandler(e, onClose);
                                        }}>Edit</Button>
                                    </Flex>   
                                </Flex>
                            </Flex>
                            <Input type="file" display="none" ref={imageUploader} accept="image/*" onChange={onImageSelect}></Input>
                        </Flex>
                    </PopoverBody>   
                </PopoverContent>
            </>
            )}
        </Popover>
    )
}