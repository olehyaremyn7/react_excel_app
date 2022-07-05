import { NavigationKeys, TableCell } from '../../excel/interfaces';
import { ColumnPartAttributes } from '../Column/interface';
import { RowPartAttributes, TablePartsDataAttributes } from '../Table/interface';

export interface CellProps {
  cell: TableCell;
  selectCell(selectedCell: TableCell): void;
  selectCellsGroup(selectedCell: TableCell): void;
  changeFormulaValueAndUpdateCell(cellValue: string): void;
  navigateToNextSelectedCell(pressedKey: NavigationKeys): Promise<void>;
}

export interface CellPartAttributes
  extends ColumnPartAttributes,
    Pick<RowPartAttributes, TablePartsDataAttributes.ROW_PART_POSITION> {
  [TablePartsDataAttributes.CELL_PART_POSITION]: string;
}
