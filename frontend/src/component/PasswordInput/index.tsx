import { 
    Button,  
    Input, 
    InputGroup, 
    InputRightElement } from "@chakra-ui/react"
  import {ViewIcon,ViewOffIcon} from '@chakra-ui/icons'
  import {  useState } from "react"
  import { FieldValues, UseFormRegister } from "react-hook-form/dist/types"
  import React from "react"
  
  
  
  interface IProp{
      id?:string
      ref?:React.MutableRefObject<typeof React.Component>
      placeholder?:string
      size?:string
      className?: string
      required?: boolean | undefined
      register?: UseFormRegister<FieldValues>
      onChange?: any
      isInvalid?: boolean 
      isDisabled?:boolean
      errorBorderColor?:string
  } 
  
  export function PasswordInput(prop:IProp) {
  
      const [show, setShow] = useState(false)
      const handleClick = () => setShow(!show)
      const {size,placeholder} = prop
      const rest = prop.register ?prop.register("password") : {}
      return (
        <InputGroup className={prop.className} size={size?size:'md'}>
          <Input
            isInvalid={prop.isInvalid}
            {...rest}
            onChange={prop.onChange}
            id={prop.id}
            name={"password"}
            pr='4.5rem'
            errorBorderColor={prop.errorBorderColor}
            isDisabled={prop.isDisabled}
            type={show ? 'text' : 'password'}
            placeholder= {placeholder?placeholder:'Enter password'}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ?  <ViewIcon />: <ViewOffIcon /> }
            </Button>
          </InputRightElement>
        </InputGroup>
      )
    }