import dataPet from '../../../data/listpet'
const initState = dataPet
const listPetReducer = (state  = initState,action) =>{
    switch(action.type){
        default:
             return state;
    }
}

export default listPetReducer