import React, { ChangeEvent, FC, memo, startTransition, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DECISION_DELETE_TABLE_TEXT, DEFAULT_TABLE_TITLE } from '../../constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSESelector } from '../../hooks/useAppSelector';
import { useTitle } from '../../hooks/useTitle';
import { JSX } from '../../interfaces';
import { changeTitle, deleteTable as deleteTableAction } from '../../redux/reducers/excel/actionCreators';
import { headerSelector } from '../../redux/reducers/excel/selectors';
import { Routes } from '../../router/interface';
import { createQueryParams } from '../../router/utils';
import { debounce } from '../../utils';
import IconButton from '../UI/IconButton';
import Input from '../UI/Input';
import classes from './styles.module.scss';

const Header: FC = (): JSX => {
  const { id, title: currentTitle } = useAppSESelector(headerSelector);
  const [title, setTitle] = useState<string>(currentTitle);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useTitle(title ? title : DEFAULT_TABLE_TITLE);

  const changeTableTitleHandler = useCallback<(title: string) => void>(
    debounce((title: string): void => {
      dispatch(changeTitle(title));
    }, 1500),
    [currentTitle],
  );

  const onChangeHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    changeTableTitleHandler(value);
  };

  const onInputHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    startTransition((): void => setTitle(value));
  };

  const onClickDeleteHandler = async (): Promise<void> => {
    const decision = confirm(DECISION_DELETE_TABLE_TEXT);

    if (decision) {
      const response = await dispatch(deleteTableAction(id)).unwrap();

      navigate({
        pathname: Routes.DASHBOARD,
        search: createQueryParams({
          success: response,
        }),
      });
    }
  };

  const onClickExitHandler = (): void => {
    navigate(Routes.DASHBOARD);
  };

  return (
    <header className={classes.Header}>
      <Input value={title} className={classes.Input} onChange={onChangeHandler} onInput={onInputHandler} />
      <nav className={classes.Actions}>
        <IconButton title="Delete table" color="error" onClick={onClickDeleteHandler} iconName="delete" />
        <IconButton title="Exit" color="error" onClick={onClickExitHandler} iconName="exit_to_app" />
      </nav>
    </header>
  );
};

export default memo(Header);
