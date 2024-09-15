import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateCurrentUser, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {

    const auth = getAuth(app)
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (e) => {
        // error catch and reset error
        setRegisterError('')
        setSuccess('')
        e.preventDefault()
        const name=e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const tramsAndCondition=e.target.trams.checked

        console.log(email,password,tramsAndCondition)

        // password validation checker 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return setRegisterError('password must be use 8 characters one uppercase and numbers')
        }
        // checkbox validation 
        else if(!tramsAndCondition){
            return setRegisterError('please accept our conditions')
        }
        //  create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                setSuccess('successfully completed ')
                console.log(user)

                // update user name before email verification ,
                updateProfile(user,{
                    displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=>console.log('updated profile'))
                .catch(error=>console.log(error))
                // send verification email
                sendEmailVerification(user)
                .then(()=>{
                    alert('Please check your email and verify Account')
                })
            })

            .catch(error => {
                setRegisterError(error.message)
                console.log(error)
            })
    }

    return (
        <div>
            <h3 className="text-3xl">Register</h3>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required />
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                <small> Already have an account please<Link to={'/login'} className='underline underline-offset-1 mx-2'>Login</Link></small>
                                </label>
                            </div>

                            <div className=' justify-start items-start flex'>
                                {/* trams and condition checkbox  */}
                                <input  type="checkbox" name="trams" id="trams" />
                                <label className='-mt-2 mx-3' htmlFor="trams"><a href="">trams and condition</a></label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>

                        </form>
                        {
                            registerError && <p className='text-red-600'>{registerError}</p>
                        }
                        {
                            success && <p className='text-green-600'>{success}</p>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;