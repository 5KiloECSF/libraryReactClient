export const removeItem = (
    items,
    newItem
) => {
    const exists = items.find(itm => itm.id === newItem.id);

    if (exists) {
        items = items.filter(itm => itm.id !== newItem.id);
    }
    return items;
};

export const updateItem = (
    items,
    newItem
) => {
    const exists = items.find(question => question.id === newItem.id);

    if (exists) {
        items = items.map(itm =>
            itm.id === newItem.id ? newItem : itm
        );
    }
    return items;
};

export const LOG_g = (name, value) => ({
    type: `LOGGING-->${name}`,
    name,
    value
});
export const Status = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    NORMAL: 'NORMAL',
    LOADING: 'LOADING',
}
export const Query = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ONE: 'FETCH_ONE',
    FETCH: "FETCH",
    SIGNUP: "SIGNUP",
    LOGIN: "LOGIN"
}


export interface ActionError{
    error:Error,
    queryType:string
}
export const RemoveEmptyFields = (oldObj) => {
    // log_func("obj=", obj)
    const newObj = {};
    //Iterates over each key in the object- may be too much
    Object.keys(oldObj).forEach(el => {
        // console.log("el=", el, allowedFields)
        if (oldObj[el]) newObj[el] = oldObj[el];
    });
    console.log("new", newObj)
    return newObj;
};
