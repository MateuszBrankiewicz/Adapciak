
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import TestPage from './pages/TestPage'
function App() {
  
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/testPage' element={<TestPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
