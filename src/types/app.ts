import { SOUNDS } from "./constants";

export declare interface AppState {
  isListening: boolean,
  isMuted: boolean,
  isThrottled: boolean,
  limit: number,
  microphone: Microphone | null,
  audio: HTMLAudioElement,
  sound: Sound
}

export declare interface Microphone {
  frequencyData: number[],
  refreshFrequencyData: Function
}

export declare type Sound = typeof SOUNDS[number];