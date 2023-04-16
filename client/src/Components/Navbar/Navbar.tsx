import { Box, Flex, Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import Avatar from '../Avatar/Avatar';
import { GoSignOut } from "react-icons/go";
import { Image } from '@chakra-ui/react';
import { useProvider } from '../../context/Provider';
import './Navbar.css'
import { useNavigate } from 'react-router';
type Props = {}

function Navbar({ }: Props) {

     const { user, logout } = useProvider()

     return (
          <Flex px='2' h='60px' w='80%' m='auto' >
               <Flex align={'center'} justify='center' border={'px'} color='white'>
                    <Image boxSize={'70px'} src="/logo.png" />
               </Flex>
               <Flex align={'center'} gap='10px' ml='auto' className='profile' cursor={'pointer'}>
                    <Avatar src={user?.avtar} name={user?.name || "Quiz"} />
                    <Text fontSize={'1.3rem'} fontWeight='semibold'>{user?.name}</Text>
                    <ul className='menu-list'>
                         <li className='list-item' onClick={logout}><GoSignOut />Sign Out</li>
                    </ul>
               </Flex>
          </Flex>
     )
}

export default Navbar