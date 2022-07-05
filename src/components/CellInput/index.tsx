import clsx from 'clsx';
import React, { ChangeEvent, FC, FocusEvent, KeyboardEvent, memo, startTransition, useEffect, useState } from 'react';

import Input from '../UI/Input';
import { CellInputProps } from './interface';
import classes from './styles.module.scss';
import {
  getCellColumnLetterAndRow,
  getCellNamesFromCellsRange,
  isCellsRange,
  isNewCellNameEqualPrev,
  validateCellNameAndCellRange,
} from './utils';

const CellInput: FC<CellInputProps> = ({
  currentCellName,
  getPrevCellName,
  selectCellByColumnLetterAndRow,
  selectCellsGroupByColumnLetterAndRow,
}) => {
  const [cellName, setCellName] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [focused, setFocused] = useState<boolean>(false);
  const inputClassNames = clsx(classes.Input, !isValid && classes.Invalid);
  const validationTooltipClassNames = clsx(classes.ValidationTooltip, !isValid && focused && classes.Active);

  useEffect((): void => {
    if (!isNewCellNameEqualPrev(cellName, currentCellName)) {
      setCellName(currentCellName);
    }
  }, [currentCellName]);

  const changeCellName = (cellName: string): void => startTransition((): void => setCellName(cellName));

  const onChangeHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    if (!isValid) {
      setIsValid(true);
    }

    changeCellName(value);
  };

  const validateCellInput = (cellName: string, isCellsGroup: boolean): boolean => {
    let isValid: boolean = true;

    isValid = validateCellNameAndCellRange(cellName, isCellsGroup) && isValid;

    setIsValid(isValid);

    return isValid;
  };

  const onSubmit = (cellName: string, isCellsGroup: boolean): void => {
    if (isCellsGroup) {
      const [startCellName, endCellName] = getCellNamesFromCellsRange(cellName);

      selectCellsGroupByColumnLetterAndRow(
        getCellColumnLetterAndRow(startCellName),
        getCellColumnLetterAndRow(endCellName),
      );
    } else {
      const [columnLetter, row] = getCellColumnLetterAndRow(cellName);

      selectCellByColumnLetterAndRow(row, columnLetter);
    }
  };

  const returnPrevCellName = (): void => changeCellName(getPrevCellName());

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>): void => {
    const { key } = event;

    if (key === 'Enter') {
      event.preventDefault();
      const isCellsGroup = isCellsRange(cellName);

      if (validateCellInput(cellName, isCellsGroup)) {
        onSubmit(cellName, isCellsGroup);
      }
    } else if (key === 'Tab') {
      event.preventDefault();
      returnPrevCellName();
    }
  };

  const onFocusHandler = ({ target }: FocusEvent<HTMLInputElement>): void => {
    setFocused(true);
    target.select();
  };

  const onBlurHandler = (): void => {
    setFocused(false);
    setIsValid(true);

    if ((!isValid && focused) || !isNewCellNameEqualPrev(getPrevCellName(), cellName)) {
      returnPrevCellName();
    }
  };

  return (
    <div className={classes.CellInput}>
      <Input
        value={cellName}
        className={inputClassNames}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
      <span className={validationTooltipClassNames}>The name assigned to this range is invalid</span>
    </div>
  );
};

export default memo(
  CellInput,
  (prevProps, nextProps): boolean => prevProps.currentCellName === nextProps.currentCellName,
);
