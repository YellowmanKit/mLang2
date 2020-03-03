import { reducer } from '../../redux'

export const profile = (
  state = {
    profile: {},
    viewingProfile: {},
    profiles: []
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
