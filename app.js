const { createStore, applyMiddleware } = require('redux');

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function increment(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        type: INCREMENT,
        amount,
      });
    }, 1000);
  });
}

function decrement(amount) {
  return {
    type: DECREMENT,
    amount,
  };
}

const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + action.amount };

    case DECREMENT:
      return { count: state.count - action.amount };

    default:
      return state;
  }
}

const promise = store => next => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }

  return next(action);
};

const store = createStore(reducer, applyMiddleware(promise));

store.subscribe(() => console.log(store.getState()));

store.dispatch(increment(3));
