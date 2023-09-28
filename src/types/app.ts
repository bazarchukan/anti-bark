export declare interface AppState {
  isListening: boolean;
  isMuted: boolean;
  isThrottled: boolean,
  limit: number;
  microphone: Microphone | null;
  audio: HTMLAudioElement;
}

export declare interface Microphone {
  frequencyData: number[],
  refreshFrequencyData: Function
}