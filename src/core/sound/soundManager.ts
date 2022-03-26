export class AudioManager {
  filenames: Record<string, string>;
  context: AudioContext;
  audioBuffer!: AudioBuffer;
  sounds: {
    source: AudioBufferSourceNode,
    filename: string
  }[];

  constructor(filenames: Record<string, string>) {
    this.context = new AudioContext();
    this.filenames = filenames;
    this.sounds = [];
    Object.values(filenames).forEach(filename => {
      this.sounds.push({
        source: this.context.createBufferSource(),
        filename: filename
      });
    });
  }

  async init() {
    for (let i = 0; i < this.sounds.length; i++) {
      const filename = this.sounds[i].filename;
      this.audioBuffer = await fetch('src/assets/sounds/' + filename)
        .then((res) => res.arrayBuffer())
        .then(arrBuf => this.context.decodeAudioData(arrBuf));

      this.sounds[i].source.buffer = this.audioBuffer;
      this.sounds[i].source.connect(this.context.destination);
    }
  }

  play(filename: string) {
    this.sounds.find((sound) => sound.filename === filename)?.source.start();
  }

  stop(filename: string) {
    this.sounds.find((sound) => sound.filename === filename)?.source.stop();
  }
}