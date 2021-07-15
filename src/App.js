import { useEffect, useState } from "react";
import "./App.css";
// import Speech from "react-speech";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Launch from "./Launch";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Iframe from "react-iframe";
import { Switch, Route, useHistory } from "react-router-dom";

function App() {
  const defaultSearchEngine = "https://www.google.com/search?igu=1&ei=&q=";

  const history = useHistory();

  const [searchEngine, setSearchEngine] = useState(defaultSearchEngine);

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
    setSearchEngine(defaultSearchEngine);
    history.push("/");
  };

  const handleSelectSearchEngine = (name) => {
    const searchEngines = {
      Google: "https://www.google.com/search?igu=1&ei=&q=",
      Bing: "https://bing.com/search?q=",
      Baidu: "https://www.baidu.com/s?wd=",
      WebCrawler: "https://www.webcrawler.com/serp?q=",
      WolframAlpha: "https://www.wolframalpha.com/input/?i=",
      DogPile: "https://www.dogpile.com/search/web?q=",
      Info: "https://www.info.com/serp?q=",
    };
    setSearchEngine(searchEngines[name]);
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
//   text="Hi, my name is Glitch the ghost, how can I help you?" />
