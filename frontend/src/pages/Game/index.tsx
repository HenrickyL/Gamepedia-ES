import { useEffect, useState } from "react"
import { api } from "../../services/ApiService"
import { GameCard } from "../../component/GameCard"
import {StyGamePage} from './style'
import Carousel from "../../component/Carousel"
import { Skeleton } from "@chakra-ui/react"
import { colorsDefault } from "../../styleGlobal"

export const GamePage = ()=>{
    const [games,setGames] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        api.get('games')
            .then(res=>{
                console.log(res.data)
                setGames(res.data)
                setLoading(false)
            }).catch(()=>{
                setGames([])
                setLoading(false)
            })
    },[])

    return(
        <StyGamePage>
            <div className="all-games">
                <Carousel  gap={20}>
                    {loading ?
                        [0,0,0,0,0].map((e,i)=>
                            <Skeleton key ={i} style={{borderRadius:'8px',transition:'0.5s'}} startColor={colorsDefault.main} endColor={colorsDefault.mainLight} height={'200px'} width={'300px'}/>
                        )
                        
                        : games!==[] && games.map((game:any,i:number)=>
                             <GameCard key={i} item={game}/>
                            )
                    }
                </Carousel>
            </div>
            

        </StyGamePage>
    )
}