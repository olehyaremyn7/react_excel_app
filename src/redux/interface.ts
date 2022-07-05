import store from './index';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store['dispatch'];

export interface RejectedError {
  rejectValue: string;
}
