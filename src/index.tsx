import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// Styling Sheets
import './index.scss';

// Components
import Header from './components/Header';

// Views
import Root from './views/Root/Root';
import Home from './views/Home/Home';
import Artist from './views/Artist/Artist';
import Track from './views/Track/Track'
import ErrorPage from './views/Error/ErrorPage';


import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './hooks/AuthContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <AuthProvider>
        {/* <Header></Header> */}
        <Routes>
          <Route path='/' element={<Root/>}></Route>
          <Route path='home' element={<Home/>}></Route>
          <Route path='artist' element={<Artist/>}></Route>
          <Route path='track' element={<Track/>}></Route>

        </Routes>
      </AuthProvider>

    </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
