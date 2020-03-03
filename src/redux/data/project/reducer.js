import { reducer } from '../../redux'

export const project = (
  state = {
    projects: [],
    teachingProjects: [],
    joinedProjects: [],
    viewingProject: {}
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
