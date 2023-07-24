export async function useMicrophone() {
  const frequencyData = new Uint8Array(32);
  const context = new AudioContext();
  const analyser = context.createAnalyser(); 
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = context.createMediaStreamSource(stream);

  source.connect(analyser);

  const getFrequencyData = () => {    
    analyser.getByteFrequencyData(frequencyData);

    return frequencyData;
  }

  return { getFrequencyData };
}