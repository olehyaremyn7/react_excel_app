import { shallowEqual, TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../redux/interface';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSESelector = <T>(selector: (state: RootState) => T): T => useAppSelector(selector, shallowEqual);
