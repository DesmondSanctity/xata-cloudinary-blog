import { Box, Image, Badge, Grid, GridItem, Flex, Spacer, ButtonGroup } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {toast} from 'react-toastify'
import UpdatePost from './UpdateModal';

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
            toast.warn("post deleted successfully", {
                theme: "dark"
              })
        }
      }

      const updateData = async (id) => {
        const { status } = await fetch('/api/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, title, body, tags }),
        })
      
        if (status === 200) {
            toast.success("post deleted successfully", {
                theme: "dark"
              })
        }
      }

    return (
        <Grid templateColumns='repeat(4, 1fr)' gap={6} mt={5}>
            {
                posts && posts.map((post, index) => {
                    return (
                        <GridItem>
                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' key={index}>
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
                                            <UpdatePost id={post.id} />
                                            <DeleteIcon onClick={()=> deleteData(post.id)}/>
                                        </ButtonGroup>
                                    </Flex>

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