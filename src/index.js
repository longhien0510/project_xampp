import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Header from './components/Header';
import Footer from './components/Footer';

// import Blog_detail_section from './Page/Blog_detail_section';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Blog_list from './Page/Blog_list';
import Blog_section_api from './Page/blog_section_api';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
      <Routes>
        <Route path="/blog" element={<Blog_section_api />} />
        <Route path="/blog/detail" element={<Blog_detail_section />} />
        <Route path="/" element={<Blog_section_api />} />
      </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
