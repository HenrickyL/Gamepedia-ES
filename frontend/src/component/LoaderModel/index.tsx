import {LoaderStyle,Pin, Modal} from './style'

interface IProp{
    pins?: number
    color?:string
    spinColor?:string | null
    reverse?:boolean;
    linear?:boolean,
    className?:string

}

export const LoaderModel = ({pins=8,color,spinColor,reverse,linear}:IProp)=>{
    const vPins = Array(8).fill(0)
    const spins=Math.floor(pins/2+1)
    const vSelect = Array(spins).fill(0)

    return (
         <Modal>
             <div>
                <LoaderStyle className='loader' >
                    <svg>
                        <filter id='gooey'>
                            <feGaussianBlur in='SourceGraphic'
                                stdDeviation='10'/>
                                <feColorMatrix values="
                                    1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 20 -10
                                "/>
                        </filter>
                    </svg>
                    {vPins.map((_,i)=>
                        <Pin key={`Fix${i}`}  
                            color={color}
                            len={pins} 
                            position={i+1} />
                    )}
                    {vSelect.map((_,i)=>
                        <Pin    className='rotate' 
                                key={`Din${i}`} position={i+1}
                                color={color}
                                reverse={reverse}
                                linear={linear}
                                spinColor={i===spins-1?spinColor:null}
                                len={spins}/>
                    )}
                </LoaderStyle>
             </div>
         </Modal>
    )
}

export const Loader = ({pins=8,color,spinColor,reverse,linear,className}:IProp)=>{
    const vPins = Array(8).fill(0)
    const spins=Math.floor(pins/2+1)
    const vSelect = Array(spins).fill(0)

    return (
        <div>
        <LoaderStyle className={`loader ${className}`} >
            <svg>
                <filter id='gooey'>
                    <feGaussianBlur in='SourceGraphic'
                        stdDeviation='10'/>
                        <feColorMatrix values="
                            1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 20 -10
                        "/>
                </filter>
            </svg>
            {vPins.map((_,i)=>
                <Pin key={`Fix${i}`}  
                    color={color}
                    len={pins} 
                    position={i+1} />
            )}
            {vSelect.map((_,i)=>
                <Pin    className='rotate' 
                        key={`Din${i}`} position={i+1}
                        color={color}
                        reverse={reverse}
                        linear={linear}
                        spinColor={i===spins-1?spinColor:null}
                        len={spins}/>
            )}
        </LoaderStyle>
        </div>
    )
}
