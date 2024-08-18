import React, { useEffect, useRef, useState } from "react";
import NoteSearch from "./NoteSearch ";
import { IoPersonOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../slices/authSlice";
import {
  deleteTodoData,
  fetchUserTodo,
} from "../../../services/operation/todoAPI";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
import { logout } from "../../../services/operation/authAPI";

const Note = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const maxLength = 10;

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show]); 

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchUserTodo(token);
      // console.log("result of get todo ", result);
      if (result) {
        setTodos(result);
      }
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (todoId) => {
    setLoading(true);

    await deleteTodoData({ todoId: todoId, userId: userId }, token);

    const result = await fetchUserTodo(token);

    // console.log(result);

    if (result) {
      setTodos(result);
      navigate("/note");
      // toast.success("Todos deleted successfully");
    }
    setLoading(false);
  };

  const truncateText = (text, maxLength) => {
    // console.log(text);
    if (!text) return "";
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
    // console.log("Truncated text:", truncated);
  };

  // Function to generate a random color
const getRandomColor = () => {
   // Define the range for light colors (e.g., values between 200 and 255)
   const min = 200;
   const max = 255;
 
   // Generate random RGB values within the specified range
   const r = Math.floor(Math.random() * (max - min + 1)) + min;
   const g = Math.floor(Math.random() * (max - min + 1)) + min;
   const b = Math.floor(Math.random() * (max - min + 1)) + min;
 
   return `rgb(${r}, ${g}, ${b})`;
};

  // Filter todos based on search query
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.content.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <div className="h-[100vh] border    w-[100vw]  flex flex-col justify-center items-center group">
        <div className="flex justify-evenly gap-8  items-center w-full  z-50 bg-slate-800 py-6  sticky top-0">
          <RxHamburgerMenu
          
            onClick={() => setShow((prev) => !prev)}
            fontSize={40}
            className="border ml-6 h-8 bg-slate-300 text-slate-900 rounded-md  px-1 text-[4rem]  "
          />

          {
            <div
              ref={menuRef}
              className={`w-[70vw] h-[30rem] rounded-br-lg absolute top-0 left-[0rem]  bg-slate-300 z-50  transition-transform ease-in-out duration-300 ${
                show
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <p
                onClick={() => setShow((prev) => !prev)}
                className="absolute top-4 left-5 text-[2rem] text-black"
              >
                <RxCross1 />
              </p>

              <div className="flex justify-center items-center gap-5 text-[2rem] mt-10 text-black">
                <ul>
                  <Link to="/" >Profile</Link>
                  <li>Archive</li>
                  <li
                    onClick={() => dispatch(logout(navigate))}
                    className="bg-slate-600 text-white px-4 rounded-lg my-4"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          }

          {/* <NoteSearch /> */}
          <input
            type="text"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="  w-full py-3 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-3xl"
          />

          {/* <IoPersonOutline className="mr-5 bg-slate-300 border rounded-full  px-2 text-[3rem]" /> */}
          <div onClick={() => navigate("/noteModal")}>
            <IoIosAddCircleOutline className="text-[3rem] text-white " />
          </div>
        </div>

       

        <div  className=" bg-slate-800 h-[100vh] w-full overflow-y-scroll flex flex-col  mx-auto  py-10  items-center gap-6    ">
          {filteredTodos?.length === 0 ? (
            <h1 className="text-white">No todo </h1>
          ) : (
            filteredTodos?.map((todo) => {
              const backgroundColor = getRandomColor(); // Generate random color for each todo
              return (
                <div key={todo._id}  className="relative w-[100vw] ">
                <div
                  onClick={() => navigate(`/edit-Todo/${todo._id}`)}
                  style={{ backgroundColor }}
                  className="w-[80%] h-[6rem]  flex flex-col   mx-auto border-none bg-slate-200   rounded-2xl border-slate-300   "
                >
                  <h1 className="ml-7 mt-4"> {todo?.title} </h1>
                  <p className="ml-7">
                    {" "}
                    {truncateText(todo?.content, maxLength)}{" "}
                  </p>
                </div>

                <div className="flex flex-row gap-3 absolute  bottom-3 right-[5rem] z-40">
                  <FaRegEdit
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-Todo/${todo._id}`);
                    }}
                    className="text-3xl"
                  />

                  <div
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this Todo?",
                        text2: "All the data Of Todo  will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDelete(todo._id) && setConfirmationModal(null), //
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                    className="text-3xl  "
                  >
                    <MdDeleteOutline />
                  </div>
                </div>
              </div>
              )
            })
          )}
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Note;
