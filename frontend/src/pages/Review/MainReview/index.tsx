import { Image } from "primereact/image"
import {  useEffect, useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { LoaderModel } from "../../../component/LoaderModel"
import { api } from "../../../services/ApiService"
import { formatDate } from "../../../services/DateService"
import { capsFirst } from "../../../utils"
import {StyMainReview} from './style'
import { Divider } from "@chakra-ui/react"
import { Comment } from "../../../component/Comment"
import { Textarea,Button } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { IReducerReturn } from "../../../typings/Interfaces"
import { auth as authActions, ui as uiActions } from "../../../store/actions"
import { getUser } from "../../../services/AuthService"


const CommentForm = ({review}:any)=>{
    const [content, setContent ] = useState<string>("")
    const  {register, handleSubmit} =useForm()
    const formRef =useRef(document.createElement('form'))
    const dispatch = useDispatch()
    const uiState = useSelector((state:IReducerReturn) => state.ui);
    const AuthState = useSelector((state:IReducerReturn) => state.auth);
    const [loading,setLoading] = useState<boolean>(true)
    const [authenticated,setAutenticated] = useState<boolean>(true)


    useEffect(() => {
        dispatch(uiActions.clearLoading())
        dispatch(uiActions.clearError())
        dispatch(uiActions.clearRedirect())
    }, [])


    useEffect(() => {
        setAutenticated(AuthState.authenticated)
        setLoading(uiState.loading)
    }, [uiState,AuthState])

    const submit = (data:any)=>{
        const user = getUser()
        data.userId = user.id.userId
        console.log(data)
        if(user.id)
            api.post(`/reviews/${review.id}/comments`,data)
                .then(res=>console.log('post comment ',res.status))
                .catch(console.error)
    }
    return(
        <>
        { !authenticated?
            <></>
            :<form ref={formRef} onSubmit={handleSubmit(submit)}>
                <Textarea {...register('content')} type={'text'} onChange={(e:any)=>setContent(e.value)}/>
                <Button onClick={() => formRef.current.reportValidity()} type="button" className="buttom">Comentar</Button>
            </form>
        }
        </>
    )
}



export const MainReview = ()=>{
    const {id} = useParams()
    const [review, setReview] = useState<any>()
    const [redirect, setRedirect] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(true)
   

    useEffect(()=>{
        api.get(`reviews/${id}`)
            .then(res=>{
                console.log('review',res.data)
                setReview(res.data)  
            }).catch(_=>{
                setRedirect(true)
            }).finally(()=>setLoading(false))

    },[])
    return (
        <>
            {redirect ?
                <Navigate to={'/reviews'}/>
                :  
                loading ? <LoaderModel />
                :<StyMainReview bg={review.game.images.logo}>
                    <div className="bg" />

                    <div className="content">
                        <form >
                            <div className="header">
                                <div className="left">
                                    <div>
                                        <div className="user">
                                            <Image className="user-img" preview src={review.user.img} alt="userImg" />
                                            <span className="name">{capsFirst(review.user.nickname || review.user.username) }</span>

                                        </div>
                                    <span>{formatDate(review.createdAt)}</span>

                                    </div>
                                    <h1 className="title">{capsFirst(review.title)}</h1>
                                </div>
                                <Image className="game-img" src={ review.game.images.logoText} alt="userImg" />
                            </div>
                            <Divider/>
                            <div className="main-content">
                                <p>{review.content}</p>
                            </div>
                            <Divider/>
                            <div className="footer">
                                <span className="comment-header">Comentários</span>
                                <div className="comments">
                                    {review.comment.length ? review.comment.map((comment:any)=>
                                        <Comment comment={comment}/>    
                                    )
                                     : <span className="info">Sem comentários</span>   
                                    }
                                </div>
                                    <CommentForm review={review}/>
                               
                            </div>
                            
                        </form>
                    </div>

                </StyMainReview>
            }        
        </>
    )
}