import React from 'react';
import { withRouter } from 'react-router-dom';

const TestMessage = ({ history }) => {
  const sendTestMessage = (e) => {
    e.preventDefault();
    const { value } = e.target.elements['test-message'];
    history.replace('/', { message: { title: value, body: value } });
  };

  return (
    <div className='test-message'>
      <form
        onSubmit={sendTestMessage}
        className='test-message__form'
      >
        <section>
          <section>
            <label htmlFor='test-message'>
              Test message
            </label>
          </section>
          <section>
            <textarea
              id='test-message'
              name='test-message'
              className='test-message__textarea'
            />
          </section>
        </section>
        <footer>
          <button type='submit'>Send test message</button>
        </footer>
      </form>
    </div>
  );
};

const TestMessageContainer = withRouter(TestMessage);

export default TestMessageContainer;
