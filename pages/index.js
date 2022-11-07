import { useState, useEffect } from 'react'
import CreatePost from '../components/CreateModal'
import { Flex, Button, ButtonGroup, Text, Spacer, VStack, Container } from '@chakra-ui/react'
import AllPosts from '../components/AllPost'


const createData = async () => {
  const response = await fetch('/api/create', {
    method: 'POST',
  })

  if (response.ok) {
    window?.location.reload()
  }
}

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getData = async () => {
      await fetch('/api/allposts', {
        method: 'GET',
      }).then((response) => response.json())
        .then((data) => setPosts(data.posts));
    }
    getData();
  }, [])


  return (
    <VStack >
      <Flex minWidth={'max-content'} alignItems='center' gap='2' mt={10} mb={20}>
        <Text as='b' fontSize='30px' color='black' mt={5} >
          Blog with Xata and Cloudinary
        </Text>
        <Spacer />
        <ButtonGroup gap={3} mt={5}>
          <CreatePost />

          <Button colorScheme='black' variant='outline'>
            Check source code
          </Button>
        </ButtonGroup>
      </Flex>

      <AllPosts posts={posts} />
    </VStack>
  )
}