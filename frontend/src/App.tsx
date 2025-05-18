
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'
import TestPage from './pages/Utility/TestPage'
import  AdsAdd  from './pages/Ad/AdsAdd'
import ShowAds from './pages/Ad/ShowAds'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import PrivateRoute from './components/PrivateRoute'
import MessagePage from './pages/Message/MessagePage'
import SingleAd from './pages/Ad/SingleAd'
import RegisterPage from './pages/Auth/RegisterPage'
import HomePage from './pages/Utility/HomePage'
import FavoriteAd from './pages/Ad/FavoriteAd'
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
          <Route path="ads/:id" element={<SingleAd />} />
          <Route path="/ads/add" element={
            <PrivateRoute>
              <AdsAdd />
            </PrivateRoute>
          }></Route>
        <Route path='/messages' element={<PrivateRoute><MessagePage/></PrivateRoute>}></Route>
          <Route path="/favorites" element={
            <PrivateRoute>
              <FavoriteAd />
            </PrivateRoute>
          }></Route>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
