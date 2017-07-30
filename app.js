const { createStore } = require('redux');

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function increment(amount) {
  return {
    type: INCREMENT,
    amount,
  };
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

const addTriple = store => next => (action) => {
  action.amount *= 3;
  return next(action);
};

const addDouble = store => next => (action) => {
  action.amount *= 2;
  return next(action);
};

const addLog = store => next => (action) => {
  console.log('State before:', store.getState());
  console.log('Action:', action);

  const result = next(action);

  console.log('State after:', store.getState());

  return result;
};

function applyMiddleware(store, ...middlewares) {
  middlewares.reverse().forEach(middleware => store.dispatch = middleware(store)(store.dispatch));
}

const store = createStore(reducer);

applyMiddleware(store, addLog, addDouble, addTriple);

store.dispatch(increment(3));
