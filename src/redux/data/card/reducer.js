import { reducer } from '../../redux'

export const card = (
  state = {
    cards: [],
    viewingCard: {},
    viewingCards: [],
    filter: {
      grade: 'all',
      author: undefined
    }
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
