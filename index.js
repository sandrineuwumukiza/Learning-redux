const redux = require("redux");
const CreateStore = redux.CreateStore();
const combineReducers = redux.combineReducers;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware();

// Learning Redux
//Redux Action
// Buy cake example

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
// Action is an object with a type property
// example of action

// {
//   type: BUY_CAKE;
//   info: "first reduct action";
// }
//An action creator is a function which return an action

function BuyCake() {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}

function buyIcecream() {
  return {
    type: BUY_ICECREAM,
  };
}
//Reducers:specify how app's state change response to action sent to the store
//Reducer is also a function which accept state and actions as argument and the return the next state of the application
// (previousState,action) =>nextState

// const initialState = {
//   numberOfCakes: 10,
//   numberOfIceCreams: 20,
// };

const initilCakeState = {
  numberOfCakes: 10,
};

const initialIcecreamState = {
  numberOfIceCreams: 20,
};

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numberOfCakes: state.numberOfCakes - 1,
//       };
//     case BUY_ICECREAM:
//       return {
//         ...state,
//         numberOfIceCreams: state.numberOfIceCreams - 1,
//       };
//     default:
//       return state;
//   }
// };

// using multiple reducer

const cakeReducer = (state = initilCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    default:
      return state;
  }
};

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - 1,
      };
    default:
      return state;
  }
};
// Redux Store:one store of entire application
// it is respondible fror:
//   holds application state
//   Allows access  to state via getState()
//   Allows state to be updated via dispatch(action)
// registers listeners via subscribe(listener)
// handles unregistering listener via the function returned by subscribe(listener)

const rootReducer = combineReducers({
  Cake: cakeReducer,
  IceCream: icecreamReducer,
});
const store = CreateStore(rootReducer, applyMiddleware(logger));
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(
  () => {}
  // Middleware is sugest way to extend redux with custom functionality
  // it also provides third-party extension pointbtn dispatching action and the moment it reaches reducers
  // after applying middleware we remove console.log
  // console.log("updated state", store.getState())
);
store.dispatch(BuyCake());
store.dispatch(BuyCake());
store.dispatch(BuyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe();

//syn Action whenever you dispatch action the state also were updated
//asyn action asyn API fetch data from end point to be used in your application
//Application we have three part 1.state 2.action 3.Reducers
// state we loading data is used to display the spinner in your component
//data this have an empety array which wait to full it with the list of users
// error this is error message which sent to users whenever they find error during fetching an API
//ACTION:FETCH_USERS_REQUEST:Fetch the list of users
//FETCH_USERS_SUCCESS:Fetched successfully
//FETCH_USERS_FAILURE:error fetching data
//Reducers:case:FETCH_USERS_REQUEST loading:true
// case:FETCH_USERS_SUCCESS loading :false;users:data(from API)
//case:FETCH_USERS_FAILURE loading:false;error:error(from API)
