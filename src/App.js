import { useEffect, useState } from "react";
import "./App.css";

import { Switch, Route, useHistory } from "react-router-dom";
import Iframe from "react-iframe";

// Speech recognition & synthesis
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

// Search engines utils
import { defaultSearchEngine, searchEngines } from "./engines";

// Custom components
import Launch from "./Launch";
import Footer from "./Footer";
import Navbar from "./Navbar";
import VolumeControl from "./VolumeControl";

const App = () => {
  const history = useHistory();

  const [mute, setMute] = useState(false);
  const [searchEngine, setSearchEngine] = useState(defaultSearchEngine);

  const onEnd = () => setMute(true);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const {
    speak,
    voices,
    speaking,
    supported: browserSupportsSpeechSynthesis,
  } = useSpeechSynthesis({
    onEnd,
  });

  useEffect(() => {
    if (!listening && transcript) {
      history.push("/result");
    }
  }, [history, listening, transcript]);

  if (!browserSupportsSpeechRecognition || !browserSupportsSpeechSynthesis) {
    return (
      <span>
        Your browser doesn't support speech recognition, please consider
        upgrading to a modern browser, such as Chrome
      </span>
    );
  }

  const handleReset = () => {
    resetTranscript();
    setSearchEngine(defaultSearchEngine);
    history.push("/");
    setMute(false);
  };

  const handleSelectSearchEngine = (name) => {
    setSearchEngine(searchEngines[name]);
  };

  const handleGreet = (e) => {
    console.log({
      mute,
      speaking,
    });

    if (!mute && !speaking) {
      try {
        const enVoices = voices?.filter((voice) => voice.lang.startsWith("en"));
        const randomVoice =
          enVoices && enVoices.length
            ? enVoices[Math.floor(Math.random() * enVoices.length)]
            : null;
        document.querySelector(".main-wrapper").click();
        speak({
          text: "Hi. I am Glitch the ghost. Click me and say something!",
          voice: randomVoice,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      listening
        ? SpeechRecognition.stopListening()
        : SpeechRecognition.startListening({ language: "en-US" });
    }
  };

  return (
    <div className="main-wrapper">
      <Switch>
        <Route path="/result">
          <Navbar
            onReset={handleReset}
            onSelectSearchEngine={handleSelectSearchEngine}
          />
          <Iframe
            url={`${searchEngine}${transcript}`}
            width="100%"
            height="100%"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
          <Footer onReset={handleReset} />
        </Route>
        <Route path="/">
          <VolumeControl mute={mute} setMute={setMute} />
          <Launch onGreet={handleGreet} />
          <h1>{listening && "What's on your mind?"} </h1>
          <div>
            <p>{transcript && transcript}</p>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
