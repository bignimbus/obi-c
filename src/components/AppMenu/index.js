import './index.css';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import BlockstackContext, { LOADING } from '../../contexts/BlockstackContext';

const AppMenu = ({ history }) => {
  const {
    user,
    signIn,
    authState,
  } = useContext(BlockstackContext);

  return (
    <div
      role='button'
      tabIndex='0'
      className='app-menu'
      aria-label='tap to close menu'
      onClick={history.goBack}
    >
      <div className='app-menu__container'>
        <nav className='app-menu__nav'>
          <header className='app-menu__header'>
            {
              user ?
                <div>
                  { user.givenName() }
                </div> :
                <div>
                  <section>
                    <button
                      onClick={signIn}
                      disabled={authState === LOADING}
                    >
                      {
                        authState === LOADING ?
                          <span>Connecting to Blockstack...</span> :
                          <span>Connect to Blockstack</span>
                      }
                    </button>
                  </section>
                  <footer>
                    <button>
                      Learn more
                    </button>
                  </footer>
                </div>
            }
          </header>
          <section className='app-menu__section'>
            <ul className='app-menu__ul'>
              {
                [
                  ['Remind me', 'remind'],
                  ['Feed obi-c', 'feed'],
                  ['Play with obi-c', 'play'],
                ].map(([text, route]) => (
                  <li
                    key={route}
                    className='app-menu__li'
                  >
                    <Link
                      replace
                      to={route}
                    >
                      { text }
                    </Link>
                  </li>
                ))
              }
            </ul>
          </section>
        </nav>
      </div>
    </div>
  );
};

AppMenu.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const AppMenuContainer = withRouter(AppMenu);

export default AppMenuContainer;
