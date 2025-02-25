
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeLayout from './components/layout/HomeLayout'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Candidates from './pages/Vote/Candidates'
import Results from './pages/Vote/Results'
import Profile from './pages/Vote/Profile'
import Voting from './pages/Vote/Voting'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/candidates' element={<Candidates />} />
          <Route path='/results' element={<Results />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/voting' element={<Voting />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
