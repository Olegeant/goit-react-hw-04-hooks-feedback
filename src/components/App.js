import React, { useReducer } from 'react';

import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

const App = () => {
  const OPTIONS = ['good', 'neutral', 'bad'];
  const POSITIVE = ['good'];

  const INITIAL_STATE = OPTIONS.reduce(
    (acc, option) => ({ ...acc, [option]: 0 }),
    {},
  );

  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  function stateReducer(state, action) {
    return { ...state, [action.type]: state[action.type] + action.payload };
  }

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, val) => acc + val);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const positive = Object.entries(state).reduce(
      (acc, [key, value]) => (POSITIVE.includes(key) ? acc + value : acc),
      0,
    );

    return total === 0 ? 0 : Math.round((positive / total) * 100);
  };

  const total = countTotalFeedback();
  const positive = countPositiveFeedbackPercentage();
  const feedbackStats = state;

  return (
    <>
      <h1>goit-react-hw-02-feedback</h1>

      <Section title="Please leave feedback">
        <FeedbackOptions options={OPTIONS} onLeaveFeedback={dispatch} />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            {...feedbackStats}
            total={total}
            positivePercentage={positive}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </>
  );
};

export default App;
