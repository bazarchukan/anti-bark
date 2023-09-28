import { defineStore } from "pinia";
import { AppState } from "@/types/app";
import { MAX_FREQUENCY_VALUE } from '@/types/constants';
import { useMicrophone } from "@/composables/microphone";
import { useAudio } from "@/composables/audio";

const initState = (): AppState => ({
  isListening: false,
  isMuted: false,
  isThrottled: false,
  limit: MAX_FREQUENCY_VALUE,
  microphone: null,
  audio: useAudio()
});

export const useAppStore = defineStore('app', {
  state: initState,
  
  actions: {
    async listen() {
      try {
        this.microphone = await useMicrophone();

        this.isListening = true;
          
        setInterval(() => {
          this.microphone?.refreshFrequencyData();
        })
      } catch (error: any) {
        alert(error.message);
      }
    },

    play() {      
      this.audio.play();
    },

    toggleMute() {
      this.isMuted = !this.isMuted;
    }
  },

  getters: {
    isLimitOver(): boolean {            
      return !!this.microphone?.frequencyData.some(frequency => frequency >= this.limit);
    }
  }
});