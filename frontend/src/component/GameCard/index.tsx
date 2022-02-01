import {
    StyGameCard
} from  './style'



export const GameCard = ({item}:any)=>{
  


    return (
        <StyGameCard to={item.id} bg={item.images.logo}>
           
        </StyGameCard>
    )
}