import { Button, Input, Stack, useToast  } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { PasswordInput } from '../../component/PasswordInput'
import { StySignin } from './style'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useDispatch,useSelector } from 'react-redux'
import {IReducerReturn} from '../../typings/Interfaces'
import {ui,auth} from '../../store/actions'
import {Navigate} from 'react-router-dom'


const Signin = () => {

    const dispatch = useDispatch()
    const uiState = useSelector((state:IReducerReturn) => state.ui);

    const { register, handleSubmit } = useForm()
    const formRef = useRef(document.createElement('form'))
    const [pwd, setPwd] = useState("")
    const [pwdConfirm, setPwdConfirm] = useState("")
    const [invalid, setInvalid] = useState(false)
    const [value, setValue] = React.useState('1')
    const [isDate,setDate]=useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [redirect, setRedirect] = useState<boolean>(false)
    const [files, setFiles] = useState([]);
    const toast = useToast()

    const callToast  = (status:any, title:string, description?:string)=>{
        toast({
            title: `${title}`,
            status: status,
            description: `${description}`,
            duration: 7000,
            isClosable: true,
          })
    }
    const setSignin = (data: any) => {
        data.gender = Number.parseInt(value);
        if(!invalid){
            console.log("#Data", data)
            dispatch(auth.registerUser(data,callToast))
        }
    }


    
    const handlePasswordChange = ({ target: { value } }: any) => {
        setPwd(value)

    }
    const handleConfirmPsw = ({ target: { value } }: any) => {
        setPwdConfirm(value)
    }

    useEffect(()=>{
        setLoading(uiState.loading)
        setError(uiState.error)
        setRedirect(uiState.redirect)
    },[uiState])





    return (
        <StySignin>
            {/* <Wrap> */}

           
            {redirect && <Navigate to={'/login'} />}

            <form ref={formRef} onSubmit={handleSubmit(setSignin)} >
                <h1>Cadastro</h1>
                <div>

                    {/* <FilePond allowMultiple={true} maxFiles={3} server="/api" /> */}
                   

                    <Input
                        isDisabled={loading}
                        isInvalid={error}
                        errorBorderColor='red.300'
                        required {...register('username')}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Usuario' />

                    <Input
                        isDisabled={loading}
                        isInvalid={error}
                        errorBorderColor='red.300'
                        required {...register('email')}
                        type='email' className='input'
                        size="lg" variant='outline'
                        placeholder='Email' />


                    <PasswordInput
                        isDisabled={loading}

                        id='password'
                        onChange={handlePasswordChange}
                        required
                        register={register}
                        className='input' size='lg'
                        placeholder='Senha' />

                    <PasswordInput
                        id='confirmation'
                        isDisabled={loading}
                        isInvalid={invalid}
                        required
                        className='input' size='lg'
                        placeholder='Confirmar senha'
                        onChange={handleConfirmPsw}
                    />

                    <Input
                        
                        required {...register('birthDate')}
                        isDisabled={loading}
                        onFocus={()=>{
                            if(!isDate){
                                setDate(true)
                            }
                        }}
                        type={isDate?'date':'text'} className='input'
                        min={'1900-01-01'} max={'2017-12-31'}
                        size="lg" variant='outline'
                        placeholder='Data de Nascimento' />



                    <RadioGroup
                        className='radio'
                        onChange={setValue}
                        value={value}>


                        <Stack style={{display:"flex",justifyContent:"space-around"}}spacing={24} direction='row'>

                            <Radio isDisabled={loading} colorScheme='blue' value='1' >
                                Masculino
                            </Radio>
                            <Radio isDisabled={loading} colorScheme='red' value='2'>
                                Feminino
                            </Radio>
                            <Radio isDisabled={loading} colorScheme='purple' value='3'>
                                Outro
                            </Radio>

                        </Stack>
                    </RadioGroup>


                </div>

                <Button
                    isLoading={loading}
                    isDisabled={loading}
                    type='submit'
                    className='button'
                    onClick={() => {
                        if (pwd !== pwdConfirm) {
                            setInvalid(true)
                        }
                        else {
                            setInvalid(false)
                        }
                        return formRef.current.reportValidity()
                    }}
                    colorScheme='blue'
                    alt="Cadastrar">Cadastrar</Button>



            </form>




            {/* </Wrap> */}
        </StySignin>

    )
}

export default Signin