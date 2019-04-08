import {
  stubAssistant,
  stubFullAssistant,
  stubBoredAssistant,
  stubValidAssistant,
  stubStarvingAssistant,
  stubFulfilledAssistant,
} from './__stubs__';

describe('Assistant', () => {
  it('should allow assignment of a hunger value', () => {
    const assistant = stubAssistant({ hunger: 0 });
    expect(assistant.hunger).toBe(0);
  });

  it('should express hunger as a number between 0 and 100, inclusive', () => {
    const hungerError = new Error('hunger must be a number between 0 and 100');
    const assistantWithNullHunger = stubValidAssistant({ hunger: null });
    expect(assistantWithNullHunger.errors.values().next().value).toEqual(hungerError);
    const assistantWithNegativeHunger = stubValidAssistant({ hunger: -1 });
    expect(assistantWithNegativeHunger.errors.values().next().value).toEqual(hungerError);
    const assistantWithOverOneHundredHunger = stubValidAssistant({ hunger: 101 });
    expect(assistantWithOverOneHundredHunger.errors.values().next().value).toEqual(hungerError);
    expect(stubFullAssistant().errors.size).toBe(0);
    expect(stubStarvingAssistant().errors.size).toBe(0);
  });

  it('should allow assignment of a boredom value', () => {
    const assistant = stubAssistant({ boredom: 0 });
    expect(assistant.boredom).toBe(0);
  });

  it('should express boredom as a number between 0 and 100, inclusive', () => {
    const boredomError = new Error('boredom must be a number between 0 and 100');
    const assistantWithNullBoredom = stubValidAssistant({ boredom: null });
    expect(assistantWithNullBoredom.errors.values().next().value).toEqual(boredomError);
    const assistantWithNegativeBoredom = stubValidAssistant({ boredom: -1 });
    expect(assistantWithNegativeBoredom.errors.values().next().value).toEqual(boredomError);
    const assistantWithOverOneHundredBoredom = stubValidAssistant({ boredom: 101 });
    expect(assistantWithOverOneHundredBoredom.errors.values().next().value).toEqual(boredomError);
    expect(stubFulfilledAssistant().errors.size).toBe(0);
    expect(stubBoredAssistant().errors.size).toBe(0);
  });
});
