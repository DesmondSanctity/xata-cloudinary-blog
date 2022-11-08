import { useState, useEffect } from 'react'
import CreatePost from '../components/CreateModal'
import { FaGithub } from 'react-icons/fa'
import { Flex, Icon, ButtonGroup, Text, Spacer, VStack, Link } from '@chakra-ui/react'
import AllPosts from '../components/AllPost'


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
      <Flex minWidth={'max-content'} gap='20' mt={10} mb={20}>
        <Text as='b' fontSize='30px' color='black' mt={5} >
          Blog with Xata and Cloudinary
        </Text>
        <Spacer />
        <ButtonGroup gap={3} mt={5}>
          <CreatePost />
          <Link href='https://github.com/DesmondSanctity/xata-cloudinary-blog' isExternal><Icon as={FaGithub} w={10} h={10} /></Link>
        </ButtonGroup>
      </Flex>

      <AllPosts posts={posts} />
    </VStack>
  )
}