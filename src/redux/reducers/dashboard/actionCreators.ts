import { createAsyncThunk } from '@reduxjs/toolkit';
import { RejectedError } from 'src/redux/interface';

import { dashboardAPI } from '../../../api';
import DashboardTypes from './actionTypes';
import { TableRecord } from './interface';

const { fetch, create } = dashboardAPI;

export const getTableRecords = createAsyncThunk<TableRecord[], void, RejectedError>(
  DashboardTypes.GET_TABLES_RECORDS,
  async (_, { rejectWithValue }) => {
    try {
      return await fetch();
    } catch ({ message }) {
      return rejectWithValue(message as string);
    }
  },
);

export const createTable = createAsyncThunk<TableRecord, void, RejectedError>(
  DashboardTypes.CREATE_TABLE,
  async (_, { rejectWithValue }) => {
    try {
      return await create();
    } catch ({ message }) {
      return rejectWithValue(message as string);
    }
  },
);
