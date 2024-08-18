import React, { useState } from 'react'
import FormInput from '../common/FormInput'

 
import pattern from "../../assets/pattern-randomized.png"
import { useDispatch } from 'react-redux'
import { login, signup } from '../../services/operation/authAPI'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Login = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(true)
  
  const [formData, setFormData] = useState({
    name:"",
    email: '',
    password: ''
  })

  const handleToggle = () => {
    // Clear form fields when toggling between login and register
    setFormData({
     
      email: '',
      password: '',
    });
    setIsLogin(!isLogin);
  };

  const {name,email,password} = formData

  const handleOnChnage = (e) => {
    setFormData((prevData) =>( {
      ...prevData,
       [e.target.name]: e.target.value 
      }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login or register logic here
    // console.log(formData);

    if (isLogin) {
      dispatch(login(email,password,navigate))
      // toast.success("login dispatched successfully")
    }else{
      dispatch(signup(name,email,password,setIsLogin))
      // toast.success("signup dispatched successfully")
    }
    

    // setFormData({
    //   email: '',
    //   password: '',
    //   name: '',
    // })

   
  }

  return (
    <div
       className="h-screen overflow-y-hidden w-screen  bg-cover bg-center flex items-center"
       style={{ backgroundImage: `url(${pattern})` }}
    >
       
    <div  className={`flex flex-col gap-10 justify-center items-center border-2 border-slate-200 shadow-xl bg-slate-200 w-[80%] mx-auto h-auto py-5 my-auto transition-all duration-500 transform ${
      isLogin ? 'scale-100' : 'scale-105'
    }`}
    >

  
 
        <h1 className={`transition-all duration-500 transform ${isLogin ? 'opacity-100' : 'opacity-0'} ${!isLogin ? 'opacity-100 delay-300' : ''}`}>
        {
          isLogin?(
            <div>
              <h1 className='text-xl' >Wetcome Back !</h1>

            </div>
          ) : (
            <div>
              <h1 className='text-xl'>Create an account</h1>
            </div>
          )
    
        }
        </h1>

        <form onSubmit={handleSubmit}>
   
 
          {!isLogin && (
            <FormInput
              label="Enter Your Full Name"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleOnChnage}
              className="mb-4"
            />
            
          )}
       

           

       
            <FormInput
                label="Email Address"
                type='email'
                placeholder='Enter Email Address'
                name="email"
                value={email}
                onChange={handleOnChnage}
                isLogin={ isLogin }
              />

              <FormInput
                label="Password"
                type={showPassword ? 'password' : 'text '}
                placeholder='Enter password  '
                name="password"
                value={password}
                onChange={handleOnChnage}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                
              />
          
        
         
          <button type='submit'
           className="bg-blue-500 text-white py-2 px-4 rounded mt-4 transition-colors duration-300 hover:bg-blue-700"
          >
          {
            isLogin? 'Login' : 'Register'
          }
          </button>
          <div onClick={handleToggle} 
          className="cursor-pointer mt-4 text-blue-500 hover:underline"
          >
            {
              isLogin? 'Don\'t have an account? Sign up' : 'Already have an account? Login'
            }
          </div>
        </form>
    
    
    </div>

    </div>
    
  )
}

export default Login 