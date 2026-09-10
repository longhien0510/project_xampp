import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';

import blog_detail_section from './Component/Blog/blog_detail_section';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import Blog_list from './Component/Blog/Blog_list';
import Blog_section from './Component/Blog/Blog_section';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
      <Routes>
        <Route path="/blog" element={<Blog_list/>} />
        <Route path="/blog/detail/:id" element={<blog_detail_section />} />
        <Route path="/" element={<Blog_list/>} />
      </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
