import { INITIAL_SOUND } from "@/types/constants";

export function useAudio() {
  const audio = new Audio();
  audio.src = require(`@/assets/sounds/${INITIAL_SOUND}.mp3`);

  return audio;
}