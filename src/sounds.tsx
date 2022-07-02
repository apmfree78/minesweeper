// beeping sound when player reveals a cells (and it's not a bomb)
export function revealSound(): void {
  console.log('played sound');
  const beepSound: HTMLAudioElement = new Audio();
  beepSound.src = 'beep.wav';
  beepSound.volume = 0.5;
  beepSound.play();
}
