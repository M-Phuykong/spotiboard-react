import React, {useEffect, useRef, useState} from 'react';
import { useInViewport } from 'react-in-viewport';
import { Buffer } from 'buffer';
import axios from 'axios';
import Cookies from 'universal-cookie';

// Component
import Section from '../../components/Section';
import Artist from '../Artist/Artist';
import Track from '../Track/Track';

// Context
import { useAuth } from "../../hooks/AuthContext";

// Style
import './Home.scss';

type ref = React.MutableRefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>

function Home() {

  const {access_token, setAccessToken} = useAuth()

  // const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');
  const sectionRef = useRef(null);
  const viewPort = useInViewport(sectionRef)

  const cookies = new Cookies();

  useEffect(() => {

    let code = new URLSearchParams(window.location.search).get("code") || null;

    if (code === null){
      console.log("no code available");
    }
    else {

      // window.history.pushState("", "", REDIRECT_URI);
      axios.get(`http://localhost:5000/login?${code}`)
      .then(res => {
        if (res.data !== "" && cookies.get("access_token") === undefined){
          console.log(res)
          setAccessToken(res.data.access_token)
          cookies.set("access_token", res.data.access_token, {maxAge: 3600})

        }
        else {
          console.log("access token value empty")
        }

      })
    }

  });
  const artistSectionRef = useRef(null);
  const section2 = useRef(null);
  const section3 = useRef(null);

  function scrollTo(section : ref){
    section.current?.scrollIntoView({behavior: "smooth"})
  }

  return (
    <div
    className="
    relative
    h-screen w-100
    overflow-y-auto overscroll-y-contain
    snap-y snap-mandatory
    "
    id="main_container">

    <div ref={artistSectionRef}>
      <Section
        viewPortRef = {sectionRef}
        goToSectionRef={section2}
        scrollTo={scrollTo}
        showArrow={true}>
          <Artist></Artist>

          {/* <Track></Track> */}
      </Section>


    </div>

    <div ref={section2} >
      <Section
        viewPortRef = {sectionRef}
        goToSectionRef={section3}
        scrollTo={scrollTo}
        showArrow={true}>
          
          {(viewPort.inViewport || viewPort.enterCount >= 1) ?
            <Track></Track>:
            <h1>loading</h1>
          }


      </Section>

    </div>

    <div ref={section3}>
      <Section
        viewPortRef = {sectionRef}
        goToSectionRef={section3}
        scrollTo={scrollTo}
        showArrow={false}>
          <h1>Section 3</h1>

      </Section>

    </div>

    </div>
  );
}

export default Home;
