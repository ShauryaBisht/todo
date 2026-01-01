
import './App.css'
import Navbar from './components/Navbar'
import Todos from './components/Todos'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signin from './components/Signin'



function App() {
  
  

  return (
     <div className="min-h-screen bg-background text-foreground">
      <Navbar  />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Todos />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
    </div>
  )
}

export default App
