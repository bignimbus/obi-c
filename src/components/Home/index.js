import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { default as AppMenu } from '../AppMenu';
import Messages from '../Messages';
import AvatarGrid from '../AvatarGrid';

const Home = ({
  history,
  location,
  hasMessage,
  appMenuOpen,
}) => (
  <div className='home'>
    <section className='home__container'>
      <section
        tabIndex='0'
        role='button'
        className='home__grid'
        aria-label='Tap anywhere to open menu'
        onClick={() => {
          history.replace('/menu');
        }}
      >
        <AvatarGrid />
      </section>
      <section className='home__message'>
        <Messages />
      </section>
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
  location: PropTypes.shape({
    state: PropTypes.shape({
      message: PropTypes.shape({
        body: PropTypes.string,
        title: PropTypes.string,
      }),
    }),
  }).isRequired,
};

const HomeContainer = withRouter(Home);

export default HomeContainer;
