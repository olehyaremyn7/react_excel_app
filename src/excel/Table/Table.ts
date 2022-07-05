import { CODES } from '../../constants';
import { TableState } from '../../redux/reducers/excel/interface';
import { Cell } from '../Cell/Cell';
import { Column } from '../Column/Column';
import { TableCell, TableCells, TableColumns, TableRow } from '../interfaces';
import { createCellPosition, createCellStyles, getWidth, isTableColumn } from '../utils';

export class Table {
  private _rowsCount: number = 0;
  private _columnsCount: number = 0;
  private _column: TableColumns = [];
  private _cells: TableCells = [];
  readonly state: TableState;

  constructor(state: TableState) {
    this.state = state;
    this.createTable();
  }

  public createTable(): void {
    const { rowsCount } = this.state;

    this._rowsCount = rowsCount;
    this.initColumnsCount();
    this.initCells();
  }

  public updateColumnWidth(column: number, width: number): void {
    this._column[column].changeWidth = width;

    for (const row of this._cells) {
      row[column].changeWidth = width;
    }
  }

  private initColumnsCount(): void {
    const { A, Z } = CODES;

    this._columnsCount = Z - A + 1;
  }

  private initCells(): void {
    const { columns: columnsState, cells: cellsState, styles: stylesState } = this.state;
    const { A } = CODES;

    this._cells = new Array(this._rowsCount).fill(Array(this._columnsCount).fill({})).map(
      (row: TableRow, rowIndex: number): TableRow =>
        row.map((_: TableCell, columnIndex: number): TableCell => {
          const isColumn = isTableColumn(rowIndex);
          const columnWord = String.fromCharCode(A + columnIndex);
          const width = getWidth(columnsState, columnIndex);

          if (isColumn) {
            this._column.push(new Column(columnIndex, columnWord, width));
          }

          const cellStateId = createCellPosition(rowIndex, columnIndex);
          const content = (cellsState[cellStateId] as string) ?? '';
          const styles = createCellStyles(stylesState[cellStateId]);

          return new Cell(columnIndex, rowIndex, columnWord, content, width, styles);
        }),
    );
  }

  public get column(): TableColumns {
    return this._column;
  }

  public get cells(): TableCells {
    return this._cells;
  }
}
