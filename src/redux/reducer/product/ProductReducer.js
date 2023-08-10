import dataProduct from '../../../data/listproduct'
const initState = dataProduct
const listProductReducer = (state  = initState,action) =>{
    switch(action.type){
        default:
             return state;
    }
}

export default listProductReducer