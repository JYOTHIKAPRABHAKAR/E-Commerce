import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, password)
    axios.post('http://localhost:3005/register', {name, email, password})
    .then(response => {
        console.log(response.data)
        navigate('/login')
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

    return (
        <>
            <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
                <div className="bg-white p-3 rounded w-25">
                    <form className='' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor='name'> Name : </label>
                            <input onChange={(e)=>setName(e.target.value)} className="form-control rounded-0" id='name' autoComplete="off" type='text' name="name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor='email'> EMail : </label>
                            <input onChange={(e)=>setEmail(e.target.value)} className="form-control rounded-0" id='email' autoComplete="off" type='email' name="email"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor='pwd'> Password : </label>
                            <input onChange={(e)=>setPassword(e.target.value)} className="form-control rounded-0" id='pwd' autoComplete="off" type='password' name="password"/>
                        </div>
                        <button type="submit" className='btn btn-success w-100 rounded-0    '>Register</button>
                        <br />
                        <p>Already have an account?<Link to="/"> Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register