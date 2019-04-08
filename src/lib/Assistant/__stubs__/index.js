import Assistant from '../';
import difference from 'lodash/difference';

const VALID_PROPS = [
  'hunger',
  'boredom',
];

export const stubAssistant = (props) => {
  const propKeys = Object.keys(props);
  const unrecognizedKeys = difference(propKeys, VALID_PROPS);
  if (unrecognizedKeys.length) {
    throw new Error(`invalid props: ${unrecognizedKeys.join(', ')}`);
  }
  return new Assistant(props);
};

export const stubValidAssistant = props => stubAssistant({ hunger: 50, boredom: 50, ...props });

export const stubStarvingAssistant = props => stubValidAssistant({ hunger: 100, ...props });
export const stubFullAssistant = props => stubValidAssistant({ hunger: 0, ...props });

export const stubBoredAssistant = props => stubValidAssistant({ boredom: 100, ...props });
export const stubFulfilledAssistant = props => stubValidAssistant({ boredom: 0, ...props });
