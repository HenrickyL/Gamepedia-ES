import { IconType } from 'react-icons/lib'
import {
    AiOutlineHome as home,
     AiOutlineMessage as message
    } from 'react-icons/ai'
import {FiUser as user,FiSettings as settings} from 'react-icons/fi'
import {BsCamera as photo} from 'react-icons/bs'



export interface IItem{
    title: string,
    url: string | null,
    img: IconType | null
}


const data : Array<IItem> = [
    {
        title: 'Home',
        url: '/',
        img:home
    },
    {
        title: 'Profile',
        url: '/profile',
        img:user
    },{
        title: 'Message',
        url: '/messages',
        img:message
    },{
        title: 'Photo',
        url: '/photos',
        img:photo
    },{
        title: 'Setting',
        url: '/settings',  
        img:settings
    }
]


export default data

