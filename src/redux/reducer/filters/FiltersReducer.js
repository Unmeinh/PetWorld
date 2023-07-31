const initState = {
  search: '',
  idCategory: 0,
  filterProduct:{
    filterBy:[
      {id:1,name:'Được đề xuất',isSelected:true,icon:'heart-circle-outline'},
      {id:2,name:'Nổi bật',isSelected:false,icon:'fire'},
      {id:3,name:'Đánh giá',isSelected:false,icon:'star-outline'},
    ],
    filterByPrice:[
      {id:1,name:'Cao -> Thấp',isSelected:false},
      {id:2,name:'Thấp -> Cao',isSelected:false}
    ],
    filterOrder:[
      {id:1,name:'Khuyến mại',isSelected:false},
      {id:2,name:'Bán chạy',isSelected:false}
    ]
  }
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
