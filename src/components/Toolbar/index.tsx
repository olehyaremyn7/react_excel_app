import React, { FC, memo, ReactElement, useMemo } from 'react';
import { ToolbarStyles } from 'src/redux/reducers/excel/interface';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSESelector } from '../../hooks/useAppSelector';
import { JSX } from '../../interfaces';
import { applyStyle } from '../../redux/reducers/excel/actionCreators';
import { toolbarSelector } from '../../redux/reducers/excel/selectors';
import For from '../../utils/jsx/For';
import IconButton from '../UI/IconButton';
import { toolbarStyleActions } from './default';
import { ToolbarProps, ToolbarStyleAction } from './interface';
import classes from './styles.module.scss';

const Toolbar: FC<ToolbarProps> = ({ selection }): JSX => {
  const { styles } = useAppSESelector(toolbarSelector);
  const dispatch = useAppDispatch();
  const styleActions = useMemo((): ToolbarStyleAction[] => toolbarStyleActions(styles), [styles]);

  const onClickApplyStyleToCellHandler =
    (style: ToolbarStyles): (() => void) =>
    (): void => {
      const ids = selection.selectedCellsGroupIds ?? [];

      selection.applyStyle(style);
      dispatch(
        applyStyle({
          ids,
          style,
        }),
      );
    };

  return (
    <section className={classes.Toolbar}>
      <For each={styleActions}>
        {({ icon, name, value, active }: ToolbarStyleAction): ReactElement => (
          <IconButton
            key={name}
            title={name}
            active={active}
            color="success"
            iconName={icon}
            onClick={onClickApplyStyleToCellHandler(value)}
          />
        )}
      </For>
    </section>
  );
};

export default memo(Toolbar);
