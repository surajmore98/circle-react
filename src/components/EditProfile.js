import { Flex, Button, Avatar, Heading, Input, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../store/thunks/UserThunk";

export const EditProfile = () => {
    const  { user, token } = useSelector((state) => state.auth);
    const imageUploader = useRef(null);
    const dispatch = useDispatch();
    const [userDetail, setUserDetail] = useState(user);

    const imageUploadHandler = () => {
        imageUploader.current.click();
    };

    const handleInputChange = (value, type) => {
        switch(type) {
            case "FIRSTNAME":
                setUserDetail({ ...userDetail, firstName: value});
                break;
            case "LASTNAME":
                setUserDetail({ ...userDetail, lastName: value});
                break;
            case "BIO":
                setUserDetail({ ...userDetail, bio: value});
                break;
            case "PROFILEPHOTO":
                setUserDetail({ ...userDetail, profileImage: value});
                break;
            default:
                break;
        }
    }

    const handleSubmit = (closePop) => {
        const req = { ...userDetail, token: token, isImageChanged: userDetail.profileImage === user.profileImage };
        dispatch(editUserThunk(req));
        closePop();
    }

    return(
        <Popover>
            {({ onClose }) => (
                <>
                <PopoverTrigger>
                    <Button fontSize="0.75rem" height="2rem" borderRadius={0} m={1}
                        colorScheme="cyan" variant="outline" spacing='6'>Edit Profile</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverCloseButton />
                    <PopoverHeader border={0}><Heading fontSize="1.5rem">Edit Profile</Heading></PopoverHeader>
                    <PopoverBody>
                        <Flex flexDirection="column">
                            <Flex flexDirection="column" justifyContent="center" alignItems="center" position="relative">
                                <Avatar name={user.username} src={userDetail.profileImage ? URL.createObjectURL(userDetail.profileImage) : ""} display="flex" alignSelf="center" size='xl'/>
                                <Button m={2} fontSize="0.875rem" onClick={imageUploadHandler}>Upload Photo</Button>
                                <Input type="file" display="none" ref={imageUploader} onChange={(e) => handleInputChange(e.target.files[0], "PROFILEPHOTO")}/> 
                            </Flex>      
                            <FormControl my={1}>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input id="firstName" borderRadius={0} placeholder="Enter First Name" value={userDetail.firstName} onChange={(e) => handleInputChange(e.target.value, "FIRSTNAME")}/>
                            </FormControl>
                            <FormControl my={1}>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input id="lastName" borderRadius={0} placeholder="Enter Last Name" value={userDetail.lastName} onChange={(e) => handleInputChange(e.target.value, "LASTNAME")} />
                            </FormControl>
                            <FormControl my={1}>
                                <FormLabel htmlFor="bio">Bio</FormLabel>
                                <Textarea placeholder="Enter Bio" borderRadius={0} resize="none" value={userDetail.bio} onChange={(e) => handleInputChange(e.target.value, "BIO")} />
                            </FormControl>
                            <Button colorScheme="cyan" mt={1} borderRadius={0} onClick={() => handleSubmit(onClose)}>Save</Button>
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </>)}
        </Popover>
    )
}