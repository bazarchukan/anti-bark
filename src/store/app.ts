import { defineStore } from "pinia";
import { AppState } from "@/types/app";
import { MAX_FREQUENCY_VALUE } from '@/types/constants';
import { useMicrophone } from "@/composables/microphone";
import { useAudio } from "@/composables/audio";

const initState = (): AppState => ({
  isListening: false,
  isMuted: false,
  limit: MAX_FREQUENCY_VALUE,
  frequencyList: [],
  audio: null
});

export const useAppStore = defineStore('app', {
  state: initState,
  
  actions: {
    start() {
      this.listen();
      this.react();
    },

    async listen() {
      const { getFrequencyData } = await useMicrophone();

      this.isListening = true;

      const loop = () => {
        window.requestAnimationFrame(loop);

        this.frequencyList = [... getFrequencyData()];
      }

      loop();
    },

    react() {
      const { audio } = useAudio();
      this.audio = audio;

      const loop = () => {
        window.requestAnimationFrame(loop);

        if (this.isLimitOver) {
          this.audio!.play();
        }
      }

      loop();
    },

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.audio!.muted = this.isMuted;
    }
  },

  getters: {
    isLimitOver(): boolean {
      return this.frequencyList.some(frequency => frequency >= this.limit);
    }
  }
});