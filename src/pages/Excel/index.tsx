import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'src/excel/Table/Table';
import { getTable, saveTable } from 'src/redux/reducers/excel/actionCreators';
import { TableState } from 'src/redux/reducers/excel/interface';
import { debounce } from 'src/utils';

import Formula from '../../components/Formula';
import Header from '../../components/Header';
import TableComponent from '../../components/Table';
import Toolbar from '../../components/Toolbar';
import Loader from '../../components/UI/Loader';
import { TableSelection } from '../../excel/Table/TableSelection';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSESelector } from '../../hooks/useAppSelector';
import { JSX, Nullable } from '../../interfaces';
import { excelSelector } from '../../redux/reducers/excel/selectors';
import { Routes } from '../../router/interface';
import { createQueryParams } from '../../router/utils';
import Show from '../../utils/jsx/Show';
import classes from './styles.module.scss';

const Excel: FC = (): JSX => {
  const { table: tableState, isLoading } = useAppSESelector(excelSelector);
  const [table, setTable] = useState<Nullable<Table>>(null);
  const [selection, setSelection] = useState<Nullable<TableSelection>>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect((): (() => void) => {
    (async (): Promise<void> => {
      await createTable();
    })();

    window.onbeforeunload = alertBeforeLeavingPage;

    return (): void => {
      window.onbeforeunload = null;
    };
  }, []);

  const alertBeforeLeavingPage = (event: BeforeUnloadEvent): void | string => {
    const message = '';

    if (typeof event == 'undefined') {
      event = window.event as BeforeUnloadEvent;
    }

    if (event) {
      event.returnValue = message;
    }

    return message;
  };

  useEffect((): void => {
    if (table) {
      saveTableHandler(tableState);
    }
  }, [tableState]);

  const saveTableHandler = useCallback<(state: TableState) => void>(
    debounce((state: TableState): void => {
      dispatch(saveTable(state));
    }, 1000),
    [tableState],
  );

  const createTable = async (): Promise<void> => {
    const tableState = await dispatch(getTable(id!)).unwrap();

    if (!tableState) {
      navigate(
        {
          pathname: Routes.DASHBOARD,
          search: createQueryParams({
            error: 'Table not found',
          }),
        },
        { replace: true },
      );

      return;
    }

    const table = new Table(tableState);
    const selection = new TableSelection(table.cells);

    setTable(table);
    setSelection(selection);
  };

  return (
    <main className={classes.Excel}>
      <Show>
        <Show.When isTrue={!isLoading && table && selection}>
          <Header />
          <Toolbar selection={selection!} />
          <Formula selection={selection!} />
          <TableComponent table={table!} selection={selection!} />
        </Show.When>
        <Show.Else>
          <Loader />
        </Show.Else>
      </Show>
    </main>
  );
};

export default Excel;
