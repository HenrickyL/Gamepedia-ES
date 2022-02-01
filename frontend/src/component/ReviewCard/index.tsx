import {StyReviewCard} from './style'
import { Image  } from 'primereact/image';
import { useEffect, useState } from 'react';
import { api } from '../../services/ApiService';
import { formatDate } from '../../services/DateService'
import { Divider } from '@chakra-ui/react';

import { capsFirst } from '../../utils';

export const ReviewCard = ({btnRef,onOpen,review}:any)=>{
    const [userImg,setUserImg] = useState<string>('/default.jpg')

    useEffect(()=>{
        console.log(review.id)
        
        api.get(`users/${review.userId}/attachment`)
            .then(res=>{
                const {data} = res
                console.log(data)
                if(data.img)
                    setUserImg(data.img)
            }).catch(console.error)
    },[])
    return(
        <StyReviewCard to={`/reviews/${review.id}`} /*ref={btnRef} onClick={onOpen}*/>
            <header>
                <Image src={ userImg }/>
                <h3 className="title">{capsFirst(review.title)}</h3>
                <span className="date">{formatDate(review.createdAt,'dd MMMM yyyy')}</span>
            </header>
            <Divider/>
            <p>{capsFirst(review.content).slice(0,60)+'...'}</p>
        </StyReviewCard>

    )
}