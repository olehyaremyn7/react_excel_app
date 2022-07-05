import { defaultStyles as styles } from './default';
import { ExcelState, TableState } from './interface';

export const initialState: ExcelState = {
  toolbar: {
    styles,
  },
  formula: {
    formulaValue: '',
    cellName: '',
  },
  table: {} as TableState,
  isLoading: false,
  error: null,
};
