import {combineReducers} from 'redux';
import {authentication} from './authentication.reducer';
import { dashboard_data } from './dashboard_data.reducer';
import { notifications } from './notifications.reducer';
const rootReducer = combineReducers({
        authentication,
        dashboard: dashboard_data,
        notifications,
});
export default rootReducer;
