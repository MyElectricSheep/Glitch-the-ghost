import React from "react";
import { Volume, VolumeMute } from "grommet-icons";

const VolumeControl = ({ mute, setMute }) => {
  const handleMute = () => setMute(!mute);
  return (
    <div className="volume-control">
      {!mute ? (
        <Volume onClick={handleMute} />
      ) : (
        <VolumeMute onClick={handleMute} />
      )}
    </div>
  );
};

export default VolumeControl;
