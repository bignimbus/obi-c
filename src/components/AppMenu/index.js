import './index.css';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Text from '../Text';
import Button from '../Button';
import BlockstackContext, { LOADING } from '../../contexts/BlockstackContext';

const AppMenu = ({ history }) => {
  const {
    user,
    signIn,
    signOut,
    authState,
  } = useContext(BlockstackContext);

  const confirmSignOut = () => {
    if (!window.confirm('Sign out of blockstack?')) return;
    signOut();
  };

  return (
    <div
      role='button'
      tabIndex='0'
      className='app-menu'
      aria-label='tap to close menu'
      onClick={(e) => {
        e.stopPropagation();
        history.replace('/');
      }}
    >
      <div className='app-menu__container'>
        <nav className='app-menu__nav'>
          <header className='app-menu__header'>
            {
              user ?
                <div className='app-menu__badge-container profile-badge'>
                  <div className='profile-badge__container'>
                    <div
                      tabIndex='0'
                      role='button'
                      onClick={confirmSignOut}
                      className='profile-badge__img-container'
                    >
                      {
                        user.avatarUrl() ?
                          <img
                            src={user.avatarUrl()}
                            className='profile-badge__img'
                            alt={`${user.givenName()}'s profile picture`}
                          /> :
                          <div className='profile-badge__img profile-badge__img--monogram'>
                            <Text size='xl'>
                              { user.givenName().slice(0, 1) }
                            </Text>
                          </div>
                      }
                    </div>
                  </div>
                </div> :
                <div className='app-menu__badge-container profile-badge'>
                  <section className='profile-badge__container'>
                    <div className='profile-badge__button-container'>
                      <Button
                        onClick={signIn}
                        disabled={authState === LOADING}
                      >
                        <Text>
                          {
                            authState === LOADING ?
                              <span>Connecting...</span> :
                              <span>Connect to Blockstack</span>
                          }
                        </Text>
                      </Button>
                    </div>
                  </section>
                  <footer className='profile-badge__learn-more-container'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text text--sm'
                      href='https://blockstack.org/about/'
                    >
                      Learn more
                    </a>
                  </footer>
                </div>
            }
          </header>
          <section className='app-menu__main'>
            <div className='app-menu__command'>
              Command goes here
            </div>
          </section>
        </nav>
      </div>
    </div>
  );
};

AppMenu.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const AppMenuContainer = withRouter(AppMenu);

export default AppMenuContainer;
