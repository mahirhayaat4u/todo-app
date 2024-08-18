import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import toast from 'react-hot-toast'

export  function signup(name,email,password,setIsLogin){
    console.log("formdata in auth api ",name,email,password)
    return async(dispatch) => {
        const toastId=toast.loading("loading...");
        dispatch(setLoading(true))

        try {
            const response=await apiConnector('POST', "/signup",{
                name,
                email,
                password,
            })

            console.log("Signup API response : ",response)

            if(!response.data.success) {
                console.log("Signup failed:", response.data.message);
                throw new Error(response.data.message)
            }
            console.log("response",response.data.success)

            

             
             toast.success('Signup successful')
             console.log("Navigating to login page after successful signup");
              setIsLogin(true)



        } catch (error) {
            console.log("Error during signup:", error.message);
            toast.error('error while signup')
        }finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}


export  function login(email,password,navigate){

    console.log("formdata in login auth api ",email,password)
    return async(dispatch) => {
        const toastId=toast.loading("loading...");
        dispatch(setLoading(true))

        try {

            // toast.success("Successfully logged in")s
            
            const response=await apiConnector('POST',"/loginUser",{
                email,
                password
            })

            console.log("Login API response : ",response)
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            } 
            

            localStorage.setItem("token", JSON.stringify(response.data.user.token));
            localStorage.setItem("userId", JSON.stringify(response.data.user._id));


            toast.success('Login successful')
            console.log("navigate note page")
              navigate("/note")
            
        } catch (error) {
            
            console.log(error.message)
            toast.error('error while login')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    
    
    
    
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null));
      localStorage.removeItem("token");
      toast.success("Logged Out");
      navigate("/");
    };
  }