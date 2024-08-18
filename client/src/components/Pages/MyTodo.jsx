import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
 
import { setEditTodo, setTodo } from "../../slices/todoSlice"
import toast from "react-hot-toast"
import NoteModal from "../common/Modal/NoteModal"
import { fetchUserTodoDetails } from "../../services/operation/todoAPI"
 

 
 
 

export default function MyTodo() {
  const dispatch = useDispatch()
   
  const { todo } = useSelector((state) => state.todo)

  const {todoId}=useParams()
//   console.log("todoId: ",todoId)


  // console.log("Edit Course", course)

  const [loading, setLoading] = useState(false)
  // const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    (async () => {
      setLoading(true)
     try {
      const result = await fetchUserTodoDetails(todoId)
      
      // console.log("Edit Course result", result)
      if (result) {
        dispatch(setEditTodo(true))
        // console.log("Dispatching setCourse with", result.data.courseDetails) // Debug log
        dispatch(setTodo(result?.data?.todoDetails))
      }


     } catch (error) {
      // console.log("Error fetching course details", error) // Log any errors
      toast.error("Error fetching course details in try catch block")
     }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoId,dispatch])
  

  if (loading) {
    return (
      <div  >
        <div  ></div>
      </div>
    )
  }

  return (
    <div >
      <h1  >
        Edit Course
      </h1>
      <div className="absolute top-0 left-0" >
        {todo ? (
          <NoteModal/>
        ) : (
          <p  >
           
          <p>Todo not found</p>
          </p>
        )}
      </div>
    </div>
  )
}
