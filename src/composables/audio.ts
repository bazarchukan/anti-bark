export function useAudio() {
  const audio = new Audio();
  audio.src = require('@/assets/sounds/432Hz.mp3');

  return { audio };
}