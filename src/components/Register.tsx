import * as React from 'react'
import { useState, useEffect } from 'react'
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from "../redux/store"
import { reset, registerForm } from '../redux/authSlice'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`
const Error = styled.div`
    color:#ec0909;
    font-size: small;
    height: 30px;
`

const Button = styled.button`
    width:100%;
    margin: 1rem 0rem;
    background-color:#B61627;
    color:white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    border:none;
    font-weight:700;
    &:hover {
    background-color:black;
    color:white;
    }
`
const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin: 1.5rem 0rem;
    border: none;
    border-bottom: 2px solid #a3a1a1;
`
const Form = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    width: 40%;
`
const Span = styled.span`
    cursor:pointer; 
    position:absolute;
    top:47%; 
    right:30%;
`
interface IData {
    email: string | null
    password: string | null
    repassword: string | null
    username: string | null
}


const Register= () => {
  const dispatch = useAppDispatch();
 
  const { userInfo, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);
  const [show, setShow] = useState<boolean>(true);

  const schema = z.object({
    email: z.string()
    .email('email form is not valid'),
    password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
    repassword: z.string(),
    username: z.string()
    .min(4,'Username must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords don't match",
    path: ["repassword"],
});

  type SchemaType = z.infer<typeof schema>;
  const {register, handleSubmit, formState:{errors}} = useForm<SchemaType>({resolver : zodResolver(schema)});

  const onFormSubmit = (data:IData) =>{
      try {
        dispatch(registerForm(data))
      } catch (error) {
       console.error('Error Registering:', error);
      }
  }

  useEffect(()=>{ 
    if (isError){
      Swal.fire({
            title: 'Register failed',
            text: 'please check your input data and try again',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
                    })};
    if (isSuccess){

      console.log(isSuccess)
      Swal.fire({
        
             title: 'Register successful',
             icon: 'success',
             timer: 2000,
             showConfirmButton: false,
             })
      dispatch(reset())
    }
    
  },[userInfo, isLoading, isError, isSuccess, message, dispatch])


  const handleShow =() =>{
    setShow(!show)
  }

  return (
    <Container>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Section style={{width:"100%"}}>
                <Input type="email" placeholder='youremail@gmail.com'  {...register("email")}></Input>
                {errors.email &&<Error >{errors.email.message}</Error>}
            </Section>
            <Section style={{position:"relative", width:"100%"}}>
                <Input type={show? "password": "text"} placeholder='password' {...register("password")}></Input>
                <Span onClick={handleShow} style={{ top:"35%", right:"0%"}}>{show ? <Eye /> : <EyeSlash />}</Span> 
            </Section>
            {errors.password &&<Error >{errors.password.message}</Error>}

            <Section style={{position:"relative", width:"100%"}}>
                <Input type={show? "password": "text"} placeholder='confirm password' {...register("repassword")}></Input>
                <Span onClick={handleShow} style={{ top:"35%", right:"0%"}}>{show ? <Eye /> : <EyeSlash />}</Span> 
            </Section>
            {errors.repassword &&<Error className='error'>{errors.repassword.message}</Error>}

            <Section style={{width:"100%"}}>
                <Input type="text" placeholder='username' {...register("username")}></Input>
                {errors.username &&<Error >{errors.username.message}</Error>}
            </Section>
            <Section style={{width:"100%"}}>
                <Button >REGISTER</Button>
            </Section>
          </Form>
    </Container>
  )
}

export default Register