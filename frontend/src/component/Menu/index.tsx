import {
    StyMenu,
    StyMainMenu,
    StyOptionMenu,
    NavElem,
    StySearch,
    Search,
    UserIcon,
    StyAuthOptions,
    StyUser,
    LogoutIcon
} from './style'
import {NavLink} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {auth} from '../../store/actions'
import { IReducerReturn } from '../../typings/Interfaces'
import { useEffect, useState } from 'react'
import { logout } from '../../services/AuthService'


const MainMenu = ()=>{
    return (
        <StyMainMenu >
            <NavElem  to={'/games'}>Games</NavElem>
            <NavElem  to={'/reviews'}>Reviews</NavElem>
            <NavElem  to={'/ranks'}>Ranks</NavElem>
        </StyMainMenu>
    )
}
const InputSearch= ()=>{
    return(
        <StySearch>
                <Search/>
                <input type="text" />
        </StySearch>
    )
}

const AuthOptions = ()=>{
    return(
        <StyAuthOptions>
            <NavElem to={'login'}>Login</NavElem>
            <NavElem to={'signin'}>SignIn</NavElem>
        </StyAuthOptions>
    )
}

const UserArea = ()=>{
    const dispatch = useDispatch()
    return (
    <StyUser>
        <UserIcon/>
        <LogoutIcon onClick={()=>{
            logout()
            dispatch(auth.clearAuthentication())
        }}/>
    </StyUser>

    )
}

const OptionsMenu = ()=>{
    const authState = useSelector((state:IReducerReturn) => state.auth);
    const [autenticated, setAutenticated] = useState(false)

    useEffect(()=>{
        setAutenticated(authState.authenticated)
    },[authState])

    
    return (
        <StyOptionMenu>
            <InputSearch />
            {!autenticated?
                <AuthOptions/>
                :<UserArea/>}
            
        </StyOptionMenu>
    )
}



export const Menu = ()=>{
    return(
        <StyMenu>
            <MainMenu/>
            <NavLink className={'logo'} to={'/'}>
                <img src="/logo-text.png" alt="" />
            </NavLink>
            <OptionsMenu/>
        </StyMenu>
    )
}