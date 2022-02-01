/* eslint-disable react/jsx-no-undef */
import { StyMainGame, StyDetails, StyAttachments, StyContent,StyCurrentReviews } from "./style";
import Carousel from "../../../component/Carousel";
import { Image  } from 'primereact/image';
import {
    FaWindows as WindowsIcon,
    FaLinux as LinuxIcon,
    FaApple as MacIcon
} from 'react-icons/fa'
import {AiOutlineInfoCircle as InfoIcon} from 'react-icons/ai'
import {capsFirst} from '../../../utils'
import {IoHelp as HelpIcon} from 'react-icons/io5'
import {DiAndroid as AndroidIcon} from 'react-icons/di'
import {RiSwitchLine as SwitchIcon} from 'react-icons/ri'
import {Rating} from 'primereact/rating'
import { useEffect, useState } from "react";
import { Table, Tbody, Td, Tr,Skeleton, SkeletonText, Box,    Divider,  } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import { LoaderModel } from "../../../component/LoaderModel";
import { api } from "../../../services/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { IReducerReturn } from "../../../typings/Interfaces";
import {ui as uiActions} from '../../../store/actions'
import { ReviewCard } from "../../../component/ReviewCard";

const Attachments = ({data, load}:any) => {

    const [loading, setLoading] = useState<boolean>(true)
    const uiState = useSelector((state:IReducerReturn) => state.ui);
    useEffect(()=>{
        setLoading(uiState.loading)
    },[uiState])

    return (
    <StyAttachments>

        <div className="main-img">
            <Image key={0} src={loading ?'/default.jpg' : data.images.logo} />
        </div>
        <Carousel gap={20}>
            {loading?   
            [0,0,0,0,0].map((e,i)=>
                <Image key={i} src={'/default.jpg'} preview />
                )
            :data.images.attachments.map((img:string,i:number)=>(
                <Image key={i} src={img} preview />
            ))}
        </Carousel>

      
    </StyAttachments>
  );
};


const TableDetails = ({data}:any)=>{
    return(
        <Table variant='simple'>
            <Tbody>
                <Tr>
                    <Td>Desenvolvedor</Td>
                    <Td><span>{capsFirst(data.details.developer)}</span></Td>
                </Tr>
                <Tr>
                    <Td>Distribuidor</Td>
                    <Td><span>{capsFirst(data.details.publisher)}</span></Td>
                </Tr>
                <Tr>
                    <Td>Preço</Td>
                    <Td>
                        <div>
                            <span>{data.details.price}</span>
                            <InfoIcon className='info' data-pr-tooltip="PrimeReact-Logo"/>
                    
                            </div>
                        </Td>
                </Tr>
                <Tr className="platform">
                    <Td>Plataformas</Td>
                    <Td>
                        <div>
                            {data.details.plataforms.map((p:string, i:number)=>{
                                switch (p) {
                                    case 'windows':
                                        return <WindowsIcon key={i}/>
                                    case 'linux':
                                        return <LinuxIcon key={i}/>
                                    case 'mac':
                                        return <MacIcon key={i}/>
                                    case 'android':
                                        return <AndroidIcon key={i}/>
                                    case 'switch':
                                        return <SwitchIcon key={i}/>
                                    default:
                                        return <HelpIcon key={i}/>
                                }
                            })
                            }
                        </div>
                    </Td>
                </Tr>

                
            </Tbody>
        </Table>
    )
}

