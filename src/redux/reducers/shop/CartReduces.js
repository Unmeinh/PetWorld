const initState = [
  {
    idProduct: 'f3n2p1s7',
    idUser: '123',
    createAt: '14/8/2023',
    amount: 88,
    isSelect: false,
  },
  {
    idProduct: 'o4s8c7z3',
    idUser: '123',
    createAt: '14/8/2023',
    amount: 3,
    isSelect: false,
  },
  {
    idProduct: 'v5w4x3u2',
    idUser: '123',
    createAt: '14/8/2023',
    amount: 3,
    isSelect: false,
  },
];
const listCartReducer = (state = initState, action) => {
  switch (action.type) {
    case 'cart/addCart':
      return [...initState, action.payload];
    case 'cart/plusProduct':
      return state.map(cart => {
        if (cart.idProduct === action.payload) {
          if (cart.amount < 99) return {...cart, amount: cart.amount + 1};
          else return cart;
        } else {
          return cart;
        }
      });
    case 'cart/minusProduct':
      return state.map((cart, index) => {
        if (cart.idProduct === action.payload) {
          if (cart.amount > 1) {
            return {...cart, amount: cart.amount - 1};
          } else {
            return state.splice(index, 1);
          }
        } else {
          return cart;
        }
      });
    case 'cart/selectItem':
      const selectedIds = action.payload.map(itemAction => itemAction.id);
      const updatedState = state.map(item => {
        if (selectedIds.includes(item.id)) {
          return {...item, isSelect: true};
        } else {
          return {...item, isSelect: false};
        }
      });
      return updatedState;
    default:
      return state;
  }
};
export default listCartReducer;
