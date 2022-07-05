import React, { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useEffect, useRef } from 'react';
import { createCellName, isInGroupOneCell, shouldUpdateCellInFormula } from 'src/excel/utils';

import { FormulaEventKeys, TableCell } from '../../excel/interfaces';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSESelector } from '../../hooks/useAppSelector';
import { JSX, Nullable } from '../../interfaces';
import { changeContent, changeStyles, updateFormula } from '../../redux/reducers/excel/actionCreators';
import { formulaSelector } from '../../redux/reducers/excel/selectors';
import { debounce, setTextContent } from '../../utils';
import CellInput from '../CellInput';
import ContentEditable from '../UI/ContentEditable';
import Separator from '../UI/Separator';
import { FormulaProps } from './interface';
import classes from './styles.module.scss';
import { compareFormulaTextContentWithValue } from './utils';

const Formula: FC<FormulaProps> = ({ selection }): JSX => {
  const { formulaValue, cellName } = useAppSESelector(formulaSelector);
  const formulaRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (!compareFormulaTextContentWithValue(formulaRef.current, formulaValue)) {
      setTextContent(formulaRef.current, formulaValue);
    }
  }, [formulaValue]);

  const onInputHandler = ({ currentTarget: { textContent: text } }: ChangeEvent<HTMLDivElement>): void => {
    if (selection.currentCell) {
      selection.updateCurrentCellValue(text as string, true);
      updateCurrentCellValueInStoreFromFormula(text as string, selection.currentCell.concatPosition);
    }
  };

  const updateCurrentCellValueInStoreFromFormula = useCallback<(formulaValue: string, cellPosition: string) => void>(
    debounce((value: string, id: string): void => {
      dispatch(
        changeContent({
          value,
          id,
        }),
      );
    }, 1000),
    [formulaValue],
  );

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>): void => {
    const { key } = event;
    const keys = Object.values(FormulaEventKeys);

    if (keys.includes(key as FormulaEventKeys)) {
      event.preventDefault();
      selection.focusOnCurrentCell();
    }
  };

  const getPrevCellName = (): string =>
    createCellName(selection.currentCell, selection.lastCellOnGroup, !isInGroupOneCell(selection.selectedCellsCount));

  const selectCellByColumnLetterAndRow = (row: number, columnLetter: string): void => {
    if (selection.compareCellsByRowAndColumnLetter(row, columnLetter, false)) {
      return;
    }

    selection.selectCell(selection.getCellByColumnLetterAndRow(row, columnLetter));
    dispatch(changeStyles(selection.currentCellAppliedStyles));
    updateFormulaInStore();
  };

  const selectCellsGroupByColumnLetterAndRow = (
    [startCellColumnLetter, startCellRow]: [string, number],
    [endCellColumnLetter, endCellRow]: [string, number],
  ): void => {
    if (selection.compareCellsByRowAndColumnLetter(endCellRow, endCellColumnLetter, true)) {
      return;
    }

    const startCell = selection.getCellByColumnLetterAndRow(startCellRow, startCellColumnLetter);
    const endCell = selection.getCellByColumnLetterAndRow(endCellRow, endCellColumnLetter);

    if (selection.isCellSelected(startCell)) {
      selection.selectCellsGroup(endCell);
    } else {
      selection.selectCell(startCell);
      selection.selectCellsGroup(endCell);
    }

    updateFormulaInStore(shouldUpdateCellInFormula(isInGroupOneCell(selection.selectedCellsCount), endCell));
  };

  const updateFormulaInStore = (selectedCell: Nullable<TableCell> = null): void => {
    const cellName = createCellName(selection.currentCell, selectedCell, !!selectedCell);
    const formulaValue = selection.currentCellValue;

    dispatch(updateFormula({ cellName, formulaValue }));
  };

  return (
    <section className={classes.FormulaBar}>
      <CellInput
        currentCellName={cellName}
        getPrevCellName={getPrevCellName}
        selectCellByColumnLetterAndRow={selectCellByColumnLetterAndRow}
        selectCellsGroupByColumnLetterAndRow={selectCellsGroupByColumnLetterAndRow}
      />
      <Separator />
      <div className={classes.Formula}>
        <span className={classes.FX}>fx</span>
        <Separator />
        <ContentEditable
          reference={formulaRef}
          className={classes.Input}
          onInput={onInputHandler}
          onKeyDown={onKeyDownHandler}
        />
      </div>
    </section>
  );
};

export default memo(Formula);
