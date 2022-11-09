import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    Button,
    Textarea,
    Input,
    FormControl,
    FormLabel,
    Container,
    Text,
    Spacer,
    Icon,
    Link,
    Spinner,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
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

    //Get data from xata db
    const { data, error } = useSWR(`/api/post?id=${id}`, fetcher)

    if (error) return (
        <div><Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>Failed to Load.</AlertDescription>
        </Alert></div>
    )
    if (!data) return <div><Spinner color='red.500' /></div>

    // store data in state
    const res = data.post;


    // handle form submit
    const handleSubmit = async () => {

        //Convert string tags to array
        const newTags = tags || res.tags.toString();
        console.log(newTags)

        // Reducing number of accepted tags to 4 if user inputs more
        const tagArr = newTags.split(/[, ]+/);
        let tags_new;
        if (tagArr.length >= 4) {
            tags_new = tagArr.slice(0, 4)
        } else tags_new = tagArr;
        console.log(tags_new);

        //Generate social card with cloudinary
        const socialImage = generateSocialImage({
            title: title || res.title,
            tagline: tags_new.map(tag => `#${tag}`).join(' '),
            cloudName: 'dqwrnan7f',
            imagePublicID: 'dex/example-black_iifqhm',
        });
        console.log(socialImage);

        //Make add create request
        let post = {
            title: title || res.title,
            body: body || res.body,
            image: socialImage,
            tags: tags_new,
        }

        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ post, id })
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
        <>
            <main className='main'>
                <div className='grid'>
                    <Text as='b' fontSize='20px' color='black' mt={5} >
                        Blog with Xata and Cloudinary
                    </Text>
                    <Spacer />
                    <Link href='https://github.com/DesmondSanctity/xata-cloudinary-blog' isExternal><Icon as={FaGithub} w={10} h={10} mt={7} ml={5} /></Link>
                </div>
                <Container maxW='4xl' centerContent>
                    <FormControl >
                        <FormLabel>Post Title</FormLabel>
                        <Input placeholder='Title' defaultValue={res.title} onChange={e => { setTitle(e.target.value) }} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Post Tags</FormLabel>
                        <Input placeholder='add tags separated by commas' defaultValue={res.tags} onChange={e => { setTags(e.target.value) }} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Post Body</FormLabel>
                        <Textarea placeholder='you can use markdown here' size='sm' defaultValue={res.body} onChange={e => { setBody(e.target.value) }} />
                    </FormControl>
                    <Button colorScheme='black' variant='outline' type='submit' mt={5} onClick={() => handleSubmit()}>Submit</Button>
                </Container>
            </main>
            <footer className='footer'>
                <a href="https://dexcodes.xyz" target="_blank" rel="noopener noreferrer">
                    Created by&nbsp;<b>Anon</b>&nbsp;⚡️
                </a>
            </footer>
        </>
    )
}



export default UpdatePost