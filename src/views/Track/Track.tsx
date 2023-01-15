import React, {useEffect, useRef, useState, useReducer} from "react";
import Matter from "matter-js";
import Cookies from "universal-cookie";

// Context 
import { useAuth } from "../../hooks/AuthContext";

// Stylesheet
import "./Track.scss"

// Components
import CardSingle from "../../components/CardSingle";

// Helper
import { getSpotifyTop, reducer } from "../../utils/helper";

const cookies = new Cookies()

function Track(){

  const {access_token, setAccessToken} = useAuth();
  
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);

  const containerRef = useRef<any>();
  const canvasRef = useRef<any>();
  
  const initialTrackParams  = {
    access_token: access_token,
    limit: 20,
    time_range: "short_term"
  }
  
  const [trackParams, dispatch] = useReducer(reducer, initialTrackParams);
  
  useEffect(() => {
      
      getSpotifyTop("track", trackParams, (val) => {
        setTracks(val);
      })

  }, [trackParams]);

  useEffect(()  => {

        if (access_token){

          // console.log("access token not null", access_token)
          dispatch({type : "access_token", value : access_token})

        }
        else {
            // need to check when the cookie expires
            const cur_access_token : string = cookies.get("access_token")
            
            // Cookie is still valid
            //
            if (cur_access_token){

              // console.log("cookie still valid", cur_access_token)
              dispatch({type : "access_token", value : cur_access_token})
              setAccessToken(cur_access_token)

            } else {

                console.log(access_token, "cookies expired")
            }
        }

  }, [access_token]);


  useEffect(() => {

    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Events = Matter.Events,
        Body = Matter.Body,
        Composite = Matter.Composite;

    const engine = Engine.create({});
    let width = containerRef.current?.clientWidth ? containerRef.current.clientWidth : 0;
    let height = containerRef.current?.clientHeight ? containerRef.current.clientHeight : 0;
    let htmlBods : any[] = [];
    let walls = []

    const render = Render.create({
      element : containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options : {
        width: width,
        height: height,
        background : "transparent",
        wireframes: false,
      }
    })

    function createBodies() {

      let htmlElems = [...document.querySelectorAll(".physicsDiv")];

      let bodies : any = []

      htmlElems.map((elem) => {

          (elem as HTMLElement).style.transform = "";

          elem.classList.remove("abs")
          let b = elem.getBoundingClientRect();
          elem.classList.add("abs")

          let bod : any = Bodies.rectangle(
            // b.left + (b.width / 2) + 250,
            b.left + (b.width / 2) + (Math.random() * (width - (width / 5)) + (width/ 100)) , // x
            b.top + (b.height / 2), // y
            1, // width
            1,
            {
              render : {fillStyle:"transparent"}
            }); // height

          bod.htmlElementOffset = {top: b.top, left: b.left};

          Body.scale(bod, b.width, b.height);

          bod.frictionAir = 0.05;
          bod.htmlElement = elem;

          bod.update = () => {

              let xpos = bod.position.x;
              let ypos = bod.position.y ;

              let angle = bod.angle;

              let transform = "translate("
                +((elem as HTMLBodyElement).clientWidth)
                +"px, "
                +((elem as HTMLBodyElement).clientHeight)
                +"px) translate("+(xpos - 475)+"px, "+(ypos - 175)+"px) rotate("
                +angle
                +"rad) scale3d(1,1,1)";


              let sinAng = 2*Math.sin(bod.angle);
              let cosAng = 2*Math.cos(bod.angle);

              (elem as HTMLElement).style.boxShadow = ""+sinAng+"px "+cosAng+"px 1px 1px #0002";
              (elem as HTMLElement).style.transform = transform;
          };

          htmlBods.push(bod);

          bodies.push(bod)
      });

      Composite.add(engine.world, bodies);

    }

    function createWall() {
      // let ceiling = Bodies.rectangle(0, 0, width * 2, 50,
      //   { isStatic: true, render : {fillStyle : "red"} })
      let ceiling = Bodies.rectangle(0, 0, width * 2, 50,
        { isStatic: true, render : {fillStyle : "transparent"} })

      // let floor = Bodies.rectangle(0, height, width * 2, 50,
      //   { isStatic: true, render : {fillStyle : "green"} })
      let floor = Bodies.rectangle(0, height - 70, width * 2, 50,
        { isStatic: true, render : {fillStyle : "transparent"} })

      let right_wall = Bodies.rectangle(width - 70, 0, 50, height * 2,
        { isStatic: true ,render : {fillStyle : "transparent"} })

      let left_wall = Bodies.rectangle(70, 0, 50, height * 2,
        { isStatic: true, render : {fillStyle : "transparent"} })


      walls = []
      // walls.push(ceiling);
      walls.push(floor);
      walls.push(left_wall);
      walls.push(right_wall);

      Composite.add(engine.world, walls);
    }

    function setupMouse(){
      // add mouse control
      var mouse = Matter.Mouse.create(canvasRef.current),
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
        }
      });

      Composite.add(engine.world, mouseConstraint);

      // keep the mouse in sync with rendering
      render.mouse = mouse;

    }

    function updateHtmlElems(){
      if(htmlBods){
      }
      htmlBods.map((bod)=>{
        bod.update();
      });
    }

    function onResize(){
      let width = containerRef.current?.clientWidth ? containerRef.current.clientWidth : 0;
      let height = containerRef.current?.clientHeight ? containerRef.current.clientHeight : 0;


      render.options.height = height;
      render.options.width = width;
      render.canvas.height = height;
      render.canvas.width = width;

      Composite.clear(engine.world,false);

      // create two boxes and a ground
      createBodies();
      createWall();
      setupMouse();

    }


    createBodies();
    createWall();
    setupMouse();

    // run the renderer
    Render.run(render);

    // create the runner
    var runner = Runner.create()

    // run the engine
    Runner.run(runner, engine)

    // Composite.add(engine.world , Bodies.rectangle(0, 0, width * 2, 50,
    //     { isStatic: true, render : {fillStyle : "transparent"} }))

    window.addEventListener("resize", ()=>{onResize()});
		Events.on(runner, "afterTick",()=> {updateHtmlElems();})

    return () => {
      Render.stop(render)
      Engine.clear(engine)
      render.canvas.remove()
    }

  }, [tracks]);

  return (
    <div ref = {containerRef}
    className="
    noselect
    w-full h-full
    justify-center items-center text-center

    ">
      <h1
      className="
      noselect
      absolute
      text-center
      mt-24
      -z-10
      w-full
      "
      id="track_sign">
        {trackParams.limit} &nbsp; Recent &nbsp; Tracks!
      </h1>

      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      
      {tracks.map((item: any, ind: number) => {
        return (
          <div key={ind}
          className="
          physicsDiv
          absolute
          w-80 h-28
          top-0 left-0
          rounded-lg
          ">
            <CardSingle prop={item}></CardSingle>
          </div>
        )
      })}

      <h1></h1>

    </div>
  )
}


export default Track;