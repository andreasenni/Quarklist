import { createSlice } from '@reduxjs/toolkit';

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [],
    toUpdate: false,
  },
  reducers: {
    setProjects: (state, action) => {
      state.data = action.payload;
    },
    setToUpdate: (state) => {
      state.toUpdate = !state.toUpdate;
    },
  },
});

export const { setProjects, setToUpdate } = projectsSlice.actions;

export default projectsSlice.reducer;
