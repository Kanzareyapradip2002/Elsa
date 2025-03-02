import React, { useContext, useState } from 'react';
import "./App.css";
import Ai from "./assest/ai.png";
import Speak from "./assest/speak.gif";
import Aigif from "./assest/aiVoice.gif";
import Robots from "./assest/Robot.gif";
import { CiMicrophoneOn } from "react-icons/ci";
import { Datacontext } from './Context/UserContext';

const App = () => {
  let { recognition, speaking, setSpeaking, promte, Show, setPromte, response, setResponse, pauseSpeech, resumeSpeech, stopSpeech } = useContext(Datacontext);
  let [hide, setHide] = useState(false);
  let [Robot, setRobot] = useState(false);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white md:flex-row md:p-6 md:gap-14 lg:gap-32">
      {/* Left Side: Logo */}
      <div className="flex flex-col items-center gap-4 text-center md:text-left md:ml-9 lg:ml-16">
        {
          Robot ? (
            <div className='bg-white rounded-full'>
              <img src={Robots} alt='ELSA' className='h-28 md:h-32' />
            </div>
          ) : (
            <>
              <img src={Ai} alt="ELSA" className="h-64 md:h-80" />
            </>
          )
        }
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent md:text-3xl">
          ELSA version 2.0
        </span>

        {
          !speaking ? (
            <button
              className="flex items-center gap-2 px-6 py-2 text-lg font-semibold text-black transition bg-cyan-400 rounded-full shadow-lg hover:bg-cyan-500"
              onClick={() => {
                setPromte("Listening...");
                setSpeaking(true);
                setResponse(false);
                setHide(true);
                setRobot(true);
                recognition.start();
              }}
            >
              Click Me <CiMicrophoneOn className="text-xl" />
            </button>
          ) : (
            <div className="flex flex-col items-center">
              {!response ? <img src={Speak} alt="Speaking" className="w-16 md:w-24" /> : <img src={Aigif} alt="AI Responding" className="w-16 md:w-24" />}
            </div>
          )
        }
      </div>

      {/* Right Side: Text Response */}
      {hide && (
        <div className="w-full h-48 p-4 mt-6 text-lg text-center bg-white bg-gradient-to-r overflow-y-scroll from-cyan-400 to-pink-500 rounded-lg shadow-md md:ml-10 md:mt-0 md:w-[600px] md:h-[500px] textcontainer">
          <p>{promte}</p>
          {Show &&
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={pauseSpeech} className="px-4 py-2 text-black bg-yellow-300 rounded-lg hover:bg-yellow-400">Pause</button>
              <button onClick={resumeSpeech} className="px-4 py-2 text-black bg-green-300 rounded-lg hover:bg-green-400">Resume</button>
              <button onClick={() => {
                  stopSpeech();
                  window.location.reload();
                }} className="px-4 py-2 text-black bg-red-400 rounded-lg hover:bg-red-500">Stop</button>

            </div>
          }
        </div>
      )}
    </div>
  );
};

export default App;
