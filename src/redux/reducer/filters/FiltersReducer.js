const initState = {
  search: '',
  idCategory: 0,
};
const searchFilterReducer = (state = initState, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'filter/searchFilterChanged':
      return {
        ...state,
        search: action.payload,
      };
    case 'filter/selectIdCategory':
      return {
        ...state,
        idCategory: action.payload,
      };
    default:
      return state;
  }
};
export default searchFilterReducer;
