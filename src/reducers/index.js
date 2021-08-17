import { userReducer } from './userReducers';
import {combineReducers} from 'redux';
import { searchReducer } from './searchreducers';
import { cartReducer } from './cartreducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { codReducer } from './cod';


const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart : cartReducer,
    drawer : drawerReducer,
    coupon : couponReducer,
    cod : codReducer,
});
export default rootReducer ;
