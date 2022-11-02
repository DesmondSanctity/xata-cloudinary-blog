import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Textarea,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import styles from '../styles/Home.module.css'


const PostForm =()=>{
    return(
        <>
        <FormControl>
        <FormLabel>First name</FormLabel>
        <Input placeholder='First name' />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Last name</FormLabel>
        <Input placeholder='Last name' />
      </FormControl>
      </>
    )
}


const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button className={styles.description} colorScheme='black' variant='outline' onClick={onOpen}>Create Post</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <PostForm/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost