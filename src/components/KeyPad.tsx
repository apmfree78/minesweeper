import React from 'react';

interface Props {
  children: string;
  playDrumSound: (index: string) => void;
}

//keypad button - reusable component
const KeyPad: React.FC<Props> = ({ playDrumSound, children }) => {
  return (
    <div id='drum-pad'>
      <button
        className='btn btn-primary btn-lg'
        type='submit'
        id={children}
        onClick={() => playDrumSound(children)}>
        {children}
      </button>
    </div>
  );
};

export default KeyPad;
