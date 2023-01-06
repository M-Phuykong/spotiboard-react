import React, {useEffect, useRef} from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
import Cookies from 'universal-cookie';

// Component
import Section from '../../components/Section';
import Artist from '../Artist/Artist';

// Context
import { useAuth } from "../../hooks/AuthContext";

// Style
import './Home.scss';

type ref = React.MutableRefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>

function Home() {

  const {access_token, setAccessToken} = useAuth()

  // const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');

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
        goToSectionRef={section2}
        scrollTo={scrollTo}
        showArrow={true}>
          <Artist></Artist>
      </Section>


    </div>

    <div ref={section2}>
      <Section
        goToSectionRef={section3}
        scrollTo={scrollTo}
        showArrow={true}>
          <h1>Section 2</h1>

      </Section>

    </div>

    <div ref={section3}>
      <Section
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
