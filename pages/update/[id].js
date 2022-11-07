import { useState } from 'react'
import { useRouter } from 'next/router'
import {
    Button,
    Textarea,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    VStack,
    Container,
    Flex,
    Text,
    Spacer
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import generateSocialImage from '../../components/GenerateImg'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const UpdatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');

    const router = useRouter();
    const { id } = router.query;
    console.log({ router });
    console.log(id)

    //Get data from xata db
    const { data, error } = useSWR(`/api/post?id=${id}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    console.log(data.post.tags)

    // store data in state
    const post = data.post;


    //Convert string tags to array
    const newTags = tags;


    const handleSubmit = async () => {
        // e.preventDefault();
        const tagArr = newTags.split(/[, ]+/);
        let tags_new;
        if (tagArr.length >= 4) {
            tags_new = tagArr.slice(0, 4)
        } else tags_new = tagArr;
        console.log(tags_new);

        //Generate social card with cloudinary
        const socialImage = generateSocialImage({
            title: title,
            tagline: tags_new.map(tag => `#${tag}`).join(' '),
            cloudName: 'dqwrnan7f',
            imagePublicID: 'dex/example-black_iifqhm',
        });
        console.log(socialImage);

        //Make add create request
        let post = {
            title: title,
            body: body,
            image: socialImage,
            tags: tags_new,
        }

        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({post, id})
        })

        if (response.ok) {
            toast.success("post updated successfully", {
                theme: "dark",
                autoClose: 8000
            })
            window?.location.replace('/');
        }
    }

    return (
        <VStack>
            <Flex minWidth={'max-content'} alignItems='center' gap='2' mt={10} mb={20}>
                <Text as='b' fontSize='30px' color='black' mt={5} >
                    Blog with Xata and Cloudinary
                </Text>
                <Spacer />
                <Button colorScheme='black' variant='outline' mt={5}>
                    Check source code
                </Button>
            </Flex>
            <Container maxW='4xl' centerContent>
                <FormControl >
                    <FormLabel>Post Title</FormLabel>
                    <Input placeholder='Title' defaultValue={post.title} onChange={e => { setTitle(e.target.value) }} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Post Tags</FormLabel>
                    <Input placeholder='add tags separated by commas' defaultValue={post.tags} onChange={e => { setTags(e.target.value) }} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Post Body</FormLabel>
                    <Textarea placeholder='you can use markdown here' size='sm' defaultValue={post.body} onChange={e => { setBody(e.target.value) }} />
                </FormControl>
                <Button colorScheme='black' variant='outline' type='submit' mt={5} onClick={() => handleSubmit()}>Submit</Button>
            </Container>
        </VStack>
    )
}



export default UpdatePost