import { StyComment } from "./style"
import { Image } from "primereact/image"
import { capsFirst } from "../../utils"
import { formatDate } from "../../services/DateService"
import { useEffect, useState } from "react"
import { api } from "../../services/ApiService"
import { setUser } from "../../services/AuthService"
import { Skeleton } from "@chakra-ui/react"


export const Comment= ({comment}:any)=>{
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        api.get(`/users/${comment.userId}`)
        .then(res=>{
            console.log('comment',res.data)
            if(res.status === 200)
                setUser(res.data)
        })
        .catch(console.error)
        .finally(()=>setLoading(false))
    },[])

    return(
        <StyComment>
            { loading ?
            <Skeleton width={'100%'} height={'100%'}/>
            :<>
            <div className="header-comment">
                                <div className="user-comment">
                                    <Image src={user.img}/>
                                    <span className="name">{capsFirst( user ? (user.nickname || user.username) : 'username') }</span>
                                </div>
                                <span className={'comment-date'}>{formatDate(comment.createdAt)}</span>
                            </div>
            <div className="comment-content">
                {comment.content}
            </div>
            </>}
        </StyComment>
    )
}