import { Microphone } from "@/types/app";

export async function useMicrophone() {
  let stream: MediaStream;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    throw new Error('No microphone access');
  }

  const frequencyData = new Uint8Array(32);
  const context = new AudioContext();
  const analyser = context.createAnalyser(); 
  const source = context.createMediaStreamSource(stream);

  source.connect(analyser);

  const microphone: Microphone = {
    frequencyData: [],
    refreshFrequencyData: function() {
      analyser.getByteFrequencyData(frequencyData);
      this.frequencyData = [... frequencyData]
  }
};

  return microphone;
}