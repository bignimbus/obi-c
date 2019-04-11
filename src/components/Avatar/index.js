import './index.css';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const PIXELS_WIDE = 12;
export const PIXELS_TALL = 13;

const HEAD = [
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
  [2, 7],
  [3, 7],
  [4, 7],
  [5, 7],
  [6, 7],
  [7, 7],
  [8, 7],
  [9, 7],
];

const EYES = [
  [4, 2],
  [6, 2],
];

const MOUTH = [
  [7, 4],
  [6, 5],
  [5, 5],
  [4, 5],
  [3, 4],
];

const TORSO = [
  [5, 8],
  [5, 9],
  [5, 10],
  [5, 11],
];

const LEFT_ARM = [
  [4, 9],
  [3, 9],
];

const RIGHT_ARM = [
  [6, 9],
  [7, 9],
];

const LEFT_FOOT = [
  [4, 12],
  [3, 12],
  [2, 12],
];

const RIGHT_FOOT = [
  [6, 12],
  [7, 12],
  [8, 12],
];

const Pixel = ({ x, y, modifier }) => (
  <div
    className={`avatar__pixel ${modifier}`}
    style={{
      left: `${100 / PIXELS_WIDE * x}%`,
      height: `${100 / PIXELS_TALL}%`,
      top: `${100 / PIXELS_TALL * y}%`,
      width: `${100 / PIXELS_WIDE}%`,
    }}
  >
    <div className='avatar__inner-pixel' />
  </div>
);

Pixel.propTypes = {
  modifier: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

const Avatar = () => {
  return (
    <div className='avatar avatar--waiting'>
      {
        [
          [HEAD, 'head'],
          [EYES, 'eyes'],
          [MOUTH, 'mouth'],
          [TORSO, 'torso'],
          [LEFT_ARM, 'left-arm'],
          [RIGHT_ARM, 'right-arm'],
          [LEFT_FOOT, 'left-foot'],
          [RIGHT_FOOT, 'right-foot'],
        ].map(([coords, modifier], i) => (
          <Fragment key={i}>
            {
              coords.map(([x, y], j) => (
                <Pixel x={x} y={y} key={j} modifier={`avatar__pixel--${modifier}`} />
              ))
            }
          </Fragment>
        ))
      }
    </div>
  );
};

export default Avatar;
