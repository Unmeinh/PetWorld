const initState ={
    search:""
}
const searchFilterReducer = (state  = initState, action) =>{
    switch(action.type){
        case "filter/searchFilterChanged":
            return{
                ...state,
                search:action.payload
            }

        default:
            return state;
    }
}
export default searchFilterReducer