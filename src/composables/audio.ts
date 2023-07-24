export function useAudio() {
  const audio = new Audio();
  audio.src = require('@/assets/sounds/432.mp3');

  return { audio };
}