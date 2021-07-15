import React from "react";
import { Box, Footer, Button, Text } from "grommet";
import { Code as Icon } from "grommet-icons";

const LaunchFooter = ({ onReset }) => {
  return (
    <Footer
      background="dark-2"
      basis="auto"
      fill="horizontal"
      pad={{ horizontal: "large", vertical: "small" }}
    >
      <Box direction="row" gap="small">
        <Icon color="status-warning" />
        <Text alignSelf="center">Glitch.io</Text>
      </Box>
      <Box direction="row" gap="small">
        <Button
          secondary
          label="New Glitch"
          color="status-warning"
          onClick={onReset}
        />
      </Box>
      <Text textAlign="center" size="small">
        © {new Date().getFullYear()} The Glitch Corp
      </Text>
    </Footer>
  );
};

export default LaunchFooter;
