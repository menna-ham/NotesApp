import React, { useState } from 'react'
import styles from './Register.module.css'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import joi from 'joi';

export default function Register() {
  let [User,setUser]=useState({
    'first_name':'',
    'last_name':'',
    'email':'',
    'password':'',
    'age':''
  });

  let [email,setEmail]=useState('');
  let [first,setFirst]=useState('');
  let [last,setLast]=useState('');
  let [age,setAge]=useState('');
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
  let goToLogin =()=>{
    navigate('/login')
  }

  let validateUser=()=>{
    let schema = joi.object({
      first_name:joi.string().required().min(3).max(15),
      last_name:joi.string().required().min(3).max(15),
      email:joi.string().required().email({tlds:{allow:['com','net']}}), 
      password:joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/)),
      age:joi.number().required().min(14).max(60)
    })

    return schema.validate(User,{abortEarly:false});

  }
  let validEmail=(e)=>{
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
  let validFirst=(e)=>{
    let schema = joi.string().required().min(3).max(15);
    let res = schema.validate(e.target.value);
    if(res.error){
      setFirst(res.error.details[0].message.replace(`"value"`,'First Name'));
      console.log(res.error.details[0].message.replace(`"value"`,'First Name'));
      return first;
    }else{
      setFirst('');
      return first
    }
  }
  let validLast=(e)=>{
    let schema = joi.string().required().min(3).max(15);
    let res = schema.validate(e.target.value);
    if(res.error){
      setLast(res.error.details[0].message.replace(`"value"`,'Last Name'));
      return last;
    }else{
      setLast('');
      return last
    }
  }
  let validAge=(e)=>{
    let schema = joi.number().required().min(14).max(60);
    let res = schema.validate(e.target.value);
    if(res.error){
      setAge(res.error.details[0].message.replace(`"value"`,'Last Name'));
      return age;
    }else{
      setAge('');
      return age
    }
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


  let submitForm= async(e)=>{
    e.preventDefault()
    let valid = validateUser();

    if(valid.error){

      setValError(valid.error.details);
      console.log(valid);

    }else{

      setLoad(true);
      let {data} = await axios.post(`https://route-movies-api.vercel.app/signup`,User);
      
  
      if (data.message === 'success') 
      {
        goToLogin();
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
      {/* style={{backgroundImage: "linear-gradient(#e66465, #9198e5)" }} */}
      <div className={`container d-flex flex-column justify-content-center align-items-center ${styles.cont}`}>

        <div className={`row  w-100 mt-3 shadow-lg  ${styles.mainRow}`}>

          <motion.div  className={`col-md-6 px-0  ${styles.signupText}  ${styles.Layer} d-md-block d-lg-block d-sm-none`}
          initial={{ x:'50%' ,opacity:0.5}}
          animate={{x:'0%',opacity:1}}
          transition={{ duration:2}}
          >

            <div className={` h-100 p-5  d-flex flex-column justify-content-center align-items-center`}>
              <h1>
                Welcome Back !
              </h1>
              <p className='fs-5 text-center my-3'>To keep connected with us please login with your personal info</p>
              <div>
                <Link className={`${styles.signBtn} btn border-2 border-white text-white p-3 fs-5 rounded-pill`} to={'/login'}> Sign In</Link>
              </div>

            </div>

          </motion.div>


          <motion.div className={`col-md-6 px-0  ${styles.layer2}`}
           initial={{ x:'-50%' ,opacity:0.5}}
           animate={{x:'0%',opacity:1}}
           transition={{ duration:2}}
          >
            <div className={`${styles.signupForm}  p-3 d-flex flex-column justify-content-center align-items-between h-100`}>
              <h1 className='text-capitalize text-capitalize text-center my-3'>create account</h1>
              <div className='w-75 m-auto my-3'>



                <form onSubmit={(e)=>submitForm(e)}>

                <div className="form-floating mb-3">
                  <input type="text" onChange={(e)=>{getUserInfo(e); validFirst(e)}} name='first_name' className="form-control bg-transparent text-white" id="first_name" placeholder="name@example.com"/>
                  <label htmlFor="first_name">First Name</label>
                  {first!=''? <div className='text-danger small mt-1'>{first} </div>:''}
                </div>

                <div className="form-floating mb-3">
                  <input type="text" onChange={(e)=>{getUserInfo(e); validLast(e)}} name='last_name' className="form-control bg-transparent text-white" id="last_name" placeholder="name@example.com"/>
                  <label htmlFor="last_name">Last Name</label>
                  {last!=''? <div className='text-danger small mt-1'>{last} </div>:''}
                </div>

                <div className="form-floating mb-3">
                  <input type="number" onChange={(e)=>{getUserInfo(e); validAge(e)}} name='age' className="form-control bg-transparent text-white" id="age" placeholder="name@example.com"/>
                  <label htmlFor="age">Age</label>
                  {age!=''? <div className='text-danger small mt-1'>{age} </div>:''}
                </div>

                <div className="form-floating mb-3">
                  <input type="email" onChange={(e)=>{getUserInfo(e); validEmail(e)}} name='email' className="form-control bg-transparent text-white" id="email" placeholder="name@example.com"/>
                  <label htmlFor="email">Email</label>
                  {email!=''? <div className='text-danger small mt-1'>{email} </div>:''}
                </div>              

                <div className="form-floating mb-3">
                  <input type="password" onChange={(e)=>{getUserInfo(e); validPass(e)}} name='password' className="form-control bg-transparent text-white" id="password" placeholder="name@example.com"/>
                  <label htmlFor="password">Password</label>
                  {password!=''? <div className='text-danger small mt-1'>Password [8,10] contains [upper,lower,special char,number]</div>:''}
                </div>

                {
                  APIError!=''? 
                  <div className="text-danger small mt-1 d-flex align-items-center mt-3" role="alert">
                   {APIError}
                  </div>:''
                }
                {valError.length!=0? <div className='text-danger small'>{valError.map((m)=>m.message)}</div>:''}

                <div className=' d-flex justify-content-center'>
                <button className={` ${styles.signBtn} ${styles.singIN} btn text-white p-3 fs-5 rounded-pill ${load? ' disabled':''}`}> Sign Up </button>
                </div>


                </form>

              </div>


            </div>
          </motion.div>

        </div>

      </div>

    </>
  )
}
