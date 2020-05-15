import {Action} from './actions';
const initialState = {
    isWaiting: false,
    
    orders : [],
};

function reducer(state = initialState, action){
    switch (action.type) {
        case Action.LoadOrder:
            return{
                ...state,
                orders: action.payload,
            };
        case Action.FinishAddingOrder:
            return{
                ...state,
                orders: [{...action.payload, isEditing: true}, ...state.orders],
            };
        case Action.EnterEditMode:
            return{
                ...state,
                orders: state.orders.map(order => {
                    if(order.id === action.payload.id){
                        return {...order, isEditing: true};
                    }else{
                        return order;
                    }
                }),
            };
        case Action.LeaveEditMode:
            return{
                ...state,
                orders: state.orders.map(order => {
                    if(order.id === action.payload.id){
                        return {...order, isEditing: undefined};
                    }else{
                        return order;
                    }
                }),
            };
        case Action.FinishSavingOrder:
            return{
                ...state,
                orders: state.orders.map(order => {
                    if(order.id === action.payload.id){
                        return action.payload;
                    }else{
                        return order;
                    }
                }),
            };
        case Action.FinishDeletingOrder:
            return{
                ...state,
                orders: state.orders.filter(order => order.id !== action.payload.id),
            };          
    default:
        return state;
    }
}

export default reducer;