const filtersType = {
    model:Number,
    model_gt:{ $gt:Number },
    model_lg:{ $lt:Number },
    fuel:String,
    mark:String
}

//------------ Modify <req.query> for get only the <find>
export function handlerFilters(filters){
    if(filters.sort) delete filters.sort
    if(filters.limit) delete filters.limit
    if(filters.page) delete filters.page

    return filters
}


//------------ Sort Types
export const sortTypes = {
    "pUP": {price:"asc"},
    "pDOWN": {price:"desc"},
    "mUP": {model:"asc"},
    "mDOWN": {model:"desc"},
    "dateUP": { date:"asc" },
    "dateDOWN": { date:"desc" },
    "vehiclesUP" : { vehicles:"asc" },
    "vehiclesDOWN" : { vehicles:"desc" }
}


//------------ Esto va en React. Una seccion de herramientas para los filtros.
//------------ Es una seccion aparte porque va a ser bastante largo
