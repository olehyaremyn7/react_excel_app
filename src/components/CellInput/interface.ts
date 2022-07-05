export interface CellInputProps {
  currentCellName: string;
  getPrevCellName(): string;
  selectCellByColumnLetterAndRow(row: number, columnLetter: string): void;
  selectCellsGroupByColumnLetterAndRow(startCell: [string, number], endCell: [string, number]): void;
}
