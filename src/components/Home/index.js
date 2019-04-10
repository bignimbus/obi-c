import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { default as AppMenu } from '../AppMenu';

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
    <section
      style={{
        display: appMenuOpen ? 'block' : 'none',
      }}
    >
      <AppMenu />
    </section>
    <section>
      Home
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
