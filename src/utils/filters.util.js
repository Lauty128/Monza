export function defineWhere(where, queries){
    if(queries.owner) where.userIdUser = queries.owner
    if(queries.mark) where.markIdMark = queries.mark
    if(queries.fuel) where.fuel = queries.fuel
    if(queries.type) where.type = queries.type

    return where
}