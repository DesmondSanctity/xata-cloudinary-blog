import NextLink from 'next/link'
import { Box, Image, Badge, Grid, GridItem, Flex, Spacer, ButtonGroup, Link } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { toast } from 'react-toastify'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const AllPosts = ({ posts }) => {

    const deleteData = async (id) => {
        const { status } = await fetch('/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })

        if (status === 200) {
            toast.success("post deleted successfully", {
                theme: "dark"
            })
        }
    }

    return (
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
            {
                posts && posts.map((post, index) => {
                    return (
                        <GridItem key={index}>
                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' >
                                <Image src={post.image} alt='blog-image' />

                                <Box p='6'>
                                    <Flex>
                                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                                            Tags:
                                        </Badge>
                                        {post.tags.length > 0 && post.tags.map((tag, index) => {
                                            return (
                                                <Box key={index}
                                                    color='gray.500'
                                                    fontWeight='semibold'
                                                    letterSpacing='wide'
                                                    fontSize='xs'
                                                    textTransform='lowercase'
                                                    ml='2'
                                                >
                                                    {(index ? ',' : '') + ' ' + tag}
                                                </Box>
                                            )
                                        })}
                                        <Spacer />
                                        <ButtonGroup gap={2}>
                                            <NextLink href={`/update/${post.id}`} legacyBehavior passHref>
                                                <Link><EditIcon /></Link>
                                            </NextLink>
                                            <DeleteIcon onClick={() => deleteData(post.id)} mt={1}/>
                                        </ButtonGroup>
                                    </Flex>

                                    <Box
                                        mt='1'
                                        fontWeight='semibold'
                                        lineHeight='tight'
                                        noOfLines={3}
                                    >
                                        <NextLink href={`/${post.id}`} legacyBehavior passHref>
                                            <Link>{post.title}<ExternalLinkIcon mx='2px' /></Link>
                                        </NextLink>
                                    </Box>

                                    <Box
                                        mt='1'
                                        fontWeight='light'
                                        lineHeight='tight'
                                        noOfLines={5}
                                    >
                                        <ReactMarkdown children={post.body} remarkPlugins={[remarkGfm]} />
                                    </Box>

                                </Box>
                            </Box>
                        </GridItem>
                    )
                })
            }
        </Grid>
    )
}


export default AllPosts