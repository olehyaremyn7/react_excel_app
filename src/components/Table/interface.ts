import { Table } from '../../excel/Table/Table';
import { TableSelection } from '../../excel/Table/TableSelection';
import { TableParts } from '../../redux/reducers/excel/interface';

export interface TableProps {
  table: Table;
  selection: TableSelection;
}

export enum TableResizeType {
  RESIZABLE = 'resizable',
  NOT_RESIZABLE = 'not-resizable',
}

export enum TablePartsDataAttributes {
  TABLE_PART = 'data-table-part',
  COLUMN_PART_POSITION = 'data-column-part-position',
  ROW_PART_POSITION = 'data-row-part-position',
  CELL_PART_POSITION = 'data-cell-part-position',
  TABLE_RESIZE_TYPE = 'data-table-resize-type',
  TABLE_RESIZE_PART = 'data-table-resize-part',
}

export interface RowPartAttributes {
  [TablePartsDataAttributes.TABLE_PART]: TableParts;
  [TablePartsDataAttributes.ROW_PART_POSITION]: number;
  [TablePartsDataAttributes.TABLE_RESIZE_TYPE]: TableResizeType;
}
