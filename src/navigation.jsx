import './navigation.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navigation() {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        }
    }, []);
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        navigate('/login');
    }
    return (
        <>
            <div className='nav-con'>
                {/* <Link to="/">Home</Link> */}
                {/* <Link to="/about">About</Link> */}
                {/* <Link to="/contact">Contact</Link> */}
                <h1 className='E-Commerce'>E-Commerce</h1>

                
                <div className='nav-links'>
                {!isAuth? (
                    <>
                    <Link to="/login" className='nav-link'>Login</Link>
                    <Link to="/register" className='nav-link'>Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/index" className='nav-link'>Home</Link>
                        <Link to="/quiz" className='nav-link'>Quiz</Link>
                        <button onClick={logout} className='btn btn-primary'>Logout</button>
                    </>
                )}
                </div>
            </div>
        </>
    )
}

export default Navigation