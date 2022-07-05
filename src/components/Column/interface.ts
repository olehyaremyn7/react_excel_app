import { MouseEvent } from 'react';

import { TableColumn } from '../../excel/interfaces';
import { TableParts } from '../../redux/reducers/excel/interface';
import { TablePartsDataAttributes, TableResizeType } from '../Table/interface';

export interface ColumnProps {
  column: TableColumn;
  onMouseDownResize(event: MouseEvent<HTMLDivElement>): Promise<void>;
}

export interface ColumnPartAttributes {
  [TablePartsDataAttributes.TABLE_PART]: TableParts;
  [TablePartsDataAttributes.COLUMN_PART_POSITION]: number;
  [TablePartsDataAttributes.TABLE_RESIZE_TYPE]: TableResizeType;
}
