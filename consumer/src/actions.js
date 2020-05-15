export const Action = Object.freeze({
    LoadOrder: 'LoadOrder',
    FinishAddingOrder: 'FinishAddingOrder',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingOrder: 'FinishSavingOrder',
    FinishDeletingOrder: 'FinishDeletingOrder',
});

export function loadOrder(order){
    return {
        type: Action.LoadOrder,
        payload: order,
    }
}

export function finishAddingOrder(order){
    return {
        type: Action.FinishAddingOrder,
        payload: order,
    }
}

export function finishSavingOrder(order){
    return {
        type: Action.FinishSavingOrder,
        payload: order,
    }
}

export function finishDeletingOrder(order){
    return {
        type: Action.FinishDeletingOrder,
        payload: order,
    }
}

export function enterEditMode(order){
    return {
        type: Action.EnterEditMode,
        payload: order,
    }
}

export function leaveEditMode(order){
    return {
        type: Action.LeaveEditMode,
        payload: order,
    }
}

export class Items {
    constructor(items){
        this.items = items;
    }
}

export class Amount {
    constructor(amount){
        this.amount = amount;
    }
}

export class Note {
    constructor(note){
        this.note = note;
    }
}

export class Urgent {
    constructor(urgent){
        this.urgent = urgent;
    }
}

export class OneOrder {
    constructor(items, amount, note, urgent){
        this.items = items;
        this.amount = amount;
        this.note = note;
        this.urgent = urgent;
    }
}

function checkForErrors(response) {
    if(!response.ok){
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = "https://qzydustin-api.duckdns.org:444";

export function loadAllOrders(){
    return dispatch =>{
        fetch(`${host}/allorders`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(loadOrder(data.orders));
                }
            })
            .catch(e => console.error(e));
    };
}

export function loadUrgent(){
    return dispatch =>{
        fetch(`${host}/urgent`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(loadOrder(data.orders));
                }
            })
            .catch(e => console.error(e));
    };
}

export function loadItems(items){
    return dispatch =>{
        fetch(`${host}/items/${items}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(loadOrder(data.orders));
                }
            })
            .catch(e => console.error(e));
    };
}



export function startAddingOrder(items, amount, note, urgent){
    const order = {items, amount, note, urgent};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    }
    return dispatch =>{
        fetch(`${host}/order`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    order.id = data.id;
                    dispatch(finishAddingOrder(order));
                }
                console.log(data);
            })
            .catch(e => console.error(e));
    };
}

export function updateOrder(order){
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    }
    return dispatch =>{
        fetch(`${host}/order/${order.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(finishSavingOrder(order));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startDeletingOrder(order){
    const options = {
        method: 'DELETE',
    };

    return dispatch =>{
        fetch(`${host}/order/${order.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(finishDeletingOrder(order));
                }
            })
            .catch(e => console.error(e));
    };
}