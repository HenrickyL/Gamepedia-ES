import React, { useState, useEffect, Component } from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { StyCreateGame } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { IReducerReturn } from '../../typings/Interfaces'
import { Navigate } from 'react-router-dom'
import { Checkbox, Input, Textarea, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, InputGroup, InputLeftElement, CheckboxGroup, Button, useToast } from '@chakra-ui/react'
import { api } from '../../services/ApiService'

import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'dotenv/config'


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFilePoster);

interface IDetails {
    realeseDate: Date
    parentalRating: string
    genders: string[]
    developer: string
    publisher: string
    price: number
    warns: string[]
    languages: string[]
    platforms: string[]
}
interface GameRequest {
    images?: any
    title: string
    synopsis: string
    features?: string[]
    details: IDetails
}


const CreateGame = () => {

    const [pwd, setPwd] = useState("")
    const [pwdConfirm, setPwdConfirm] = useState("")

    const dispatch = useDispatch()
    const State = useSelector((state: IReducerReturn) => state);

    const { register, handleSubmit } = useForm()
    const formRef = useRef(document.createElement('form'))
    const [invalid, setInvalid] = useState(false)


    const [isLoading, setLoading] = useState<boolean>(false)
    const [IsErrors, setErrors] = useState(false)

    const [error, setError] = useState<boolean>(false)
    const [redirect, setRedirect] = useState<boolean>(false)

    const [isDate, setDate] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)
    const [platforms, setPlatforms] = useState<string[]>([])
    const [features, setFeatures] = useState<string[]>([])
    const [featuresValue, setFeaturesValue] = useState<string>('')
    const [files, setFiles] = useState([]);

    const refFile = useRef<any>()
    const toast = useToast()


    const getFeatures =()=>{
        const allFeatures = featuresValue.split(';')
        const res = allFeatures.map((f:string)=>f.toLowerCase().trim())
        setFeatures(res)
    }

    const callToast  = (status:any, title:string, description?:string)=>{
        if(description){
            toast({
                title: `${title}`,
                status: status,
                description: `${description}`,
                duration: 7000,
                position: 'bottom-right',
                isClosable: true,
              })
        }else{
            toast({
                title: `${title}`,
                status: status,
                duration: 7000,
                position: 'bottom-right',
                isClosable: true,
              })
        }
    }
        

    const GenerateRequest = (data:any):GameRequest=>{
        getFeatures()
        const request: GameRequest = {
            images:{
                attachments: files
            }, 
            title: data.title,
            synopsis: data.synopsis,
            features: features,
            details: {
                developer: data.developer,
                publisher: data.publisher,
                price: data.price,
                warns: data.warns,
                realeseDate: data.releaseDate,
                platforms: platforms,
                genders: [data.gender],
                parentalRating: data.parentalRating,
                languages: [data.languages]
            }
        }
        return request
    }

    const submit = (data: any) => {
        console.log(data)
        api.post('/games',GenerateRequest(data))
            .then(res=>{
                console.log('res',res)
                callToast('sucess','Deu certo')
            }).catch(err =>{console.error(err);callToast('error','Deu ruim',err)})


    }

    useEffect(() => {
        setLoading(State.ui.loading)
        setError(State.ui.error)
        setRedirect(State.ui.redirect)
    }, [State])




    return (
        <StyCreateGame>
            {/* <Wrap> */}


            {redirect && <Navigate to={'/'} />}

            <form ref={formRef} onSubmit={handleSubmit(submit)} >
                <h1>Cadastro de Jogo</h1>
                <div className={'content'}>


                    <FilePond
                            ref = {refFile}
                            files={files}
                            onupdatefiles={(fileItems:any)=>{
                                setFiles(fileItems.map((fileItem:any) => fileItem.file))
                                console.log(files)
                            }}
                            server={{
                                
                                    url: 'https://api.imgur.com/3/image',
                                    timeout: 7000,
                                    process: {
                                        url: '',
                                        method: 'POST',
                                        headers: {
                                            'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
                                            'Access-Control-Allow-Origin':'*',
                                            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                                        },
                                        withCredentials: false,
                                        onload: (response) => {
                                            console.log('res',response)
                                            return response.key },
                                        onerror: (response) => response.data,
                                        ondata: (fileItems) => {
                                            
                                            return fileItems;}
                                        }
                            }}
                            allowMultiple={true}
                            maxFiles={8}
                            name="files"
                            labelIdle={'Arraste & Solte seus arquivos ou <span class="filepond--label-action">Procurar</span>'}
                    />
                    <Input
                        required
                        isDisabled={isLoading}
                        isInvalid={IsErrors}
                        errorBorderColor='red.300'
                        {...register('title')}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Titulo' />


                    <Textarea

                        required
                        isDisabled={isLoading}
                        isInvalid={IsErrors}
                        errorBorderColor='red.300'
                        height="120px"
                        {...register('synopsis')}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Sinopse' />

                    <Input
                        {...register("features")}
                        isDisabled={isLoading}
                        isInvalid={IsErrors}
                        errorBorderColor='red.300'
                        onChange={(e:any)=>{setFeaturesValue(e.target.value)}}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Caracteristicas' />

                    <Input
                        
                        isDisabled={isLoading}
                        isInvalid={IsErrors}
                        errorBorderColor='red.300'
                        {...register('warns')}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Avisos(Ex: eplepsia)' />







                    <Input
                        required
                        isDisabled={isLoading}
                        isInvalid={IsErrors}
                        errorBorderColor='red.300'
                        {...register('genders')}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Generos' />

                    <Select {...register('parentalRating')} className='input' placeholder='Classificação indicativa'>
                        <option value='ER'>ER</option>
                        <option value='L'>L</option>
                        <option value='NR10'>10</option>
                        <option value='NR12'>12</option>
                        <option value='NR14'>14</option>
                        <option value='NR16'>16</option>
                        <option value='NR18'>18</option>
                    </Select>


                    <Stack className='input' onChange={(e: any) => {
                        const current = e.target.value
                        if (!platforms.includes(current)) {
                            platforms.push(current)
                            setPlatforms(platforms)
                        } else {
                            const res = platforms.filter(x => x !== current)
                            setPlatforms(res)
                        }
                    }} spacing={5} direction={['column', 'row']}>
                        <Checkbox value="PC" >
                            PC
                        </Checkbox>
                        <Checkbox value="PS"  >
                            PS
                        </Checkbox>
                        <Checkbox value="PS2" >
                            PS2
                        </Checkbox>
                        <Checkbox value="PS3" >
                            PS3
                        </Checkbox>
                        <Checkbox value="PS4"  >
                            PS4
                        </Checkbox>
                        <Checkbox value="Xbox"  >
                            Xbox
                        </Checkbox>
                        <Checkbox value="Xbox360"  >
                            Xbox360
                        </Checkbox>
                        <Checkbox value="XboxOne"  >
                            XboxOne
                        </Checkbox>
                        <Checkbox value="XboxSeries"  >
                            XboxSeries
                        </Checkbox>
                        <Checkbox value="Wii"  >
                            Wii
                        </Checkbox>
                        <Checkbox value="Wii U"  >
                            Wii U
                        </Checkbox>
                        <Checkbox value="Switch"  >
                            Switch
                        </Checkbox>
                        <Checkbox value="Android"  >
                            Android
                        </Checkbox>
                        <Checkbox value="Ios"  >
                            Ios
                        </Checkbox>
                    </Stack>

                    <InputGroup className='input'>
                        <InputLeftElement
                            pointerEvents='none'
                            color='gray.300'
                            fontSize='1.2em'
                            children='R$'
                        />
                        <Input  {...register('price')} type="number" placeholder='Preço' />

                    </InputGroup>


                    <Input
                        required
                        isDisabled={isLoading}
                        isInvalid={IsErrors}
                        errorBorderColor='red.300'
                        {...register("developer")}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Desenvolvedor' />

                    <Input
                        required
                        isDisabled={isLoading}
                        isInvalid={IsErrors}
                        errorBorderColor='red.300'
                        {...register("publisher")}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Distribuidor' />

                    <Input
                        required
                        isDisabled={isLoading}
                        isInvalid={IsErrors}
                        errorBorderColor='red.300'
                        {...register("languages")}
                        type='text' className='input'
                        size="lg" variant='outline'
                        placeholder='Linguagens' />

                    <Input

                        required {...register("releaseDate")}
                        isDisabled={load}
                        onFocus={() => {
                            if (!isDate) {
                                setDate(true)
                            }
                        }}
                        type={isDate ? 'date' : 'text'} className='input'
                        min={'1900-01-01'} max={'2200-12-31'}
                        size="lg" variant='outline'
                        placeholder='Data de lançamento' />


                    <Button
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        type='submit'
                        className='button'
                        onClick={() => {
                            return formRef.current.reportValidity()
                        }}
                        colorScheme='blue'
                        alt="Cadastrar">Cadastrar</Button>
                </div>
            </form>
            {/* </Wrap> */}
        </StyCreateGame>
    )
}

export default CreateGame