import { isResizeTypeColumn } from '../../../excel/utils';
import { CellsStylesPayload, CellsStylesState, TableParts, TablePartsState, TableState } from './interface';

export const transformToTablePartsValue = (
  table: TableState,
  field: keyof Pick<TableState, 'columns' | 'rows' | 'cells'>,
  { id, value }: { id: number | string; value: string | number },
): TablePartsState => {
  const prevPartValue = table[field] || {};

  prevPartValue[id] = value;

  return prevPartValue;
};

export const transformStylesToTablePartsValue = (
  styles: CellsStylesState,
  { ids, style }: CellsStylesPayload,
): CellsStylesState => {
  const prevStyles = styles ?? {};

  for (const id of ids) {
    prevStyles[id] = { ...prevStyles[id], ...style };
  }

  return prevStyles;
};

export const detectTableStateFieldByResizeType = (type: TableParts): keyof Pick<TableState, 'columns' | 'rows'> =>
  isResizeTypeColumn(type) ? 'columns' : 'rows';
