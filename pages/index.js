import { useState, useEffect } from 'react'
import CreatePost from '../components/CreateModal'
import { FaGithub } from 'react-icons/fa'
import { Icon, ButtonGroup, Text, Spacer, Link } from '@chakra-ui/react'
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
    <>
      <main className='main'>
          <div className='grid'>
            <Text as='b' fontSize='20px' color='black' >
              Blog with Xata and Cloudinary
            </Text>
            <Spacer />
            <ButtonGroup gap={3} ml={5}>
              <CreatePost />
              <Link href='https://github.com/DesmondSanctity/xata-cloudinary-blog' isExternal><Icon as={FaGithub} w={10} h={10} /></Link>
            </ButtonGroup>
          </div>
          <AllPosts posts={posts} />
      </main>
      <footer className='footer'>
        <a href="https://dexcodes.xyz" target="_blank" rel="noopener noreferrer">
          Created by&nbsp;<b>Anon</b>&nbsp;⚡️
        </a>
      </footer>
    </>
  )
}