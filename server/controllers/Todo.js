// const { default: mongoose } = require("mongoose")
const Todo = require("../models/Todo")
const User = require("../models/User")


exports.createTodo=async(req,res)=>{
    try {
        const userId=req.user.id

        // console.log("userId: " , userId)

        const {title,content}=req.body
        // console.log("req.body: " , req.body)
        // if(!title || !content || !userId){
        //     return res.status(400).json({
        //         success: false,
        //         message: "All Fields are Mandatory",
        //       })
        // }

        const userDetails=await User.findById(userId)


        const newTodo=await Todo.create({
            title :title ,
            content :content ,
            userTodo: userId,
            
        })

        await User.findByIdAndUpdate(
            {
                _id:userDetails.id,
            },
            {
                $push: {
                    todos: newTodo._id,
                },
            },
            {new:true}
        )

        res.status(200).json({
            success: true,
            data: newTodo,
            message: "Course Created Successfully",
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to create todo",
          error: error.message,
        })
    }
}


exports.updateTodo=async(req,res)=>{
    try {
        const {todoId}=req.body;
        const updates = { ...req.body };
        //   delete updates.todoId;

        // console.log(" req bidy",req.body)

        const todo=await Todo.findById(todoId)
        // console.log("todo",todo)

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
              })
        }


         // Update only the fields that are present in the request body
    // for (const key in updates) {
    //     if (updates.hasOwnProperty(key)) {
    //         todo[key] = updates[key]
    //     }
    //   }

    
    //   Filter out undefined fields
    Object.keys(updates).forEach(key => {
        if (updates[key] === undefined || updates[key] === null) {
            delete updates[key];
        }
    });
    
    // Update the todo with the filtered fields
    Object.assign(todo, updates);

    
    await todo.save()

      const updatedTodo=await Todo.findOne({_id:todoId})

      res.json({
        success: true,
        data: updatedTodo,
        message: "Todo updated successfully",
      })




    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "error in updating todo",
          error: error.message,
        })
    }
}


exports.deleteTodo=async(req,res)=>{
    try {

      
        const {todoId,userId}=req.body
        // console.log("req.body of  todo delete",todoId)
        // console.log(todoId)
        const todo=await Todo.findById(todoId)
        // console.log(todo)
        // const userId=await Todo.findById({userTodo:userId})
        // console.log("user id from todo",userId)

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
              })
        }


        await Todo.findByIdAndDelete(todoId)

      const updatedUser=  await User.findByIdAndUpdate(
        //  {
        //     _id:userId,
        //  },
        userId,
            {
                $pull: {
                    todos: todoId,
                },
            },
            {new:true}
        )
        // console.log("updatedUser: ", updatedUser)
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found or todoId not found in user's todos array",
            });
        }

        res.json({
            success: true,
            message: "Todo deleted successfully",
        })
    } catch (error) {
        
        // console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to delete todo",
          error: error.message,
        })
    }
}



exports.fetchUserTodo=async(req,res)=>{
    try {
        const userId=req.user?.id || req.user?._id;
        // console.log("req.user: ",userId);
 

        const getUserTodo=await Todo.find({userTodo:userId}).sort({createdAt:-1})
        // console.log("getUserTodo:", getUserTodo); 

        if(!getUserTodo || getUserTodo.length===0){
            return res.status(404).json({
                success: false,
                message: "No Todo found for this user",
              })
        }


        res.json({
            success: true,
            data: getUserTodo,
            message: "Fetched Todos Successfully",
        })


    } catch (error) {
        
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to fetch Todos",
          error: error.message,
        })
    }
}

exports.fetchTodoDetails=async(req,res)=>{
    try {
        const { todoId } = req.query
        console.log("todo id of todoDetails : ",req.query)

        const todoDetails = await Todo.findOne({_id:todoId})

        if (!todoDetails) {
            return res.status(400).json({
              success: false,
              message: `todo not find todo with id: ${todoId}`,
            })
          }

          console.log("course details",todoDetails )


          return res.status(200).json({
            success: true,
            data: {
              todoDetails,
              
            },
          })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}