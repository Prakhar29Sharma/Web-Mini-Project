import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { BsBook } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
export const SidebarData = [
    {
        title: 'Profile',
        icon:<CgProfile/>,
        link: '/profile'
 
    },

    {
        title: 'Home',
        icon:<AiOutlineHome/>,
        link: '/Home'
 
    },

    {
        title: 'Courses',
        icon:<BsBook/>,
        link: '/Courses'
 
    },
]
