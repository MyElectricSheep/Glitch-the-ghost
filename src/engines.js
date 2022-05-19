import { Search, Google, Edge, Bug, Actions } from "grommet-icons";

const defaultSearchEngine = "https://www.google.com/search?igu=1&ei=&q=";

const searchEngines = {
  Google: "https://www.google.com/search?igu=1&ei=&q=",
  Bing: "https://bing.com/search?q=",
  // Baidu: "https://www.baidu.com/s?wd=",
  WebCrawler: "https://www.webcrawler.com/serp?q=",
  WolframAlpha: "https://www.wolframalpha.com/input/?i=",
  DogPile: "https://www.dogpile.com/search/web?q=",
  Info: "https://www.info.com/serp?q=",
};

const searchEnginesSelectors = [
  { name: "Google", icon: Google },
  {
    name: "Bing",
    icon: Edge,
  },
  {
    name: "WebCrawler",
    icon: Bug,
  },
  { name: "WolframAlpha", icon: Actions },
  // { name: "Baidu", icon: Search },
  { name: "DogPile", icon: Search },
  { name: "Info", icon: Search },
];

export { defaultSearchEngine, searchEngines, searchEnginesSelectors };
