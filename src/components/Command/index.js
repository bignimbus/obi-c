import './index.css';
import React, {
  useState,
  createRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import Button from '../Button';

const Command = ({ autoFocus }) => {
  const textarea = createRef(null);
  const [rawText, setRawText] = useState('');

  const updateRawText = (e) => {
    const { value } = e.target;
    setRawText(value.replace(/\n/g, ' '));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!autoFocus) return;
    textarea.current.focus();
  });

  return (
    <div className='command'>
      <form
        onSubmit={onSubmitForm}
        className='command__form'
      >
        <div>
          <section>
            <textarea
              rows='5'
              ref={textarea}
              value={rawText}
              id='command-text'
              name='command-text'
              onChange={updateRawText}
              placeholder='Remind me to try this out in one minute'
              className='
                command__textarea
                text
                text--lg
                text--inverted-darker
              '
            />
          </section>
          <footer className='command__footer'>
            <div className='command__button-container'>
              <Button
                type='submit'
                disabled={!rawText}
              >
                <Text>
                  OK
                </Text>
              </Button>
            </div>
          </footer>
        </div>
      </form>
    </div>
  );
};

Command.propTypes = {
  autoFocus: PropTypes.bool,
};

export default Command;
