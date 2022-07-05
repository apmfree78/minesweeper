// beeping sound when player reveals a cells (and it's not a bomb)
export async function playSound(soundType: string): Promise<void> {
  const gameSound: HTMLAudioElement = new Audio();
  let source = 'beep.wav'; //default
  let volume = 0.2; // default;

  switch (soundType) {
    case 'click2':
      source = 'click5.wav';
      break;
    case 'click':
      source = 'click.wav';
      break;
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
  await gameSound.play();
}
