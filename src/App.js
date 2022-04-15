import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layouts
import MainLayout from 'layouts/MainLayout';

// Pages
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';

import Dashboard from 'pages/Dashboard';
import PhotoEdit from 'pages/PhotoEdit';
import PhotoAdd from 'pages/PhotoAdd';
import PhotoDetail from 'pages/PhotoDetail';

// Guard
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path={`/`}
            element={
              <MainLayout>
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              </MainLayout>
            }
          />

          <Route
            path='/photo-add'
            element={
              <MainLayout>
                <AuthGuard>
                  <PhotoAdd />
                </AuthGuard>
              </MainLayout>
            }
          />

          <Route
            path='/photo-edit/:photoId'
            element={
              <MainLayout>
                <AuthGuard>
                  <PhotoEdit />
                </AuthGuard>
              </MainLayout>
            }
          />

          <Route
            path='/photo-detail/:photoId'
            element={
              <MainLayout>
                <AuthGuard>
                  <PhotoDetail />
                </AuthGuard>
              </MainLayout>
            }
          />

          <Route
            path='/login'
            element={
              <GuestGuard>
                <Login />
              </GuestGuard>
            }
          />
          <Route
            path='/register'
            element={
              <GuestGuard>
                <Register />
              </GuestGuard>
            }
          />
          <Route
            path='/*'
            element={
              <GuestGuard>
                <NotFound />
              </GuestGuard>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
