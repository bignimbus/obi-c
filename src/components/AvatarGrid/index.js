import './index.css';
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Avatar, { PIXELS_WIDE, PIXELS_TALL } from '../Avatar';

const pixelCount = dimension => Math.floor(dimension * 0.1067);

const AvatarGrid = ({ messageStatus }) => {
  const container = useRef(null);

  const getDimensions = () => (
    container && container.current ?
      { width: container.current.clientWidth, height: container.current.clientHeight } :
      { width: window.innerWidth, height: window.innerHeight }
  );

  const [pixelCountWide, setPixelCountWide] = useState(
    pixelCount(getDimensions().width),
  );

  const [pixelCountTall, setPixelCountTall] = useState(
    pixelCount(getDimensions().height),
  );

  const setDimensions = () => {
    setPixelCountWide(pixelCount(getDimensions().width));
    setPixelCountTall(pixelCount(getDimensions().height));
  };

  useEffect(() => {
    setDimensions();
    window.addEventListener('resize', setDimensions, false);
    return () => {
      window.removeEventListener('resize', setDimensions, false);
    };
  });

  const horizontalCenter= Math.floor((pixelCountWide - PIXELS_WIDE) / 2);
  const verticalCenter = Math.floor((pixelCountTall - PIXELS_TALL) / 2);

  return (
    <div
      className={`
        grid
        ${messageStatus ? `grid--message-${messageStatus}` : ''}
      `}
      ref={container}
    >
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
  messageStatus: PropTypes.string,
};

export default AvatarGrid;
