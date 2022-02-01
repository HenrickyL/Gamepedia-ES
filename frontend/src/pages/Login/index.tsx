import { Button, Input } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import {useForm} from 'react-hook-form'
import { PasswordInput } from '../../component/PasswordInput'
import { StyLogin } from './style'
import {  auth,ui  } from '../../store/actions'
import {  IReducerReturn } from '../../typings/Interfaces'
// import { connect } from 'react-redux'
import {Navigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'



// interface IProp{
//     auth: IAuthReturn,
//     ui:IUIReturn,
//     loginUser: Function

// }


const Login = ()=>{
    const  {register, handleSubmit} =useForm()
    const formRef =useRef(document.createElement('form'))
    const [isLoading,setLoading] = useState<boolean>(false)
    const [IsErrors,setErrors] = useState(false)
    const [isRedirect, setRedirect] = useState(false)
    
    const dispatch = useDispatch()
    const uiState = useSelector((state:IReducerReturn) => state.ui);
    const AuthState = useSelector((state:IReducerReturn) => state.auth);

    useEffect(() => {
        dispatch(auth.clearAuthentication())
        dispatch(ui.clearRedirect())
    }, [])


    useEffect(() => {
        console.log(uiState,AuthState)
        setLoading(uiState.loading)
        setErrors(uiState.error)
        setRedirect(AuthState.authenticated)
    }, [uiState,AuthState])
    
    
    const setSubmit = (data:any)=>{
        
        dispatch(auth.loginUser(data))
        
    }

    return(
        <StyLogin>
            {isRedirect && <Navigate to={'/'}/>}
            <form ref={formRef} onSubmit={handleSubmit(setSubmit)} >
                <h1>Login</h1>
                <div>
                        <Input 
                            required 
                            isDisabled={isLoading}
                            isInvalid={IsErrors}
                            errorBorderColor='red.300'
                            {...register('email')} 
                            type='email' className='input' 
                            size="lg" variant='outline' 
                            placeholder='Email' />
                        <PasswordInput 
                            required
                            isDisabled={isLoading}
                            isInvalid={IsErrors}
                            errorBorderColor='red.300'
                            register={register}
                            className='input' size='lg' 
                            placeholder='Senha'/>

                </div>
                <Button 
                    isLoading={isLoading}
                    loadingText='Submentendo'
                    type='submit'
                    className='button'
                    onClick={() => {
                        return formRef.current.reportValidity()
                    }}
                    colorScheme={!isLoading ?'blue':'teal' }>Logar</Button>

                
                
            </form>


        </StyLogin>
    )
}
// const mapStoreProps = (state: IReducerReturn)=>{
//     return { 
//         auth:state.auth,
//         ui: state.ui
//     }
// }

// const mapActionsToProps = {
//     loginUser
//    };

// export default connect(
//                     mapStoreProps,
//                     mapActionsToProps
//                 )(Login)

export default Login;