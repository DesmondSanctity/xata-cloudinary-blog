import { useState } from 'react'
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
import {toast} from 'react-toastify'
import generateSocialImage from './GenerateImg'


const PostForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");

    //Convert string tags to array
    const newTags = tags;
    const tagArr = newTags.split(/[, ]+/);
    console.log(tagArr);

    const handleSubmit = async () => {
        // e.preventDefault();

        //Generate social card
        const socialImage = generateSocialImage({
            title: title,
            tagline: tagArr.map(tag => `#${tag}`).join(' '),
            cloudName: 'dqwrnan7f',
            imagePublicID: 'dex/example-black_iifqhm',
        });
        console.log(socialImage);

        //Make add create request
        let posts = {
            title: title,
            body: body,
            image: socialImage,
            tags: tagArr,
        }

        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(posts)
        })

        if (response.ok) {
            toast.success("post created successfully", {
                theme: "dark",
                autoClose: 8000
            })
            window?.location.reload()
        }
    }

    return (
        <>
            <FormControl >
                <FormLabel>Post Title</FormLabel>
                <Input placeholder='Title' onChange={e => { setTitle(e.target.value) }} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Post Tags</FormLabel>
                <Input placeholder='add tags separated by commas' onChange={e => { setTags(e.target.value) }} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Post Body</FormLabel>
                <Textarea placeholder='you can use markdown here' size={'lg'} onChange={e => { setBody(e.target.value) }} />
            </FormControl>
            <Button colorScheme='black' variant='outline' mt={5} onClick={() => handleSubmit()}>Submit</Button>
        </>
    )
}


const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme='black' variant='outline' onClick={onOpen}>Create Post</Button>

            <Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <PostForm />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost