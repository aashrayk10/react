import * as actionTypes from './actions';
const initialState = {
   ingredients: null,
   totalPrice: 4
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ){

        case actionTypes.ADD_INGREDIENT: return purchaseStart( state, action );
        
        case actionTypes.REMOVE_INGREDIENT: return purchaseInit( state, action );
            
        default: return state;
    }
};

export default reducer;
