import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';
const Login = () => {
    const auth = getAuth(app)
    const [errorMassage, setErrorMassage] = useState('')
    const [success, setSuccess] = useState('')

    // get email input field value by using usrRef hooks form react router 
    const emailRef = useRef(null)

    // login handler 
    const handleLogin = (e) => {
        e.preventDefault()
        setErrorMassage('')
        setSuccess('')
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)
        // sign in with email and pass 
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
               if(result.user.emailVerified){   
              setSuccess('successfully login')
              console.log(result.user)
               }
               else{
                alert('please verify your email')
               }
            })
            .catch(error => {
                setErrorMassage(error.message)
                console.log(error.message)
            })
    }

    //  forget password with email 
    const handleForget = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const forgetEmail = emailRef.current.value
        console.log(forgetEmail)
        if (!emailRegex.test(forgetEmail)) {
            alert('please provide a valid email ')
            console.log(emailRef, 'email not valid')
            return
        }
        sendPasswordResetEmail(auth, forgetEmail)
            .then(() => {
                alert('Password reset email sent code!')
                console.log('Password reset email sent!')
            })
            .catch(error => console.group(error.message))
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                name='email'
                                placeholder="email"
                                //  props by useRef hooks
                                ref={emailRef}
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <div className='flex gap-2'>
                                    <a onClick={handleForget} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    <small><Link to={'/register'} className='underline underline-offset-1 mx-1'>Register</Link></small>
                                </div>

                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {
                            errorMassage && <p>{errorMassage}</p>
                        }
                        {
                            success && <p>{success}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;






// input password show and hide function ----
/**/
// const [show,setShow]=useState(false)

{/* <h2 className="text-3xl">Login</h2>
<input className='border border-green-500'

type={show ? 'text' : 'password'} name="password" id="" required/>
<button><span onClick={()=>setShow(!show)}>
    {show ? "close" :"see"}
    </span></button> */}