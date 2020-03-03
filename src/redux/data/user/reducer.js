import { reducer } from '../../redux'

export const user = (
  state = {
    user: {}
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
