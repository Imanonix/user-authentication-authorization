import * as React from 'react'
import { useState, useEffect} from 'react'   
import { Link } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2'
import { login, reset } from "../redux/authSlice"
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useForm } from 'react-hook-form';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position:relative;
  `
const Form = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    width: 40%;
`
const Button = styled.button`
    width:100%;
    justify-content:center;
    margin: 2rem 0rem;
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
    margin: 2rem 0rem;
    border: none;
    border-bottom: 2px solid #a3a1a1;
`

const Span = styled.span`
  cursor:pointer; 
  position:absolute;
  top:47%; 
  right:30%;
`

interface Data {
    email: string 
    password: string 
}
const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { userInfo, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);
    const [show, setShow] = useState<boolean>(true)
    
    const { register, handleSubmit } = useForm<Data>()
    const onFormSubmit = (data: Data) => {
        try { 
            dispatch(login(data))
        } catch (error) {
            console.error('Error Login:', error);
        }
    }

    useEffect(() => {
        console.log("isError", isError)               //for register 
        if (isError) {
            Swal.fire({
                title: 'Login failed',
                text: 'please check your input data and try again',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            })
        }
        if (isSuccess) {
            console.log("userInfo in swal",userInfo)
            Swal.fire({
                title: 'Login successful',
                icon: 'success',
                text: 'you are loged in',
                timer: 2000,
                showConfirmButton: false,
            })
            navigate('/')
            dispatch(reset())
        }

    }, [userInfo, isLoading, isError, isSuccess, message, dispatch, navigate])

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onFormSubmit)}>
                <Input type="email" {...register("email")} placeholder="EMAIL"></Input>
                <Input  type={show ? "password" : "text"}  {...register("password")} placeholder="PASSWORD"></Input>
                <Span onClick={handleShow} style={{}}>{show ? <Eye /> : <EyeSlash />}</Span> 

                <Button> LOG IN</Button>
            </Form>
            <Link to='/register' style={{ textDecoration: "none" }}>
                Don't have an account? Register here
            </Link>
        </Container>  
    )  
}

export default Login;