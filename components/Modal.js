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
    Stack,
    Checkbox,
    CheckboxGroup,
    useCheckbox,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import styles from '../styles/Home.module.css';
import generateSocialImage from '../components/GenerateImg'


// const xata = getXataClient();

const handleSubmit = () => {

}



const socialImage = generateSocialImage({
    title: 'This Is a Post With an Automatically Generated Social Sharing Card',
    tagline: 'Writing blog posts is fun when the robots do some of the work!',
    cloudName: 'jlengstorf',
    imagePublicID: 'lwj/blog-post-card',
    titleFont: 'lwj-title.otf',
    titleExtraConfig: '_line_spacing_-10',
    taglineFont: 'lwj-tagline.otf',
    textColor: '232129',
});
console.log(socialImage);



const PostForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([""]);

    const handleTagsChange = (e, index) => {
        const { name, value } = e.target;
        const list = [];
        list[index][name] = name.includes("tags") ? Number(value) : value;
        setTags(list);
    }


    // const record = await xata.db.posts.create({
    //     title: title,
    //     body: body,
    //     tags: tags,
    //     image: socialImage,
    // });
    // console.log(record);
    return (
        <>
            <FormControl>
                <FormLabel>First name</FormLabel>
                <Input placeholder='Title' onChange={e => { setTitle(e.target.value) }} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Tags</FormLabel>
                <CheckboxGroup colorScheme='green' name='tags' defaultValue={['dev']} >
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox value='dev'>dev</Checkbox>
                        <Checkbox value='react'>react</Checkbox>
                        <Checkbox value='vue'>vue</Checkbox>
                        <Checkbox value='node'>node</Checkbox>
                    </Stack>
                </CheckboxGroup>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Body</FormLabel>
                <Textarea placeholder='Body' onChange={e => { setBody(e.target.value) }} />
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
                        <PostForm />
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