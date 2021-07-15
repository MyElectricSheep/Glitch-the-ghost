import React, { useEffect, useState } from "react";

import { Anchor, Box, Text, Header, Nav } from "grommet";

import SearchEngineSelector from "./SearchEngineSelector";
import { Ghost } from "react-kawaii";

const LaunchNav = ({ onReset, onSelectSearchEngine }) => {
  const [mood, setMood] = useState("blissful");

  useEffect(() => {
    const possibleMoods = [
      "sad",
      "shocked",
      "happy",
      "blissful",
      "lovestruck",
      "excited",
      "ko",
    ];
    setMood(possibleMoods[Math.floor(Math.random() * possibleMoods.length)]);
  }, []);

  return (
    <Header
      background="dark-2"
      basis="auto"
      fill="horizontal"
      pad={{ horizontal: "large", vertical: "xsmall" }}
    >
      <Box direction="row" align="center" gap="small">
        <Ghost size={40} mood={mood} color="#FFFFFF" />
        <Anchor color="white" onClick={onReset}>
          <Text size="xxlarge">Glitch</Text>
        </Anchor>
      </Box>
      <Nav direction="row">
        <SearchEngineSelector onSelectSearchEngine={onSelectSearchEngine} />
      </Nav>
    </Header>
  );
};

export default LaunchNav;