const Details = ({data}:any) => {
    const [rating,setRating] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [authenticated,setAutenticated] = useState<boolean>(false)
    const state = useSelector((state:IReducerReturn) => state);
    // const toast = useToast()

    // const callToast  = (status:any, title:string, description?:string)=>{
    //     toast({
    //         title: `${title}`,
    //         status: status,
    //         description: `${description}`,
    //         duration: 7000,
    //         // position: 'bottom-right',
    //         isClosable: true,
    //       })
    // }
    
    useEffect(()=>{
        setLoading(state.ui.loading)
        setAutenticated(state.auth.authenticated)

    },[state])

    useEffect(()=>{
        api.get(`games/${data.id}`)
            .then(res=>{
                setRating(res.data.score)
            })
    },[])



    const handleChange = (e:any)=>{
        setRating(e.value)
        api.put(`games/${data.id}`,{score:rating})
            .then(res=>{
                if(res.status===204){
                    console.log('Ok')
                    // callToast('sucess','Nota atualizada com sucesso')
                }else{
                    // callToast('warning','Não foi possível atualizar')
                }
            }).catch((err)=>{
                console.error(err)
                // callToast('error','Não foi possível atualizar')


            })
    }

  return (
    <StyDetails>
            <Rating stars={5} 
                className="rating" 
                readOnly={!authenticated} 
                value={!authenticated?data.score : rating  } 
                cancel={false} 
                onChange={handleChange} />
            {
                loading?
                <Box padding='6' boxShadow='lg' bg='white'>
                            <Skeleton>
                                <div>contents wrapped</div>
                                <div>won't be visible</div>
                                <div>won't be visible</div>
                            </Skeleton>
                            <SkeletonText mt='4' noOfLines={5} spacing='3' />
                </Box>
                :<>
                    <Image  src={data.images.background} preview />
                    <p>{data.synopsis}</p>
                    <TableDetails data={data}/>
                </>
            }
            
    </StyDetails>
  );
};




const CurrentReviews = ({reviews}:any)=>{
    const [loading, setLoading] = useState<boolean>(true)
    const uiState = useSelector((state:IReducerReturn) => state.ui);
    // const { isOpen,onOpen, onClose } = useDisclosure()
    // const btnRef = useRef<any>()
    const [selected,setSelected] = useState<any>(null);



    useEffect(()=>{
        setLoading(uiState.loading)
    },[uiState])
    return(
        
        <StyCurrentReviews>
            <h1>Reviews</h1>
            <Divider className="divider" />
            {reviews.map((review:any,i:number)=>(
                <ReviewCard
                    key={i}
                    id={review.id}
                    review={review}
                    // btnRef={btnRef}
                    onOpen={()=>{
                        setSelected(review)
                        // onOpen()
                    }}
                    />

            ))}
            {/* {selected && 
                <Modal 
                    onClose={onClose}
                    finalFocusRef={btnRef}
                    isOpen={isOpen}
                    scrollBehavior={'outside'}
                    size={'3xl'}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader className="header">
                            <h1>{selected.title}</h1>
                            <span>{formatDate(selected.createdAt,'dd MMMM yyyy')}</span>
                        </ModalHeader>
                        
                        <ModalCloseButton />
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            } */}
        </StyCurrentReviews>
    )
}

const Content = ({game}:any) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [reviews, setReviews] = useState<Array<any>>([])

    const uiState = useSelector((state:IReducerReturn) => state.ui);
    useEffect(()=>{
        setLoading(uiState.loading)
    },[uiState])

    useEffect(()=>{
        if(!loading) 
            api.get(`games/${game.id}/reviews`)
                .then((res)=>{
                    if(res.status===200){

                        const reviews = res.data
                        reviews.map((review:any) =>{

                            review.title = capsFirst(review.title)
                        })
                        setReviews(reviews)
                    }
                })
                .catch(console.error)
    },[loading])

  return (
    <StyContent>
            <h1 className="title select">{loading ? '' :game?.title}</h1>
            <form action="">
                <div className="form-content" >
                    <div className="left">

                        <Details data={game}/>
                    </div>
                    <div className="main">
                        <Attachments data={game}/>
                        <CurrentReviews reviews={reviews} />

                    </div>
                </div>
            </form>
    </StyContent>
  );
};

export const MainGame = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>({})
    const [redirect, setRedirect] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(true)
    const dispatch = useDispatch()
    const uiState = useSelector((state:IReducerReturn) => state.ui);
   
    
    useEffect(()=>{
        setLoading(uiState.loading)
    },[uiState])

    useEffect(()=>{
        dispatch(uiActions.setLoading())
        api.get(`/games/${id}`)
            .then(res=>{
                const current = res.data
                if(res.status===200 && current)
                    setData(current)
                else
                    setRedirect(true)
                    
            })
            .catch(err=>{
                console.error(err)
                setRedirect(true)
            })
            .finally(()=>{
                dispatch(uiActions.clearLoading())
            })
        
    },[])
    
   


  return (
    <>
    {   loading ?
            <LoaderModel />
            :redirect?
                <Navigate to={'/games'}/>
                :
                <StyMainGame bg={loading ? '' : data.images?.logo }>

                    <div className="bg" />
                    <Content game={data} />
                    
                </StyMainGame>
    }
    </>
  );
};
