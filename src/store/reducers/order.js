import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    order: [],
    loading: false,
    puchased: true,
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}
const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        order: state.order.concat(newOrder)
    });
}
const purchaseFail = (state, action) => {
    return updateObject(state, {loading: false});
}
const purchaseStart = (state, action) => {
    return updateObject(state, {loading: true});
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return purchaseInit(state, action);
        case actionType.PURCHASE_BURGER_SUCCESS:
            return purchaseSuccess(state, action);
        case actionType.PURCHASE_BURGER_FAIL:
            return purchaseFail(state, action);
        case actionType.PURCHASE_BURGER_START:
            return purchaseStart(state, action);
        case actionType.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
            }
        case actionType.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionType.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;