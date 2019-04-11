import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { default as AppMenu } from '../AppMenu';
import AvatarGrid from '../AvatarGrid';

const Home = ({ history, appMenuOpen }) => (
  <div
    role='button'
    tabIndex='0'
    className='home'
    aria-label='Tap anywhere to open menu'
    onClick={() => {
      history.replace('/menu');
    }}
  >
    <section className='home__grid'>
      <AvatarGrid />
    </section>
    <section
      className={`home__menu ${appMenuOpen ? 'home__menu--open' : ''}`}
    >
      <AppMenu />
    </section>
  </div>
);

Home.propTypes = {
  appMenuOpen: PropTypes.bool,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const HomeContainer = withRouter(Home);

export default HomeContainer;
