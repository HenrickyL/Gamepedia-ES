import { useEffect, useState } from "react"
import { Loader } from "../../component/LoaderModel"
import { ReviewCard } from "../../component/ReviewCard"
import { api } from "../../services/ApiService"
import {StyReviewPage} from './style'

export const ReviewPage = ()=>{
    const [reviews,setReviews] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        api.get('reviews')
            .then(res=>{
                if(res.status === 200){
                    setReviews(res.data)
                }
            }).catch(console.error)
            .finally(()=>setLoading(false))
    })
    return(
        <StyReviewPage loading={loading}>
            {loading? <Loader />
                    :
            <div className="all-reviews">

                {
                    <div className="content">
                        {reviews.map((review:any)=>
                            <ReviewCard review={review}/> 
                            )}
                </div>
                }
            </div>}
        </StyReviewPage>
    )
}