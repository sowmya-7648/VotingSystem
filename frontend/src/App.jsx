import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './components/layout/HomeLayout';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Candidates from './pages/Vote/Candidates';
import Results from './pages/Vote/Results';
import Profile from './pages/Vote/Profile';
import Voting from './pages/Vote/Voting';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route
            index
            element={
              <div>
                <section
                  className="relative min-h-screen flex items-center justify-center bg-[url('/images/bg.avif')] bg-cover bg-center bg-no-repeat h-64 w-full"
                >
                  <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r"></div>

                  <div className="relative max-w-screen-xl px-4 py-32 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-6xl block font-extrabold text-rose-700">VoteWise</h1>
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                      Your vote is your voice.
                      <strong className="block font-extrabold text-rose-700">
                        Make it heard!
                      </strong>
                    </h1>

                    <p className="mt-4 max-w-lg mx-auto sm:text-xl">
                      "Your Vote, Your Voice!" – Participate in elections and make a difference!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                      <Link
                        to="/login" // Navigate to login page
                        className="block w-full rounded-sm bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 sm:w-auto"
                      >
                        Get Started
                      </Link>

                    </div>
                  </div>
                </section>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/voting" element={<Voting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
