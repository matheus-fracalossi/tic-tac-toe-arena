import { Button } from "@/components/button";
import { useAudioContext } from "../provider";

export const AudioToggleButton = () => {
  const { isMuted, toggleAudio } = useAudioContext();

  return (
    <Button
      title={`Audio: ${isMuted ? "Off" : "On"}`}
      onPress={toggleAudio}
      size="small"
      variant="ghost"
    />
  );
};
