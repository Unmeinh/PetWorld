export const searchFilterAction = (text) =>{
    return {
        type: "filter/searchFilterChanged"
        ,payload: text
    }
}