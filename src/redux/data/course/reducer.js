import { reducer } from '../../redux'

export const course = (
  state = {
    courses: [],
    teachingCourses: [],
    joinedCourses: [],
    viewingCourse: {}
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
