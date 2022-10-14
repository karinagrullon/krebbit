import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import "@fontsource/bubblegum-sans";

import MainMenu from './components/MainMenu';
import HomePage from './components/HomePage';
import StoryPage from './components/StoryPage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import PageNotFound from './components/ErrorPages/PageNotFound';
import KrebbitIcon from './images/icons/frog-57x57.png';

function App() {
  const [data, setData] = useState([{}])

  // useEffect(() => {
  //   fetch("/members").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])

  useEffect(() => {
    fetch("/stories").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
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
      {/* {(typeof data.stories === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.stories.map((story, i) => (
          <p key={i}>{story.id}</p>
        ))
      )} */}
      <Helmet
        titleTemplate="%s | Krebbit"
        defaultTitle="Krebbit">
        <link rel="frog" href= { KrebbitIcon } />
      </Helmet>
      <BrowserRouter>
        <MainMenu />
        <Routes>
          <Route path="/" element={<HomePage storiesData={data} />} />
          <Route path="story-page" element={<StoryPage />} />
          <Route path="about-page" element={<AboutPage />} />
          
          {/* only match this when no other routes match */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
