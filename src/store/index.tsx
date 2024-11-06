import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user';
import tasksSlice from './tasks';
import projectsSlice from './projects';

export default configureStore({
  reducer: {
    user: userSlice,
    tasks: tasksSlice,
    projects: projectsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
