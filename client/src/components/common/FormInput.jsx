import React from 'react'
import {AiOutlineEyeInvisible ,AiOutlineEye} from 'react-icons/ai'
const FormInput = ({ label, name, type  , value, onChange,isLogin,showPassword,setShowPassword }) => {
  return (
    <div className="mb-4">
    
      <label htmlFor={name} className="block relative   text-gray-700 text-sm font-bold mb-2">
        <p> {label} </p>

        <input
            required
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={`shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline    `}
        />
         {
            name === 'password'   && (
            <span
              
              onClick={() => setShowPassword((prev)=>!prev)}
             className='absolute right-2 top-6   '
            >
              {!showPassword ? <AiOutlineEye fontSize={24}/> : <AiOutlineEyeInvisible fontSize={24}/>}
            </span>
        )
         }


      </label>
    
    </div>
  )
}

export default FormInput