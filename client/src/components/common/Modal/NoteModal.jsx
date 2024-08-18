import React, { useEffect, useRef, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../slices/authSlice";
import {
  createTodoList,
  updateTodoData,
} from "../../../services/operation/todoAPI";
import { setTodo } from "../../../slices/todoSlice";
// import toast from "react-hot-toast";
const NoteModal = () => {
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuRef = useRef(null);

  // const handCliCkOutside = (event) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     setShowMenu(false);
  //   }
  // };

  useEffect(() => {
    const handCliCkOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handCliCkOutside);
      return () => {
        document.removeEventListener("mousedown", handCliCkOutside);
      };
    }
  }, [showMenu]);

  const { token } = useSelector((state) => state.auth);

  const { editTodo, todo } = useSelector((state) => state.todo);
  // console.log("todo : ", todo);
  const { register, handleSubmit, setValue,reset, getValues } = useForm();

  useEffect(() => {
    if (editTodo) {
      setValue("title", todo.title);
      setValue("content", todo.content);
    }else{
      // Reset form when not in edit mode
      reset({
        title: '',
        content: '',
      });
    }

    //eslint-disable-next-line
  }, []);

  // const isFormUpdated = () => {
  //   const currentValues = getValues();

  //   if (
  //     currentValues.title !== todo?.title ||
  //     currentValues.content !== todo?.content
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  // console.log("isFormUpdated", isFormUpdated());

  const onSubmit = async (data) => {
    if (editTodo) {
      // if (isFormUpdated()) {
      const currentValues = getValues();
      const formData = new FormData();

      const updates = {
        todoId: todo._id,
        title: currentValues.title !== todo.title ? currentValues.title : null,
        content:
          currentValues.content !== todo.content ? currentValues.content : null,
      };

      for (const [key, value] of Object.entries(updates)) {
        if (value !== null) {
          formData.append(key, value);
        }
      }

      // formData.append("todoId", todo._id);

      // if (currentValues.title !== todo.title) {
      //   formData.append("title", currentValues.title);
      // }
      // if (currentValues.content !== todo.content) {
      //   formData.append("content", currentValues.content);
      // }

      // console.log("data ", data);
      // // console.log("formdata ", formData.title, formData.content);
      // console.log("formData title: ", formData.get("title"));
      // console.log("formData content: ", formData.get("content"));

      // setLoading(true);

      // const result = await updateTodoData(formData, token);
      // if (result) {
      //   dispatch(setTodo(result));
      //   console.log("updateTodoData in modal", result);
      // }
      // setLoading(false);
      setLoading(true);

      try {
        const result = await updateTodoData(formData, token, navigate);
        if (result) {
          dispatch(setTodo(result));
          // console.log("updateTodoData in modal", result);
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      } finally {
        setLoading(false); // This ensures loading is always set to false.
      }

      // }
    }
    else {
      const formData = {
        title: data.title,
        content: data.content,
      };

      // console.log("data title", data.title);
      // console.log("data content", data.content);
      // console.log("FormData", formData);

      setLoading(true);

      const result = await createTodoList(formData, token, navigate);

      if (result) {
        dispatch(setTodo(result));
      }

      setLoading(false);
    }
  };

  const handleClick = (e) => {
e.stopPropagation()
// console.log("Menu button clicked");
     setShowMenu((prev) => !prev)
  }

  return (
    <div  onClick={(e)=>e.stopPropagation()} className="fixed h-[100vh] border   bg-slate-800 w-[100vw]   grid place-items-center    ">
      <div className=" relative w-full h-full   ">
        <Link
          to="/note"
          className="text-black flex flex-row items-center gap-3   bg-slate-400 absolute top-4 px-2 py-2 rounded-xl left-6"
        >
          <span>
            <IoIosArrowRoundBack />
          </span>
          <p className="mr-2">Back</p>
        </Link>

        <div className="mt-8 ml-8 mr-8">
          <form className="mb-10" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="title"
              placeholder="title"
              {...register("title")}
              className="mt-[3rem] px-4  mr-[rem] bg-slate-800  text-[2rem] w-[90%] mx-auto  outline-none   text-slate-200"
            />

            <div className="w-[90%] h-[0.1rem] bg-slate-600"></div>

            <div>
              <textarea
                className="mt-[1rem] px-4 overflow-y-visible   mr-[2rem] bg-slate-800  text-[2rem] w-full mx-auto  outline-none   text-slate-200 h-[20rem]"
                id="content"
                placeholder="Add Todo..."
                {...register("content")}
              />
            </div>

            {editTodo && (
              <button
                type="button"
                onClick={() => navigate("/note")}
                className="text-[2rem] w-[30vw] mr-2 mx-auto px-2 py-2 mt-5 rounded-md text-slate-900 bg-red-200"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="text-[2rem] w-auto mx-auto px-4 py-2 mt-5 rounded-md text-slate-900 bg-yellow-200"
            >
              {editTodo ? "Save Changes" : "save"}
            </button>
          </form>
        </div>

        <div
          onClick={handleClick}
          className={`absolute top-9 z-70 right-10 text-[2rem] text-slate-300 transition-transform ease-in-out duration-300 ${
            showMenu ? "rotate-45" : ""
          }`}
        >
          {" "}
          <CgMenuGridO />{" "}
        </div>

        {
          <div
            ref={menuRef}
            className={`absolute bottom-0 flex flex-col rounded-tr-xl rounded-tl-xl justify-center items-start pl-10 gap-5 text-[1.5rem] w-full mx-auto text-white h-[15rem] bg-slate-600 transition-transform ease-in-out duration-300   ${
              showMenu ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <p className="flex items-center gap-4">
              {" "}
              <span className="text-3xl">
                <MdDeleteOutline />
              </span>{" "}
              Delete
            </p>
            <p className="flex items-center gap-4">
              {" "}
              <span className="text-3xl">
                <MdOutlineArchive />
              </span>
              Archive
            </p>
            <p className="flex items-center gap-4">
              {" "}
              <span className="text-3xl">
                <MdOutlineEdit />
              </span>
              Edit
            </p>

            <p className="flex items-center gap-4">
              <span className="text-3xl">
                <IoShareSocialOutline />
              </span>
              Share
            </p>
          </div>
        }
      </div>
    </div>
  );
};

export default NoteModal;
