import React, { ChangeEvent } from 'react';

//controls for drumpad. Includes power on/off,
//switching between tracks. PLUS display name
//of current sound

interface Sound {
  name: string;
  file: string;
  track: number;
  key: string;
}

interface Props {
  volume: number;
  switchPower: () => void;
  switchTrack: () => void;
  setVolume: (event: ChangeEvent<HTMLInputElement>) => void;
  currentSound: Sound;
}

const Controls: React.FC<Props> = ({
  volume,
  switchPower,
  switchTrack,
  setVolume,
  currentSound,
}) => {
  return (
    <div
      id='panel'
      className='container d-flex flex-column align-items-center justify-content-center'>
      {/* power switch */}
      <label className='switch d-flex align-items-last justify-content-center'>
        <div className='button_title'>Power</div>
        <input type='checkbox' name='power' onChange={switchPower} />
        <span className='slider'></span>
      </label>
      {/* volume controls */}
      <div id='volume_control'>
        <input
          type='range'
          className='form-range'
          name='volume'
          id='volume'
          min='0'
          max='100'
          value={volume}
          onChange={setVolume}
        />
      </div>
      {/* display drumbeat name  */}
      <div id='track_title'>
        {currentSound.name ? currentSound.name : <br />}
      </div>
      {/* switch between the 2 tracks that are avaliable  */}
      <label className='switch d-flex align-items-last justify-content-center'>
        <div className='button_title'>Tracks</div>
        <input type='checkbox' name='track' onChange={switchTrack} />
        <span className='slider'></span>
      </label>
    </div>
  );
};

export default Controls;
