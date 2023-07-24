export declare interface AppState {
  isListening: boolean;
  isMuted: boolean;
  limit: number;
  frequencyList: number[];
  audio: HTMLAudioElement | null;
}