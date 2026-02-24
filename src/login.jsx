import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  //const [count, setCount] = useState(0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    axios.post('http://localhost:3005/login', {email, password})
    .then(response => {
        console.log(response.data)
        if(response.data.token){
            localStorage.setItem('token', response.data.token)
            navigate('/index')
        }else{
            alert("Invalid Credentials")
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className="bg-white p-3 rounded w-25">
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">Email : </label>
                    <input type="email" placeholder='Enter Email' name='email' autoComplete='off' className='form-control rounded-0' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password : </label>
                    <input type="password" placeholder='Enter Password' name='password' autoComplete='off' className='form-control rounded-0' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className='btn btn-success w-100 rounded-0'>Login</button>
            </form>
            <p>Don't have an account?<Link to="/register"> Register</Link></p>  
        </div>
    </div>
  )
}

export default Login
