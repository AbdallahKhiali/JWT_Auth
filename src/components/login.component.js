import React, { useState , useContext, Children, useEffect } from 'react'
import "../styles/login.css"
import  {   Form , Button   } from 'react-bootstrap'
import axios from 'axios'
import cookie from 'react-cookies'
import { userContext } from '../user.context'
import { Redirect } from 'react-router-dom'


function Login() {

    const { user, setuser } = useContext(userContext)

    const [loginForm, setloginForm] = useState({
        email:'',
        password:''
    })
    // const [loggedIn,setloggedIn]=useState(false)


    const handleInputChange = (e)=>{
        
        const {name,value}=e.target

        setloginForm({...loginForm,[name]:value})
    
    }

    const logout=()=>{
        axios.get('http://localhost:3001/logout',loginForm).
            then(res=>{
                localStorage.setItem('user',null);
                window.location.reload()
            })
    }
    const login= async (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/login",loginForm).then(res=>{
                localStorage.setItem('user', JSON.stringify(res.data.user));
                console.log(res.data)
                localStorage.setItem('token', JSON.stringify(res.data.token));
                window.location.replace('/');
        })
    }

    useEffect(() => {
    }, [user])
    return (
        <div className="page center">
            {
                // console.log(loginForm)
            }
            <Form className='formulaire' onSubmit={login}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"  name="email" value={loginForm.email} onChange={handleInputChange} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={loginForm.password} onChange={handleInputChange}  placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
            </Form>

        </div>
    )
}

export default Login
