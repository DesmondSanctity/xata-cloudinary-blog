import { useRouter } from 'next/router'

import { Box, Image, Text, Icon, Link, Container, Spinner, Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())



const PostDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    console.log({ router });

    //Getting data from xata using swr
    const { data, error } = useSWR(`/api/post?id=${id}`, fetcher)

    if (error) return (
        <div><Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>Failed to Load.</AlertDescription>
        </Alert></div>
    )
    if (!data) return <div><Spinner color='red.500' /></div>

    const post = data.post;


    return (
        <>
            <main className='main'>
                <div className='grid'>
                    <Text as='b' fontSize='20px' color='black' mt={5}>
                        Blog with Xata and Cloudinary
                    </Text>
                    <Link href='https://github.com/DesmondSanctity/xata-cloudinary-blog' isExternal><Icon as={FaGithub} w={10} h={10} mt={7} ml={5} /></Link>
                </div>
                <Container maxW='container.sm'>
                    <Image src={post.image} alt='blog-image' />

                    <Box p='6'>

                        <Box
                            mt='1'
                            fontWeight='light'
                            lineHeight='tight'
                            ml={5}
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}>{post.body}</ReactMarkdown>
                        </Box>

                    </Box>
                </Container>
            </main>
            <footer className='footer'>
                <a href="https://dexcodes.xyz" target="_blank" rel="noopener noreferrer">
                    Created by&nbsp;<b>Anon</b>&nbsp;??????
                </a>
            </footer>
        </>
    )
}



export default PostDetails