import { defineStore } from "pinia";
import { AppState, Sound } from "@/types/app";
import { MAX_FREQUENCY_VALUE, INITIAL_SOUND } from '@/types/constants';
import { useMicrophone } from "@/composables/microphone";
import { useAudio } from "@/composables/audio";

const initState = (): AppState => ({
  isListening: false,
  isMuted: false,
  isThrottled: false,
  limit: MAX_FREQUENCY_VALUE,
  microphone: null,
  audio: useAudio(),
  sound: INITIAL_SOUND
});

export const useAppStore = defineStore('app', {
  state: initState,
  
  actions: {
    async start() {
      try {
        this.microphone = await useMicrophone();

        this.isListening = true;
          
        this.loop();
      } catch (error: any) {
        alert(error.message);
      }
    },

    loop() {
      setInterval(() => {
        this.microphone!.refreshFrequencyData();

        if (this.isLimitOver && !this.isMuted && !this.isThrottled) {      
          this.audio!.play();
          
          this.isThrottled = true;
    
          setTimeout(() => this.isThrottled = false, 5000);
        }
      })
    },

    toggleMute() {
      this.isMuted = !this.isMuted;
    },

    changeSound(sound: Sound) {      
      this.sound = sound;
      this.audio!.src = require(`@/assets/sounds/${this.sound}.mp3`);
    }
  },

  getters: {
    isLimitOver(): boolean {            
      return !!this.microphone?.frequencyData.some(frequency => frequency >= this.limit);
    }
  }
});