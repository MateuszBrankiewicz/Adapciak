
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import TestPage from './pages/TestPage'
import  AdsAdd  from './pages/AdsAdd'
import ShowAds from './pages/ShowAds'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import PrivateRoute from './components/PrivateRoute'
function App() {
  
  return (
    <>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/testPage' element={<TestPage/>}></Route>
          <Route path="/" element={<HomePage />} />
        
          <Route path="/ads" element={<ShowAds />} />
         
          <Route path="/ads/add" element={
            <PrivateRoute>
              <AdsAdd />
            </PrivateRoute>
          }></Route>



        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
