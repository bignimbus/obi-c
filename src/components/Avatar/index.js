import './index.css';
import React, { useState } from 'react';

export const PIXELS_WIDE = 12;
export const PIXELS_TALL = 13;

const STILL_SPRITE = [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [10, 1],
  [10, 2],
  [10, 3],
  [10, 4],
  [10, 5],
  [10, 6],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
  [9, 0],
  [4, 2],
  [6, 2],
  [7, 4],
  [6, 5],
  [5, 5],
  [4, 5],
  [3, 4],
  [2, 7],
  [3, 7],
  [4, 7],
  [5, 7],
  [6, 7],
  [7, 7],
  [8, 7],
  [9, 7],
  [5, 8],
  [5, 9],
  [6, 9],
  [7, 9],
  [4, 9],
  [3, 9],
  [5, 10],
  [5, 11],
  [6, 12],
  [7, 12],
  [8, 12],
  [4, 12],
  [3, 12],
  [2, 12],
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
