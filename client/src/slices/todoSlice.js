import { createSlice } from "@reduxjs/toolkit"

const initialState={
    
    todo:null,
    editTodo:false,
    // savedSections: [], // To store the sections and subsections when needed

}


const todoSlice=createSlice({
    name:"todo",
    initialState,

    reducers:{
        
        setTodo:(state,action)=>{
            state.todo=action.payload
        },
        setEditTodo:(state,action)=>{
            state.editTodo=action.payload
        },
        
        resetTodoState:(state,action)=>{
             
            state.todo=null
            state.editTodo=false
        }
    }

})


export const {
    setTodo,
    setEditTodo,
    resetTodoState,
     
}=todoSlice.actions

export default todoSlice.reducer