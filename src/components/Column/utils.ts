import { CSSProperties } from 'react';

import { TableParts } from '../../redux/reducers/excel/interface';
import { toPixels } from '../../utils';
import { TablePartsDataAttributes, TableResizeType } from '../Table/interface';
import { ColumnPartAttributes } from './interface';

export const createColumnAttributes = (tableParts: TableParts, columnPosition: number): ColumnPartAttributes => ({
  [TablePartsDataAttributes.TABLE_PART]: tableParts,
  [TablePartsDataAttributes.COLUMN_PART_POSITION]: columnPosition,
  [TablePartsDataAttributes.TABLE_RESIZE_TYPE]: TableResizeType.RESIZABLE,
});

export const createColumnPartStyles = (width: number): CSSProperties => ({ width: toPixels(width) });
