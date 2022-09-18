import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import "@fontsource/bubblegum-sans";

import MainMenu from './components/MainMenu';
import AppWrapper from './components/AppWrapper';
import KrebbitIcon from './images/icons/frog-57x57.png';

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {/* {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )} */}
      <Helmet
        titleTemplate="%s | Krebbit"
        defaultTitle="Krebbit">
        <link rel="frog" href= { KrebbitIcon } />
      </Helmet>
      <MainMenu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppWrapper/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
