import { Flex, IconButton, Input, InputGroup, InputLeftElement, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Link, Box } from "@chakra-ui/react"
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link as ReachLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const SearchUsers = () => {
    const  { users } = useSelector((state) => state.post);
    const [searchValue, setSearchValue] = useState("");
    let filteredUsers = [];

    if(searchValue) {
        filteredUsers =  users.filter(x => x.username.toLowerCase().indexOf(searchValue) > -1 ||
            (`${x.firstName.toLowerCase()} ${x.lastName.toLowerCase()}`).indexOf(searchValue) > -1 );
    }

    const handleSearchInputChange = (event) => setSearchValue(event.target.value.toLowerCase());
    
    return(
        <Flex py={4}>
            <Popover>
                <PopoverTrigger>
                <IconButton
                    aria-label="search"
                    bg="transparent"
                    fontSize={20}
                    icon={<FiSearch />}
                    borderRadius="full"
                />
                </PopoverTrigger>
                <PopoverContent width="30rem" borderRadius={0}>
                    <PopoverHeader>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FiSearch color="gray.300"/>}/>
                            <Input type="text" placeholder='Search People...' borderRadius={0} onChange={handleSearchInputChange}/>
                        </InputGroup>
                    </PopoverHeader>
                    <PopoverBody>
                        {
                            filteredUsers && filteredUsers.map((user, index) => {
                                return (
                                    <Link as={ReachLink} to={`/profile/${user._id}`} width="full" key={index}
                                        my={1} p={2}
                                        display="flex" alignItems="end" justifyContent="start"
                                        _hover={{
                                            background: "gray.100",
                                            color: "cyan.500",
                                        }}>
                                        <Box pl={1} fontSize={16}>{`${user.firstName} ${user.lastName}`}</Box>
                                        <Box pl={1} fontSize={12} color="gray.200">@{user.username}</Box>
                                    </Link>
                                )
                            })
                        }
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}