export default class Recorder {
  constructor() {
    this.recording = false;
    this.recorder = null;
    this.chunks = [];
    this.audioFile = null;
  }

  start() {
    this.recording = true;
    this.chunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (e) => this.chunks.push(e.data);
        this.recorder.onstop = (e) => (this.audioFile = this.chunks[0]);
        this.recorder.start();
      })
      .catch((err) => console.log(err));
  }

  stop() {
    this.recording = false;
    this.recorder.stop();
  }

  getBlob() {
    return this.chunks;
  }
}
