import { useState, useEffect } from 'react'
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
import { EditIcon } from '@chakra-ui/icons'
import { toast } from 'react-toastify'
import generateSocialImage from './GenerateImg'


const UpdatePostForm = ({id}) => {
    const [post, setPost] = useState({})
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");

    console.log(id)

    //Get data from xata db
    useEffect(() => {
        const getData = async () => {
            await fetch('/api/post', {
                method: 'POST',
                body: JSON.stringify(id)
            }).then((response) => response.json())
                .then((data) => setPost(data.post));
        }
        getData();
        console.log(post)
        setTitle(post.title)
        setBody(post.body)
        setTags(post.tags)
    }, [])

    //Convert string tags to array
    const newTags = tags;


    const handleSubmit = async () => {
        // e.preventDefault();
        const tagArr = newTags.split(/[, ]+/);
        console.log(tagArr);

        //Generate social card
        const socialImage = generateSocialImage({
            title: title,
            tagline: tagArr.map(tag => `#${tag}`).join(' '),
            cloudName: 'dqwrnan7f',
            imagePublicID: 'dex/example-black_iifqhm',
        });
        console.log(socialImage);

        //Make add create request
        let post = {
            title: title,
            body: body,
            image: socialImage,
            tags: tagArr,
        }

        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id, post)
        })

        if (response.ok) {
            toast.success("post updated successfully", {
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
                <Input placeholder='Title' value={title} onChange={e => { setTitle(e.target.value) }} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Post Tags</FormLabel>
                <Input placeholder='add tags separated by commas' value={tags} onChange={e => { setTags(e.target.value) }} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Post Body</FormLabel>
                <Textarea placeholder='you can use markdown here' size={'lg'} value={body} onChange={e => { setBody(e.target.value) }} />
            </FormControl>
            <Button colorScheme='black' variant='outline' type='submit' mt={5} onClick={() => handleSubmit()}>Submit</Button>
        </>
    )
}


const UpdatePost = (id) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {/* <Button colorScheme='black' variant='outline' onClick={onOpen}>Create Post</Button> */}
            <EditIcon onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UpdatePostForm id={id} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdatePost