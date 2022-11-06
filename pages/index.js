import { useState, useEffect } from 'react'
import CreatePost from '../components/Modal'
import { Flex, Button, ButtonGroup, Text, Spacer } from '@chakra-ui/react'
import AllPosts from '../components/AllPost'


const createData = async () => {
  const response = await fetch('/api/create', {
    method: 'POST',
  })

  if (response.ok) {
    window?.location.reload()
  }
}

const deleteData = async (id) => {
  const { status } = await fetch('/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  if (status === 200) {
    window?.location.reload()
  }
}

export default function Home() {
  const [posts, setPosts] = useState([])

    console.log(posts)

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
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2' mt={5}>
        <Text as='b' fontSize='30px' color='black' mt={5} >
          Blog with Xata and Cloudinary
        </Text>
        <Spacer />
        <ButtonGroup gap={3} mt={5}>
          <CreatePost />

          <Button colorScheme='black' variant='outline' onClick={() => {
            createData()
          }}>
            Check source code
          </Button>
        </ButtonGroup>
      </Flex>
      <AllPosts posts={posts} />
    </>
  )
}