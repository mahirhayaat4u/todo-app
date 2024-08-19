 
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './components/HeroPage/Hero';
import Login from './components/Login/Login';
import Note from './components/common/Note/Note';
import NoteModal from './components/common/Modal/NoteModal';
import MyTodo from './components/Pages/MyTodo';
// import EditTodo from './components/Pages/EditTodo';
 

function App() {
  return (
    <div className='  h-[100vh]  flex justify-center items-center'>
       
       <Routes>
           <Route path='/' element={<Hero/>}/>
           <Route path='/loginUserRoute' element={<Login/>}/>
           <Route path='/note' element={<Note/>}/>
           <Route path='/noteModal' element={<NoteModal/>}/>
           <Route path='/myTodo' element={<MyTodo/>}/>
           <Route path='/edit-Todo/:todoId' element={<MyTodo/>}/>
       </Routes>
    </div>
  );
}

export default App;
