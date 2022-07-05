import { TableParts } from '../../redux/reducers/excel/interface';
import { createUID } from '../../utils';

export class Column {
  private _width: number;
  readonly TABLE_PART: TableParts = TableParts.COLUMN;
  readonly columnId: number;
  readonly columnLetter: string;
  readonly id: string;

  constructor(columnId: number, columnLetter: string, width: number) {
    this.columnId = columnId;
    this.columnLetter = columnLetter;
    this._width = width;
    this.id = createUID();
  }

  public get width(): number {
    return this._width;
  }

  public set changeWidth(width: number) {
    this._width = width;
  }

  public get columnName(): string {
    const { columnLetter, columnId } = this;

    return `${columnLetter}${columnId}`;
  }
}
