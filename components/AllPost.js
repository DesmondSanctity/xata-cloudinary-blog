import { Box, Image, Badge, Grid, GridItem } from '@chakra-ui/react';


const AllPosts = ({ posts }) => {

    return (
        <Grid templateColumns='repeat(4, 1fr)' gap={6} mt={5}>
            {
                posts && posts.map((post, index) => {
                    return (
                        <GridItem>
                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' key={index}>
                                <Image src={post.image} alt='blog-image' />

                                <Box p='6'>
                                    <Box display='flex' alignItems='baseline'>
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
                                    </Box>

                                    <Box
                                        mt='1'
                                        fontWeight='semibold'
                                        as='h4'
                                        lineHeight='tight'
                                        noOfLines={3}
                                    >
                                        {post.title}
                                    </Box>

                                    <Box
                                        mt='1'
                                        fontWeight='light'
                                        as='h4'
                                        lineHeight='tight'
                                        noOfLines={5}
                                    >
                                        {post.body}
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