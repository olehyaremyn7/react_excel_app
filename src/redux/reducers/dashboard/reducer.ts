import { createReducer } from '@reduxjs/toolkit';

import { createTable, getTableRecords } from './actionCreators';
import { initialState } from './initialState';

const dashboardReducer = createReducer(initialState, (builder) => {
  builder.addCase(createTable.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createTable.fulfilled, (state) => {
    state.isLoading = false;
    state.error = null;
  });
  builder.addCase(createTable.rejected, (state, { payload }) => {
    state.isLoading = false;

    if (payload) {
      state.error = payload;
    }
  });
  builder.addCase(getTableRecords.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getTableRecords.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.records = payload;
    state.error = null;
  });
  builder.addCase(getTableRecords.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.records = [];

    if (payload) {
      state.error = payload;
    }
  });
});

export default dashboardReducer;
