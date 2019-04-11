import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { default as AppMenu } from '../AppMenu';
import { default as TestMessage } from '../TestMessage';
import AvatarGrid from '../AvatarGrid';

const Home = ({
  history,
  location,
  hasMessage,
  appMenuOpen,
  testMessageOpen,
}) => (
  <div className='home'>
    <section
      role='button'
      tabIndex='0'
      className='home__container'
      aria-label='Tap anywhere to open menu'
      onClick={() => {
        history.replace('/menu');
      }}
    >
      <section className='home__grid'>
        <AvatarGrid />
      </section>
      <section className='home__message'>
        {
          location.state &&
            location.state.message &&
              location.state.message.title
        }
      </section>
    </section>
    <section
      className={`home__menu ${appMenuOpen ? 'home__menu--open' : ''}`}
    >
      <AppMenu />
    </section>
    <section
      className={`home__test-message ${testMessageOpen ? 'home__test-message--open' : ''}`}
    >
      <TestMessage />
    </section>
  </div>
);

Home.propTypes = {
  appMenuOpen: PropTypes.bool,
  testMessageOpen: PropTypes.bool,
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
