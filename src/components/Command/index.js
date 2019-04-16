import './index.css';
import React, {
  useState,
  createRef,
  useEffect,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';
import Text from '../Text';
import Button from '../Button';
import ClockContext from '../../contexts/ClockContext';
import { default as RemindPlugin } from '../../plugins/Remind';

const Command = ({ history, autoFocus }) => {
  const { addEvent } = useContext(ClockContext);
  const textarea = createRef(null);
  const [rawText, setRawText] = useState('');
  const [command, setCommand] = useState(null);

  const preprocessText = () => {
    const preprocessedText = new RemindPlugin({ addEvent, rawText }).getPreProcessedText();
    setCommand(
      preprocessedText
        .map(({ command }) => command)
        .filter(cmd => cmd)[0] || null,
    );
  };

  const debouncedPreprocessText = debounce(preprocessText, 200);

  const normalizeRawText = str => str.replace(/^\s+/, '').replace(/\n/g, ' ');

  const updateText = (e) => {
    const { value } = e.target;
    setRawText(normalizeRawText(value));
    debouncedPreprocessText();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { value } = e.target.elements['command-text'];
    const remind = new RemindPlugin({ addEvent, rawText: normalizeRawText(value) });
    const success = remind.execute();
    setRawText('');
    setCommand(null);
    if (success) {
      history.replace('/');
    }
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
              autoComplete='off'
              name='command-text'
              onChange={updateText}
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
                disabled={!command}
              >
                <Text>
                  { command || <span>&nbsp;</span> }
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
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const CommandContainer = withRouter(Command);

export default CommandContainer;
