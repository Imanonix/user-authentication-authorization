import * as React from 'react'
import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './pages/Home'
import Register from './components/Register'
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
