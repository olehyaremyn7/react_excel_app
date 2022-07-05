import { START_SELECTED_CELL_POSITION } from 'src/constants';
import { Nullable } from 'src/interfaces';
import { ToolbarStyles, ToolbarStylesKeys } from 'src/redux/reducers/excel/interface';

import { TablePartsDataAttributes } from '../../components/Table/interface';
import { modifyClassList } from '../../utils';
import { ITableSelection, NavigationKeys, TableCell, TableCellPosition, TableCells } from '../interfaces';
import {
  getRowIndex,
  isEnteredRowMoreThanCurrentRowCount,
  isTableBoundaries,
  range,
  transformColumnLetterToIndex,
} from '../utils';

export class TableSelection implements ITableSelection {
  private _$root: Nullable<HTMLDivElement> = null;
  private _currentSelectedCell: Nullable<TableCell> = null;
  private _selectedCellForGroup: Nullable<TableCell> = null;
  private _selectedCellsGroup: TableCell[] = [];
  readonly cells: TableCells = [];

  constructor(cells: TableCells) {
    this.cells = cells;
  }

  private clear(): void {
    if (this._selectedCellsGroup.length <= 0) {
      return;
    }

    for (const cell of this._selectedCellsGroup) {
      this.highlightSelectedCellRowAndColumn(cell, false);
      cell.select();
    }

    this._selectedCellForGroup = null;
    this._selectedCellsGroup = [];
  }

  private highlightSelectedCellRowAndColumn(selectedCell: TableCell, isHighlight: boolean): void {
    const { row, column } = selectedCell;

    const $row = this._$root?.querySelector(`[${TablePartsDataAttributes.ROW_PART_POSITION}="${row}"]`);
    const $column = this._$root?.querySelector(`[${TablePartsDataAttributes.COLUMN_PART_POSITION}="${column}"]`);

    if ($column && $row) {
      const [$rowInfo] = $row.children;
      const isRemove = !isHighlight;
      const classes = ['selected'];

      modifyClassList($rowInfo as HTMLDivElement, classes, isRemove);
      modifyClassList($column as HTMLDivElement, classes, isRemove);
    }
  }

  public getStartSelectedCell(): TableCell {
    const { row, column } = START_SELECTED_CELL_POSITION;

    return this.cells[row][column];
  }

  public getCellByColumnLetterAndRow(row: number, columnLetter: string): TableCell {
    const endCellRow = getRowIndex(isEnteredRowMoreThanCurrentRowCount(row, this.cells));
    const endCellColumn = transformColumnLetterToIndex(columnLetter);

    return this.cells[endCellRow][endCellColumn];
  }

  public selectCell(selectedCell: TableCell): void {
    this.clear();
    this._currentSelectedCell = selectedCell;
    this._selectedCellsGroup.push(selectedCell);
    this.highlightSelectedCellRowAndColumn(selectedCell, true);
    selectedCell.select();
  }

  public selectCellsGroup(selectedCell: TableCell): void {
    this.clear();
    this._selectedCellForGroup = selectedCell;

    const { row: selectedRow, column: selectedColumn } = selectedCell.position;
    const { row: currentRow, column: currentColumn } = this._currentSelectedCell?.position ?? ({} as TableCellPosition);
    const colsRange = range(currentColumn, selectedColumn);
    const rowsRange = range(currentRow, selectedRow);

    for (const column of colsRange) {
      for (const row of rowsRange) {
        const cell = this.cells[row][column];

        this.highlightSelectedCellRowAndColumn(cell, true);
        cell.select();
        this._selectedCellsGroup.push(cell);
      }
    }
  }

  public applyStyle(style: ToolbarStyles): void {
    for (const cell of this._selectedCellsGroup) {
      cell.applyStyles(style);
    }
  }

  public navigateToNextSelectedCell(pressedKey: NavigationKeys): Promise<TableCell> {
    return new Promise((resolve): void => {
      let { row, column } = this._currentSelectedCell?.position ?? ({} as TableCellPosition);

      switch (pressedKey) {
        case NavigationKeys.ENTER:
        case NavigationKeys.ArrowDown:
          row++;
          break;
        case NavigationKeys.TAB:
        case NavigationKeys.ArrowRight:
          column++;
          break;
        case NavigationKeys.ArrowLeft:
          column = column - 1;
          break;
        case NavigationKeys.ArrowUp:
          row = row - 1;
          break;
      }

      if (isTableBoundaries(this.cells, column, row)) {
        return;
      }

      const nextCell = this.cells[row][column];

      this.selectCell(nextCell);
      resolve(nextCell);
    });
  }

  public isCellInGroup({ column: selectedColumn, row: selectedRow }: TableCell): boolean {
    const { column: currentColumn, row: currentRow } = this._selectedCellForGroup ?? ({} as TableCell);

    return selectedColumn === currentColumn && selectedRow === currentRow;
  }

  public isCellSelected(cell: TableCell): boolean {
    return this._selectedCellsGroup.includes(cell);
  }

  public compareCellsByRowAndColumnLetter(row: number, columnLetter: string, compareWithGroup: boolean): boolean {
    const { row: currentRow, columnLetter: currentColumnLetter } =
      (compareWithGroup ? this._selectedCellForGroup : this._currentSelectedCell) ?? ({} as TableCell);
    const cellRow = getRowIndex(row);

    return currentRow === cellRow && currentColumnLetter === columnLetter;
  }

  public focusOnCurrentCell(): void {
    this._currentSelectedCell?.focus();
  }

  public updateCurrentCellValue(cellValue: string, isValueFromFormula: boolean): void {
    if (this._currentSelectedCell && cellValue !== this._currentSelectedCell.value) {
      if (isValueFromFormula) {
        this._currentSelectedCell.setValueFromFormula = cellValue;
      } else {
        this._currentSelectedCell.changeValue = cellValue;
      }
    }
  }

  public get selectedCellsGroupIds(): string[] {
    return this._selectedCellsGroup.map((cell: TableCell): string => cell.concatPosition);
  }

  public get currentCellAppliedStyles(): ToolbarStyles {
    const keys = Object.keys(this._currentSelectedCell?.styles!) as ToolbarStylesKeys[];

    return this._currentSelectedCell?.getAppliedStyles(keys) || ({} as ToolbarStyles);
  }

  public get currentCell(): Nullable<TableCell> {
    return this._currentSelectedCell;
  }

  public get currentCellValue(): string {
    return this._currentSelectedCell?.value!;
  }

  public get selectedCellsCount(): number {
    return this._selectedCellsGroup.length;
  }

  public get lastCellOnGroup(): Nullable<TableCell> {
    return this._selectedCellForGroup;
  }

  public set insertElementRef($table: HTMLDivElement) {
    this._$root = $table;
  }
}
