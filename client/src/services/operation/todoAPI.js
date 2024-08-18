import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"

export const createTodoList = async(data,token,navigate) =>{
    let result=null
    // console.log("data and token in create todo",data,token)
    const toastId=toast.loading("Loading...")

    try {
        const response=await apiConnector("POST","/createTodo",data,{
            
            Authorization: `Bearer ${token}`,
        })
        

        console.log("create todo api response",response)
        // if (!response?.data?.success) {
        //     throw new Error("Could Not Add todo Details")
        //   }
          toast.success("todo Details Added Successfully")
          result = response?.data?.data
          navigate("/note")
    } catch (error) {
        // console.log("CREATE todo API ERROR............", error)
      // toast.error(error.message)
      
        toast.error("You have not created Todo ,Try again")
         
      
    }
    toast.dismiss(toastId)
    return result
}


export const fetchUserTodo=async(token)=>{
    let result=[]
    // console.log("token in fetch user todo",token)
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("GET","/getUserTodos",null,{
             Authorization: `Bearer ${token}`,
        })

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch todo")
          }
            // toast.success("Todos Fetched Successfully")
  
          result = response?.data?.data
    } catch (error) {
        console.log("get user todo API ERROR............", error)
            //  toast.error(error.message)
          
    }

    toast.dismiss(toastId)
    return result
}


export const updateTodoData=async(data,token,navigate)=>{
    let result = null
    // console.log("updateTodoData in API: ",data)
    const toastId = toast.loading("Loading...")
    try {
      const jsonData = {
        todoId: data.get("todoId"),
        title: data.get("title"),
        content: data.get("content"),
      };
      const response = await apiConnector("PUT", "/updateTodo", jsonData, {
     
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT todo API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update todo Details")
      }
      // toast.success("todo Details Updated Successfully")
      result = response?.data?.data
      navigate("/note")
    } catch (error) {
      console.log("EDIT todo API ERROR............", error)
      toast.error("error updating")
    }
    toast.dismiss(toastId)
    return result
}

export const deleteTodoData=async(data,token)=>{
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", "/deleteTodo", data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE todo API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete todo")
      }
      toast.success("todo Deleted")
    } catch (error) {
      console.log("DELETE todo API ERROR............", error)
      // toast.error(error.message)
    }
    toast.dismiss(toastId)
}


export const fetchUserTodoDetails = async (todoId) => {
  const toastId = toast.loading("Loading...")
    //  console.log("fetchcoursedetails api in : ",courseId)
  let result = null
  try {
    const response = await apiConnector("GET", "/todoDetails", null, null, { todoId })
    console.log("fetchTodoDetails API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log(" fetchTodoDetails API ERROR............", error)
    result = error.response.data
    toast.error("error fetching todo details");
  }
  toast.dismiss(toastId)
    
  return result
}