import React, { createContext, useState } from 'react';
import run from '../AI';

export const Datacontext = createContext();

const UserContext = ({ children }) => {
   let [speaking, setSpeaking] = useState(false);
   let [promte, setPromte] = useState("Listening...");
   let [response, setResponse] = useState(false);
   let [speechInstance, setSpeechInstance] = useState(null);
   let [Show, setShow] = useState(false);

   function speak(text) {
      let text_speak = new SpeechSynthesisUtterance(text);
      text_speak.volume = 10;
      text_speak.rate = 1;
      text_speak.pitch = 1;
      text_speak.lang = "gu-IN";
      text_speak.onend = () => recognition.start();
      setSpeechInstance(text_speak);
      setSpeaking(true);
      setShow(true)
      window.speechSynthesis.speak(text_speak);
   }

   function pauseSpeech() {
      if (speechInstance && window.speechSynthesis.speaking) {
         window.speechSynthesis.pause();
         setSpeaking(false);
      }
   }

   function resumeSpeech() {
      if (speechInstance && window.speechSynthesis.resume) {
         window.speechSynthesis.resume();
         setSpeaking(true);
      }
   }

   function stopSpeech() {
      if (speechInstance && window.speechSynthesis.speaking) {
         window.speechSynthesis.cancel();
         setSpeechInstance(null);
         setSpeaking(false);
      }
   }

   async function aiResponse(prompt) {
      let text = await run(prompt);
      let newText = text.replace(/Google/g, "Pradip Kanzareya");
      setPromte(newText);
      speak(newText);
      setResponse(true);
   }

   let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   let recognition = new SpeechRecognition();

   recognition.onresult = (e) => {
      let transcript = e.results[e.resultIndex][0].transcript;
      setPromte(transcript);
      takeCommand(transcript.toLowerCase());
   };

   function takeCommand(command) {
      const commands = {
         youtube: { url: "https://www.youtube.com/", label: "YouTube" },
         map: { url: "https://www.google.com/maps/", label: "Google Map" },
         whatsapp: { url: "https://web.whatsapp.com/", label: "WhatsApp" },
         instagram: { url: "https://www.instagram.com/", label: "Instagram" },
         github: { url: "https://github.com/", label: "GitHub" },
         telegram: { url: "https://web.telegram.org/", label: "Telegram" },
         flipkart: { url: "https://www.flipkart.com/", label: "Flipkart" },
         amazon: { url: "https://www.amazon.in/", label: "Amazon" },
         gmail: { url: "https://mail.google.com/", label: "Gmail" },
         calendar: { url: "https://calendar.google.com/", label: "Google Calendar" },
         google: { url: "https://www.google.com/", label: "Google" },
         camera:{ url:"https://elsafun.netlify.app/",label:"Camera"}
      };

      if ( command.includes("open")) {
         for (const key in commands) {
            if (command.includes(key)) {
               window.open(commands[key].url, "_blank");
               speak(`Opening ${commands[key].label}`);
               setPromte(`Opening ${commands[key].label}...`);
               return;
            }
         }
      } else if (command.includes("time")) {
         let time = new Date().toLocaleTimeString();
         speak(time);
         setPromte(time);
      } else if (command.includes("date")) {
         let date = new Date().toLocaleDateString();
         speak(date);
         setPromte(date);
      } else if (command.includes("your name")) {
         speak("Elsa");
         setPromte("Elsa");
      } else if (command.includes("pause")) {
         pauseSpeech();
      } else if (command.includes("resume")) {
         resumeSpeech();
      } else if (command.includes("stop")) {
         stopSpeech();
      } else {
         aiResponse(command);
      }
   }

   let value = {
      recognition,
      speaking,
      setSpeaking,
      promte,
      setPromte,
      response,
      setResponse,
      pauseSpeech,
      resumeSpeech,
      stopSpeech,
      Show
   };

   return <Datacontext.Provider value={value}>{children}</Datacontext.Provider>;
};

export default UserContext;
