import { RootState } from '../../interface';
import { ExcelState, FormulaState, TableState, ToolbarState } from './interface';

export const excelSelector = ({ excel }: RootState): ExcelState => excel;

export const headerSelector = ({
  excel: {
    table: { id, title },
  },
}: RootState): Pick<TableState, 'id' | 'title'> => ({ id, title });

export const toolbarSelector = ({ excel: { toolbar } }: RootState): ToolbarState => toolbar;

export const formulaSelector = ({ excel: { formula } }: RootState): FormulaState => formula;
