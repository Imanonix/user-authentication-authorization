
const API_Login:string = process.env.REACT_APP_LOGIN
const API_Register:string = process.env.REACT_APP_REGISTER
const API_Logout:string = process.env.REACT_APP_LOGOUT

interface userInfoLogin {
    email: string
    password: string
}

interface userInfoRegister {
    email: string
    password: string
    repassword: string
    username: string
}

const loginForm = async (userData:userInfoLogin) => {
    const response = await fetch(`${API_Login}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' },
        credentials: 'include', 
        body:JSON.stringify(userData),
    })

    if (response.ok){
        const data = await response.json();
        return data
    }

    if (!response.ok) {
        throw new Error('Failed to login. Please check your credentials.');
      } 
}

const logoutForm = async () =>{
    const response = await fetch(`${API_Logout}`, {
        method: 'GET',
        headers :{
            'Content-Type': 'application/json'},
    })
    if (response.ok){
        const data = await response.json();
        return data
    }
    if (!response.ok) {
        throw new Error('Failed to Logout. Please try it later.');
      } 
}

const registerForm = async (userData:userInfoRegister) => {
    const response = await fetch(`${API_Register}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' },
        body:JSON.stringify(userData),
    })
    if (response.ok){
        const data = await response.json();
        return data
    }
    if (!response.ok) {
        throw new Error('Failed to register. Please check your credentials.');
      }
}


const authService ={
    loginForm,
    logoutForm,
    registerForm
}

export default authService