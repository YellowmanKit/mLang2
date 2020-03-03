import { reducer } from '../../redux'

export const notice = (
  state = {
    notices: []
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    case 'clear':
      state.notices = []
      return state
    default:
      return state
  }
}
