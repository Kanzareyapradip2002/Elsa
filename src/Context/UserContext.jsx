import React, { createContext, useState } from 'react';
import run from '../AI';

export const Datacontext = createContext();

const UserContext = ({ children }) => {
   let [speaking, setSpeaking] = useState(false);
   let [promte, setPromte] = useState("Listening...");
   let [response, setResponse] = useState(false);
   let [speechInstance, setSpeechInstance] = useState(null);
   let [Show, setShow] = useState(false);

      function openCamera() {
         navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
               let video = document.createElement("video");
               video.srcObject = stream;
               video.autoplay = true;
               video.style.position = "fixed";
               video.style.top = "50%";
               video.style.left = "50%";
               video.style.transform = "translate(-50%, -50%)";
               video.style.width = "90vw";
               video.style.height = "90vh";
               video.style.maxWidth = "100%";
               video.style.maxHeight = "100%";
               video.style.objectFit = "cover";
               video.style.borderRadius = "10px";
               video.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
               video.setAttribute("playsinline", ""); // For mobile compatibility
   
               // Ensure there's only one camera instance
               let existingVideo = document.getElementById("cameraStream");
               if (existingVideo) {
                     existingVideo.remove();
               }
               
               video.id = "cameraStream";
               document.body.appendChild(video);
               speak("Camera opened");
            })
            .catch((err) => {
               speak("Error accessing camera.");
               console.error("Camera error:", err);
            });
   }
  


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
         facebook: { url: "https://www.facebook.com/", label: "facebook" },
         weather: { url: "https://www.weather.com/", label: "Weather" },
         music: { url: "https://www.spotify.com/", label: "Spotify" },
      };

      if (command.includes("open")) {
         for (const key in commands) {
            if (command.includes(key)) {
               window.open(commands[key].url, "_blank");
               speak(`Opening ${commands[key].label}`);
               setPromte(`Opening ${commands[key].label}...`);
               return;
            }
         }
      } else if (command.includes("search")) {
         let query = command.replace("search", "").trim();
         let url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
         window.open(url, "_blank");
         speak(`Searching Google for ${query}`);
      }
      else if (command.includes("youtube search")) {
         let query = command.replace("youtube search", "").trim();
         let url = `https://www.youtube.com/search?q=${encodeURIComponent(query)}`;
         window.open(url, "_blank");
         speak(`Searching youtube for ${query}`);
      }
      else if (command.includes("weather")) {
         window.open(commands.weather.url, "_blank");
         speak("Opening Weather site");
         setPromte("Opening Weather");
      }
      else if (command.includes("music")) {
         window.open(commands.music.url, "_blank");
         speak("Opening Music site");
         setPromte("Opening Music ");
      }
      else if (command.includes("time")) {
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
      }else if (command.includes("on camera")) {
         openCamera();
     }else {
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
