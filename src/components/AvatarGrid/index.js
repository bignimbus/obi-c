import './index.css';
import React, { Fragment } from 'react';
import Avatar, { PIXELS_WIDE, PIXELS_TALL } from '../Avatar';

const NARROW_SCREEN_PIXEL_COUNT = 40;
const SHORT_SCREEN_PIXEL_COUNT = 67;

const AvatarGrid = () => {
  return (
    <div className='grid'>
      <div
        className='grid__avatar'
        style={{
          height: `calc(100% / ${SHORT_SCREEN_PIXEL_COUNT} * ${PIXELS_TALL})`,
          width: `calc(100% / ${NARROW_SCREEN_PIXEL_COUNT} * ${PIXELS_WIDE})`,
        }}
      >
        <Avatar />
      </div>
      {
        new Array(SHORT_SCREEN_PIXEL_COUNT).fill(null).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className='grid__row'
            style={{
              height: `calc(100% / ${SHORT_SCREEN_PIXEL_COUNT})`,
            }}
          >
            {
              new Array(NARROW_SCREEN_PIXEL_COUNT).fill(null).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className='grid__col'
                  style={{
                    width: `calc(100% / ${NARROW_SCREEN_PIXEL_COUNT})`,
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
