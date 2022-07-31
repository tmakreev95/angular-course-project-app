import { Ingredient } from "../../../shopping-list/models/ingredient";
import * as ShoppingListActions from '../actions/shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    // editedIngredient: Ingredient;
    // editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    // editedIngredient: null,
    // editedIngredientIndex: -1
};

export function shoppingListReducer(
    state: State = initialState,
    action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }
}