import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RejectedError } from 'src/redux/interface';

import { excelAPI } from '../../../api';
import { Nullable } from '../../../interfaces';
import ExcelTypes from './actionTypes';
import {
  CellsDataPayload,
  CellsStylesPayload,
  FormulaPayload,
  ResizeState,
  TableState,
  ToolbarStyles,
} from './interface';

const { fetchById, update, remove } = excelAPI;

export const getTable = createAsyncThunk<Nullable<TableState>, string, RejectedError>(
  ExcelTypes.GET_TABLE,
  async (tableId, { rejectWithValue }) => {
    try {
      return await fetchById(tableId);
    } catch ({ message }) {
      return rejectWithValue(message as string);
    }
  },
);

export const saveTable = createAsyncThunk<void, TableState, RejectedError>(
  ExcelTypes.SAVE_TABLE,
  async (tableState, { rejectWithValue }) => {
    try {
      await update(tableState);
    } catch ({ message }) {
      return rejectWithValue(message as string);
    }
  },
);

export const deleteTable = createAsyncThunk<string, string, RejectedError>(
  ExcelTypes.DELETE_TABLE,
  async (tableId, { rejectWithValue }) => {
    try {
      return await remove(tableId);
    } catch ({ message }) {
      return rejectWithValue(message as string);
    }
  },
);

export const setError = createAction<string, ExcelTypes>(ExcelTypes.SET_ERROR);

export const changeTitle = createAction<string, ExcelTypes>(ExcelTypes.CHANGE_TITLE);

export const tableResize = createAction<ResizeState, ExcelTypes>(ExcelTypes.TABLE_RESIZE);

export const changeStyles = createAction<ToolbarStyles, ExcelTypes>(ExcelTypes.CHANGE_STYLES);

export const updateOpenedDate = createAction<void, ExcelTypes>(ExcelTypes.UPDATE_OPENED_DATE);

export const applyStyle = createAction<CellsStylesPayload, ExcelTypes>(ExcelTypes.APPLY_STYLE);

export const updateFormula = createAction<FormulaPayload, ExcelTypes>(ExcelTypes.UPDATE_FORMULA);

export const changeContent = createAction<CellsDataPayload, ExcelTypes>(ExcelTypes.CHANGE_CONTENT);
