import { createReducer } from '@reduxjs/toolkit';

import { DEFAULT_TABLE_TITLE } from '../../../constants';
import { getCurrentDate } from '../../../utils';
import {
  applyStyle,
  changeContent,
  changeStyles,
  changeTitle,
  deleteTable,
  getTable,
  saveTable,
  setError,
  tableResize,
  updateFormula,
  updateOpenedDate,
} from './actionCreators';
import { initialState } from './initialState';
import { TableState } from './interface';
import {
  detectTableStateFieldByResizeType,
  transformStylesToTablePartsValue,
  transformToTablePartsValue,
} from './utils';

const excelReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeTitle, (state, { payload }) => {
    state.table.title = payload ? payload : DEFAULT_TABLE_TITLE;
  });
  builder.addCase(tableResize, (state, { payload }) => {
    const { table } = state;
    const { type } = payload;
    const field: keyof TableState = detectTableStateFieldByResizeType(type);

    state.table[field] = transformToTablePartsValue(table, field, payload);
  });
  builder.addCase(updateFormula, (state, { payload }) => {
    const { formulaValue, cellName } = payload;

    state.formula.formulaValue = formulaValue;
    state.formula.cellName = cellName;
  });
  builder.addCase(changeContent, (state, { payload }) => {
    const { table } = state;
    const { value } = payload;

    state.formula.formulaValue = value;
    state.table.cells = transformToTablePartsValue(table, 'cells', payload);
  });
  builder.addCase(changeStyles, (state, { payload }) => {
    state.toolbar.styles = payload;
  });
  builder.addCase(applyStyle, (state, { payload }) => {
    const {
      table: { styles: tableStyles },
      toolbar: { styles: toolbarStyles },
    } = state;
    const { style } = payload;

    state.table.styles = transformStylesToTablePartsValue(tableStyles, payload);
    state.toolbar.styles = { ...toolbarStyles, ...style };
  });
  builder.addCase(updateOpenedDate, (state) => {
    state.table.openedDate = getCurrentDate();
  });
  builder.addCase(setError, (state, { payload }) => {
    state.error = payload;
  });
  builder.addCase(getTable.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getTable.fulfilled, (state, { payload }) => {
    state.isLoading = false;

    if (payload) {
      state.table = payload;
      state.error = null;
    }
  });
  builder.addCase(getTable.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.table = {} as TableState;

    if (payload) {
      state.error = payload;
    }
  });
  builder.addCase(saveTable.rejected, (state, { payload }) => {
    state.table = {} as TableState;

    if (payload) {
      state.error = payload;
    }
  });
  builder.addCase(deleteTable.fulfilled, (state) => {
    state.table = {} as TableState;
  });
  builder.addCase(deleteTable.rejected, (state, { payload }) => {
    state.table = {} as TableState;

    if (payload) {
      state.error = payload;
    }
  });
});

export default excelReducer;
