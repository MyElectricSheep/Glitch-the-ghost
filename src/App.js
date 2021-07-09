import { useEffect } from "react";
import "./App.css";
// import Speech from "react-speech";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Launch from "./Launch";
import Iframe from "react-iframe";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

function App() {
  const history = useHistory();
  const location = useLocation();

  console.log(location);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) {
      history.push("/result");
    }
  }, [history, listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleReset = () => {
    resetTranscript();
    history.push("/");
  };

  return (
    <div className="main-wrapper">
      <Switch>
        <Route path="/result">
          {/* TODO: Add navbar component */}
          <Iframe
            url={`https://bing.com/search?q=${transcript}`}
            width="100%"
            height="100%"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
          <button onClick={handleReset}>New Glitch</button>
        </Route>
        <Route path="/">
          <Launch
            onStart={SpeechRecognition.startListening}
            onStop={SpeechRecognition.stopListening}
            language="en-US"
            listening={listening}
          />
          <h1>{listening && "What's on your mind?"} </h1>
          <div>
            <p>{transcript && transcript}</p>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

// ToDo: add speech feature for the ghost
//  <Speech
//   stop={true}
//   pause={true}
//   resume={true}
//   lang="en-GB"
//   voice="Google UK English Male"
//   text="Something to say" />
