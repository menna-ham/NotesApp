import React, { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link,useNavigate } from 'react-router-dom'
import styles from '../Register/Register.module.css'
import { useState } from 'react';
import joi from 'joi'
import axios from 'axios';
import { UserDataContext } from '../../Context/LoginDataContext';


export default function Login() {
  let {getUserDataToken} = useContext(UserDataContext);

  let [User,setUser]=useState({
    'email':'',
    'password':'',
  });

  let [email,setEmail]=useState('');
  let [password,setPassword]=useState('');
  let [APIError,setAPIError]=useState('');
  let [valError,setValError]=useState([]);
  let [load,setLoad]=useState(false);


  let navigate = useNavigate();

  
  let getUserInfo=(e)=>{
    let myuser= {...User}
    myuser[e.target.name]= e.target.value;
    setUser(myuser)    
  }
  let goToNotes =()=>{
    navigate('/')
  }

  let validateUser=()=>{
    let schema = joi.object({
      email:joi.string().required().email({tlds:{allow:['com','net']}}), 
      password:joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/))
    })

    return schema.validate(User,{abortEarly:false});

  }
  let validPass=(e)=>{
    let schema = joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/));
    let res = schema.validate(e.target.value);
    if(res.error){
      setPassword(res.error.details[0].message.replace(`"value"`,'Password'));
      return password;
    }else{
      setPassword('');
      return password;
    }
  }
  let validEmail=(e)=>{
    console.log(e.target.value);
    let schema = joi.string().required().email({tlds:{allow:['com','net']}})
    let res = schema.validate(e.target.value);
          if(res.error){
              setEmail(res.error.details[0].message.replace(`"value"`,'Email'))
              return email;
            }else{
              setEmail('')
              return email;
            }
  }


  let submitForm= async(e)=>{
    e.preventDefault()
    let valid = validateUser();

    if(valid.error){

      setValError(valid.error.details);
      console.log(valid);

    }else{

      setLoad(true);
      let {data} = await axios.post(`https://route-movies-api.vercel.app/signin`,User);
      
  
      if (data.message === 'success') 
      {
        goToNotes();
        localStorage.setItem('NotesToken',data.token);
        getUserDataToken();
        setLoad(false);

      } 
      else {
        setAPIError(data.message)
        setLoad(false);
      }

    }


  }


  return (
    <>
      
      <div className={`container d-flex flex-column justify-content-center align-items-center ${styles.cont}`}>

        <div className={`row  w-100  shadow-lg  ${styles.mainRow}`}>


          <motion.div className={`col-md-6 px-0 ${styles.layer2}`}
            initial={{ x: '50%', opacity:0.5 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className="signupForm  p-3 d-flex flex-column justify-content-center align-items-between  h-100 ">
              <h1 className='text-capitalize text-capitalize text-center my-3'>Sign in</h1>
              <div className='w-75 m-auto my-3'>
                <form onSubmit={(e)=>submitForm(e)}>

                  <div className="form-floating mb-3">
                    <input type="email" name='email' onChange={(e)=>{getUserInfo(e); validEmail(e)}} className="form-control bg-transparent" id="email" placeholder="name@example.com" />
                    <label htmlFor="email">Email</label>
                    {email!=''? <div className='text-danger small mt-1'>{email} </div>:''}
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" name='password' onChange={(e)=>{getUserInfo(e); validPass(e)}} className="form-control bg-transparent" id="password" placeholder="name@example.com" />
                    <label htmlFor="password">Password</label>
                    {password!=''? <div className='text-danger small mt-1'>Password [8,10] contains [upper,lower,special char,number] </div>:''}
                  </div>
                  <div className='d-flex justify-content-center my-3'>
                    <a href='#' className='text-muted text-decoration-none fs-6'>Forgot your password ?</a>
                  </div>

                  {
                  APIError!=''? 
                  <div className="text-danger small mt-1 d-flex align-items-center mt-3" role="alert">
                   {APIError}
                  </div>:''
                  }
                  {valError.length!=0? valError.map((m)=><div className='text-danger small my-1'>{m.message}</div>):''}

                  <div className=' d-flex justify-content-center'>
                    <button className={` ${styles.signBtn} ${styles.singIN} btn text-white p-3 fs-5 rounded-pill ${load? ' disabled':''}`}> Sign In </button>
                  </div>


                </form>
              </div>


            </div>
          </motion.div>

          
          <motion.div className={`col-md-6  ${styles.Layer}`}
            initial={{ x: '-50%' ,opacity:0.5}}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 2 }}
          >

            <div className="signupText h-100 p-5  d-flex flex-column justify-content-center align-items-center">
              <h1>
              Hello, Friend!
              </h1>
              <p className='fs-5 text-center my-3'>Enter your personal details and start journey with us</p>

              <div>
                <Link className={`${styles.signBtn} btn border-2 border-white text-white p-3 fs-5 rounded-pill`} to={'/register'}> Sign Up</Link>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </>
  )
}
