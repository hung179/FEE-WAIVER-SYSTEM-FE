import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './pages/User/Home';
import AdminHomePage from './pages/Admin/Home';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/home"
                element={<HomePage/>}
              />
              {/* Hiện tại page của quản trị viên cũng bị đưa về page home này lý do là vì page này không quy định role sử dụng */}
            </Route>

            {/* Protected routes với role */}
            <Route element={<ProtectedRoute allowedRoles={['QUANTRIVIEN']} />}>
              <Route
                path="/admin"
                element={<AdminHomePage/>}></Route>
            </Route>

            <Route path='/unauthorized' element={<Unauthorized/>} >

            </Route>

            {/* 404 */}
            <Route path='*' element={<Navigate to='/' replace/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
