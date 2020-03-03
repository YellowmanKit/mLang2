import { reducer } from '../../redux'

export const lang = (
  state = {
    groups: [],
    viewingGroup: {}
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
