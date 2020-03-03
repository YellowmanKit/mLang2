import { reducer } from '../../redux'

export const main = (
  state = {
    status: 'init',
    language: 'english',
    camera: false,
    photo: null,
    preset: false,
    enlarger: false,
    recorder: null,
    version: 'v2.0.0'
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
