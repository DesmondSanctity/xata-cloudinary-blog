import { useRouter } from 'next/router'

import { Box, VStack, Image, Flex, Text, Spacer, Icon, Link } from '@chakra-ui/react'
import {FaGithub} from 'react-icons/fa'
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

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    const post = data.post;



    return (
        <Box w='100%' p={4} >
            <VStack>
            <Flex minWidth={'max-content'} gap='20' mt={10} mb={15}>
                <Text as='b' fontSize='30px' color='black' mt={5} >
                    Blog with Xata and Cloudinary
                </Text>
                <Spacer />
                <Link href='https://github.com/DesmondSanctity/xata-cloudinary-blog'><Icon as={FaGithub} w={10} h={10} mt={7} /></Link>
            </Flex>
                <Box maxW='4xl' borderWidth='1px' borderRadius='lg' overflow='hidden'>
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
                </Box>
            </VStack>
        </Box>
    )
}



export default PostDetails