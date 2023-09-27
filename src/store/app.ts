import { defineStore } from "pinia";
import { AppState } from "@/types/app";
import { MAX_FREQUENCY_VALUE } from '@/types/constants';
import { useMicrophone } from "@/composables/microphone";
import { useAudio } from "@/composables/audio";

const initState = (): AppState => ({
  isListening: false,
  isMuted: false,
  limit: MAX_FREQUENCY_VALUE,
  microphone: null,
  audio: null
});

export const useAppStore = defineStore('app', {
  state: initState,
  
  actions: {
    async start() {
      try {
        const { microphone } = await useMicrophone();
        const { audio } = useAudio();
        this.microphone = microphone;
        this.audio = audio;
  
        this.isListening = true;
        this.listen();
      } catch (error: any) {
        alert(error.message);
      }
    },

    listen() {
      this.microphone?.refreshFrequencyData();

      if (this.isLimitOver) {
        this.audio!.play();
      }

      window.requestAnimationFrame(this.listen);
    },

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.audio!.muted = this.isMuted;
    }
  },

  getters: {
    isLimitOver(): boolean {            
      return this.microphone!.frequencyData.some(frequency => frequency >= this.limit);
    }
  }
});