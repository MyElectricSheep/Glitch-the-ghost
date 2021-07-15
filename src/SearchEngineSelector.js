import React, { useState } from "react";
import { Search, Google, Edge, Bug, Actions, Close } from "grommet-icons";
import ClickAwayListener from "react-click-away-listener";

import { Grommet, Box, Button, DropButton, Heading } from "grommet";
import { grommet } from "grommet/themes";

const DropContent = ({ onClose, onSelectSearchEngine }) => {
  const [isShown, setIsShown] = useState();
  const searchEngines = [
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
    { name: "Baidu", icon: Search },
    { name: "DogPile", icon: Search },
    { name: "Info", icon: Search },
  ];
  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box pad="small">
        {searchEngines.map(({ name, icon: Icon }) => {
          return (
            <Box
              direction="row"
              justify="between"
              align="center"
              hoverIndicator={{
                background: {
                  color: "background-contrast",
                },
              }}
              focusIndicator={false}
              onClick={() => onSelectSearchEngine(name)}
              onMouseEnter={() => setIsShown(name)}
              onMouseLeave={() => setIsShown()}
            >
              <Heading level={4} margin="small">
                {name}
              </Heading>
              {isShown === name && <Button icon={<Icon />} />}
            </Box>
          );
        })}
        <Box
          direction="row"
          justify="end"
          align="center"
          focusIndicator={false}
          onClick={onClose}
        >
          <Button icon={<Close />} />
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

const SearchEngineSelector = ({ onSelectSearchEngine }) => {
  const [open, setOpen] = useState();

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="xsmall" background="dark-2">
        <DropButton
          label="Select search engine"
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          color="status-warning"
          dropContent={
            <DropContent
              onClose={onClose}
              onSelectSearchEngine={onSelectSearchEngine}
            />
          }
          dropProps={{ align: { top: "bottom" }, background: "dark-2" }}
        />
      </Box>
    </Grommet>
  );
};

export default SearchEngineSelector;
