import { reducer } from '../../redux'

export const toggle = (
  state = {
    notice: true,
    menu: false,
    school: false,
    course: false,
    subject: true,
    expiredCourse: true,
    expiredProject: true,
    grading: false
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
