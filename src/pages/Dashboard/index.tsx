import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExcelLink } from 'src/router/utils';
import Show from 'src/utils/jsx/Show';

import RecordsList from '../../components/RecordsList';
import Loader from '../../components/UI/Loader';
import { DASHBOARD_PAGE_DOCUMENT_TITLE } from '../../constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSESelector } from '../../hooks/useAppSelector';
import { useTitle } from '../../hooks/useTitle';
import { JSX } from '../../interfaces';
import { createTable, getTableRecords } from '../../redux/reducers/dashboard/actionCreators';
import { dashboardSelector } from '../../redux/reducers/dashboard/selectors';
import classes from './styles.module.scss';

const Dashboard: FC = (): JSX => {
  const { records, isLoading } = useAppSESelector(dashboardSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useTitle(DASHBOARD_PAGE_DOCUMENT_TITLE);

  useEffect((): void => {
    dispatch(getTableRecords());
  }, []);

  const onClickCreateNewExcel = async (): Promise<void> => {
    if (!isLoading) {
      const { id } = await dispatch(createTable()).unwrap();

      navigate(createExcelLink(id));
    }
  };

  return (
    <main className={classes.Dashboard}>
      <header className={classes.Header}>
        <h1>Excel Dashboard</h1>
      </header>
      <section className={classes.New}>
        <nav className={classes.View}>
          <a className={classes.Create} onClick={onClickCreateNewExcel} title="Create new table">
            New <br /> table
          </a>
        </nav>
      </section>
      <section className={classes.Records}>
        <Show>
          <Show.When isTrue={!isLoading}>
            <RecordsList records={records} />
          </Show.When>
          <Show.Else>
            <Loader />
          </Show.Else>
        </Show>
      </section>
    </main>
  );
};

export default Dashboard;
