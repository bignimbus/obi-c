import Model from '../Model';

const HUNGER_ERROR_MESSAGE = 'hunger must be a number between 0 and 100';
const MAX_HUNGER = 100;
const MIN_HUNGER = 0;

const BOREDOM_ERROR_MESSAGE = 'boredom must be a number between 0 and 100';
const MAX_BOREDOM = 100;
const MIN_BOREDOM = 0;

class Assistant extends Model {
  init ({
    hunger,
    boredom,
  }) {
    Object.assign(this, {
      hunger: parseFloat(hunger),
      boredom: parseFloat(boredom),
    });
    this.validateHunger();
    this.validateBoredom();
  }

  validateHunger () {
    const { hunger } = this;
    if (hunger >= MIN_HUNGER && hunger <= MAX_HUNGER) return;
    this.errors = HUNGER_ERROR_MESSAGE;
  }

  validateBoredom () {
    const { boredom } = this;
    if (boredom >= MIN_BOREDOM && boredom <= MAX_BOREDOM) return;
    this.errors = BOREDOM_ERROR_MESSAGE;
  }
}

export default Assistant;
