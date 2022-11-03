import { useState, useEffect } from 'react'
import { Grid, GridItem, Box, Image } from '@chakra-ui/react'

const AllPost = () => {
    const [posts, setPosts] = useState([''])

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('/api/allposts', {
                method: 'GET',
            })
            console.log(response)
            if (response.body) {
                return response.body
            }
        }
        getData();
    }, [])


    return (
        <>
            {posts && posts.map((post, index) => {
                <Grid templateColumns='repeat(5, 1fr)' gap={6} >
                    <GridItem w='100%' h='10' bg='blue.500'>
                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                            <Image src='#' alt='blog-img' />
                            <Box p='6'>
                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={1}
                                >
                                    Hello
                                </Box>

                                <Box>
                                    Hi
                                </Box>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            })}

        </>
    )
}

export const getServerSideProps = async () => {
    const xata = await getXataClient()
    const posts = await xata.db.posts.getAll()
    return {
        props: {
            posts,
        },
    }
}


export default AllPost;