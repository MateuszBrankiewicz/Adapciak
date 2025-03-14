
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
function App() {
  
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
      
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
