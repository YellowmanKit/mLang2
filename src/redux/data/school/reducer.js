import { reducer } from '../../redux'

export const school = (
  state = {
    schools: [],
    viewingSchool: {}
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
