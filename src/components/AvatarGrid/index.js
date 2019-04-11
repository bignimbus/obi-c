import './index.css';
import React, { useState, useEffect } from 'react';
import Avatar, { PIXELS_WIDE, PIXELS_TALL } from '../Avatar';

const pixelCount = dimension => Math.floor(dimension * 0.1067);

const AvatarGrid = () => {
  const [pixelCountWide, setPixelCountWide] = useState(
    pixelCount(window.innerWidth),
  );

  const [pixelCountTall, setPixelCountTall] = useState(
    pixelCount(window.innerHeight),
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setPixelCountWide(pixelCount(window.innerWidth));
      setPixelCountTall(pixelCount(window.innerHeight));
    }, false);
  });

  const horizontalCenter= Math.floor((pixelCountWide - PIXELS_WIDE) / 2);
  const verticalCenter = Math.floor((pixelCountTall - PIXELS_TALL) / 2);

  return (
    <div className='grid'>
      <div
        className='grid__avatar'
        style={{
          height: `${100 / pixelCountTall * PIXELS_TALL}%`,
          left: `${100 / pixelCountWide * horizontalCenter}%`,
          top: `${100 / pixelCountTall * verticalCenter}%`,
          width: `${100 / pixelCountWide * PIXELS_WIDE}%`,
        }}
      >
        <Avatar />
      </div>
      {
        new Array(pixelCountTall).fill(null).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className='grid__row'
            style={{
              height: `${100 / pixelCountTall}%`,
            }}
          >
            {
              new Array(pixelCountWide).fill(null).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className='grid__col'
                  style={{
                    width: `${100 / pixelCountWide}%`,
                  }}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

AvatarGrid.propTypes = {
};

export default AvatarGrid;
