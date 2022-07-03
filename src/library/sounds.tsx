// beeping sound when player reveals a cells (and it's not a bomb)
export function playSound(soundType: string): void {
  const gameSound: HTMLAudioElement = new Audio();
  let source = 'beep.wav'; //default
  let volume = 0.2; // default;

  switch (soundType) {
    case 'reveal':
      source = 'beep.wav';
      break;
    case 'win':
      source = 'gameWon.wav';
      break;
    case 'bomb':
      source = 'bomb.wav';
      break;
    case 'lost':
      source = 'gameLost.wav';
      break;
    case 'start':
      source = 'gameStart.wav';
      volume = 0.1;
      break;
  }

  gameSound.src = source;
  gameSound.volume = volume;
  gameSound.play();
}
