import './index.css';
import React, { useState } from 'react';

export const PIXELS_WIDE = 12;
export const PIXELS_TALL = 13;

const STILL_SPRITE = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [0, 9],
  [0, 10],
  [0, 11],
  [0, 12],
  [1, 12],
  [2, 12],
  [3, 12],
  [4, 12],
  [5, 12],
  [6, 12],
  [7, 12],
  [8, 12],
  [9, 12],
  [10, 12],
  [11, 12],
  [11, 0],
  [11, 1],
  [11, 2],
  [11, 3],
  [11, 4],
  [11, 5],
  [11, 6],
  [11, 7],
  [11, 8],
  [11, 9],
  [11, 10],
  [11, 11],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
  [9, 0],
  [10, 0],
  [4, 4],
  [6, 4],
];

const Avatar = () => {
  const [sprite, setSprite] = useState(STILL_SPRITE);
  return (
    <div className='avatar'>
      {
        sprite.map(([x, y], i) => (
          <div
            key={i}
            className='avatar__pixel'
            style={{
              left: `calc(100% / ${PIXELS_WIDE} * ${x}`,
              height: `calc(100% / ${PIXELS_TALL})`,
              top: `calc(100% / ${PIXELS_TALL} * ${y})`,
              width: `calc(100% / ${PIXELS_WIDE})`,
            }}
          />
        ))
      }
    </div>
  );
};

export default Avatar;
