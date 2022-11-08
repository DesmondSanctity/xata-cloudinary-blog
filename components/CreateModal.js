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
import { toast } from 'react-toastify'
import generateSocialImage from './GenerateImg'


const PostForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");

    //Convert string tags to array
    const newTags = tags;


    const handleSubmit = async () => {

        if (title == '' || body == '' || tags == '') {
            toast.warn("post cannot be empty", {
                theme: "dark",
                autoClose: 8000
            })
        } else {
            const tagArr = newTags.split(/[, ]+/);
            let tags_new;
            if (tagArr.length >= 4) {
                tags_new = tagArr.slice(0, 4)
            }else tags_new = tagArr;
            console.log(tags_new);

            //Generate social card
            const socialImage = generateSocialImage({
                title: title,
                tagline: tags_new.map(tag => `#${tag}`).join(' '),
                cloudName: 'dqwrnan7f',
                imagePublicID: 'dex/example-black_iifqhm',
            });
            console.log(socialImage);

            //Make add create request
            let posts = {
                title: title,
                body: body,
                image: socialImage,
                tags: tags_new,
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

    }

    return (
        <>
            <FormControl >
                <FormLabel>Post Title</FormLabel>
                <Input placeholder='Title' onChange={e => { setTitle(e.target.value) }} required />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Post Tags</FormLabel>
                <Input placeholder='add tags separated by commas' onChange={e => { setTags(e.target.value) }} required />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Post Body</FormLabel>
                <Textarea placeholder='you can use markdown here' size={'lg'} onChange={e => { setBody(e.target.value) }} required />
            </FormControl>
            <Button colorScheme='black' variant='outline' mt={5} onClick={() => handleSubmit()}>Submit</Button>
        </>
    )
}


const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme='black' variant='outline' onClick={onOpen} mt={2} size={'sm'}>Create Post</Button>

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