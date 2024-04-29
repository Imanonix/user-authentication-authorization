import * as  React from 'react'
import { useEffect } from 'react';
import styled  from 'styled-components'
import { useAppDispatch, useAppSelector } from '../redux/store';
import {  reset, logout } from "../redux/authSlice"
import  Swal  from 'sweetalert2'


const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-height:100vh;
` 
const Link = styled.a`
    width:10%;
    text-align:center;
    margin: 2rem 0rem;
    background-color:#B61627;
    color:white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    border:none;
    font-weight:700;
    text-decoration:none;
    cursor: pointer;
    &:hover {
        background-color:black;
        color:white;
    }
`

interface userRespons{
    isLogedIn: boolean
    userName: string
}
const Home = () =>{
    const dispatch = useAppDispatch();

    const onLogout = () =>{
        try { 
            dispatch(logout())
        } catch (error) {
            console.error('Error Login:', error);
        }
    }
    const { userInfo, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);
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
                title: 'logout successful',
                icon: 'success',
                text: 'you are loged out',
                timer: 2000,
                showConfirmButton: false,
            })
            dispatch(reset())
        }

    }, [userInfo, isLoading, isError, isSuccess, message, dispatch])



    const result = useAppSelector(state => state.auth.userInfo)
    const { isLogedIn, userName } = result as userRespons|| {};
    return (
    <Container>
        <h1> Home Page</h1>
        {isLogedIn? <h2>{userName}</h2> : ""}
        {isLogedIn? <div onClick={onLogout}> LOGOUT </div>: <Link href='/login'>LOGIN</Link>}
        <Link href='/register'>REGISTER</Link>
    </Container>
)
}

export default Home;