import { 
    IHttpResponse, 
    ILoginRequest, 
    IRegisterRequest    
} from "../../typings/Interfaces"
import { api } from "../ApiService"



export const getToken = ():string | null=>{
    return localStorage.getItem('token')
}
export const setUser = (data:object)=>{
    localStorage.setItem('user', JSON.stringify(data));
}
export const getUser = ()=>{
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user): null
}
export const setToken = (token:string)=>{
    localStorage.setItem('token', token);
}

const getConfig = ()=>{
    return {
        headers:{
          Authorization: `Bearer ${getToken()}`,
          token: `${getToken()}`
        } 
    }   
}

export const register = (data:IRegisterRequest)=>{
    return api.post('users',data)
}


export const login = async (userData:ILoginRequest):Promise<IHttpResponse | null>   =>{
    try{
        const res = await api.post('login',userData)
        const token = res.data.token

        setToken(token)
        setUser(res.data)
        api.defaults.headers.common['Authorization'] = token;
        api.defaults.headers.common['token'] = token;

        return res.data;
    }catch(err){
        console.error(err)
        return null;

    }
}

export const logout = ():void=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
} 
