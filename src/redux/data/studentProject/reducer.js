import { reducer } from '../../redux'

export const studentProject = (
  state = {
    studentProjects: [],
    viewingStudentProject: {}
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
