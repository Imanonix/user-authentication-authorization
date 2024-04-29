import { configureStore } from '@reduxjs/toolkit'
/*import { CartSlice } from './CartSlice'*/
import authReducer from './authSlice'; // Correct import
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


export const store = configureStore({
    reducer: {
        /*cart: CartSlice.reducer,*/
        auth: authReducer
    },
    devTools: true
})

/*export default store;*/
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;