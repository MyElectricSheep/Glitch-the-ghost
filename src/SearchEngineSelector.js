import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { Close } from "grommet-icons";
import { Grommet, Box, Button, DropButton, Heading } from "grommet";
import { grommet } from "grommet/themes";
import { searchEnginesSelectors } from "./engines";

const DropContent = ({ onClose, onSelectSearchEngine }) => {
  const [isShown, setIsShown] = useState();

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box pad="small">
        {searchEnginesSelectors.map(({ name, icon: Icon }, index) => {
          return (
            <Box
              key={index}
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
