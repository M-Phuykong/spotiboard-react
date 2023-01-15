import React, {useEffect, useRef} from 'react';
import { useInViewport } from 'react-in-viewport';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { motion } from 'framer-motion';


// Component
import Section from '../../components/Section';
import Artist from '../Artist/Artist';
import Track from '../Track/Track';

// Context
import { useAuth } from "../../hooks/AuthContext";

// Style
import './Home.scss';

type ref = React.MutableRefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>

const cookies = new Cookies();

function Home() {


  const {access_token, setAccessToken} = useAuth()

  const sectionRef = useRef(null);
  const viewPort = useInViewport(sectionRef)

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
          
          setAccessToken(res.data.access_token)
          cookies.set("access_token", res.data.access_token, {maxAge: 3600})
        
        }
        else {
          console.log("access token value empty")
        }
      })
    }
  }, []);

  const artistSectionRef = useRef(null);
  const trackSectionRef = useRef(null);
  const section3 = useRef(null);

  function scrollTo(section : ref){
    section.current?.scrollIntoView({behavior: "smooth"})
  }

  // Animation
  const blackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 0,
      transition: {
        when: "afterChildren",
        duration: 2,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };
  const textContainer = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 0.25,
        when: "afterChildren",
      },
    },
  };
  const text = {
    initial: {
      y: 40,
    },
    animate: {
      y: 80,
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };
  return (
    <motion.div
    className="
    relative
    h-screen w-100
    overflow-y-auto overscroll-y-contain
    snap-y snap-mandatory
    "
    id="main_container">
    <motion.div
      className="absolute z-50 w-full bg-black"
      initial="initial"
      animate="animate"
      variants={blackBox}
    >
        <motion.svg variants={textContainer} className="absolute z-50 flex">
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width={750}
            height={800}
            className="text-white"
          >
            <rect className="w-full h-full fill-current" />
            <motion.rect variants={text} className="w-full h-full text-gray-600 fill-current" />
          </pattern>
          <text
            className="text-4xl font-bold"
            text-anchor="middle"
            x="50%"
            y="50%"
            style={{ fill: "url(#pattern)" }}
          >
            tailstore
          </text>
      </motion.svg>
    </motion.div>

    <div ref={artistSectionRef}>

      <Section
        viewPortRef = {sectionRef}
        goToSectionRef={trackSectionRef}
        scrollTo={scrollTo}
        showArrow={true}>
          <Artist></Artist>
      </Section>

    </div>

    <div ref={trackSectionRef} >
      <Section
        viewPortRef = {sectionRef}
        goToSectionRef={section3}
        scrollTo={scrollTo}
        showArrow={true}>
          {(viewPort.inViewport || viewPort.enterCount >= 1) ?
            <Track></Track>:
            <h1 className='text-white'>loading</h1>
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

    </motion.div>
  );
}



export default Home;
