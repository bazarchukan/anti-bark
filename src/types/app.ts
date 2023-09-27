export declare interface AppState {
  isListening: boolean;
  isMuted: boolean;
  limit: number;
  microphone: Microphone | null;
  audio: HTMLAudioElement | null;
}

export declare interface Microphone {
  frequencyData: number[],
  refreshFrequencyData: Function
}