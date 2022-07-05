import { combineReducers } from '@reduxjs/toolkit';

import dashboardReducer from './dashboard/reducer';
import excelReducer from './excel/reducer';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  excel: excelReducer,
});

export default rootReducer;
