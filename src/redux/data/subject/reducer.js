import { reducer } from '../../redux'

export const subject = (
  state = {
    subjects: [],
    teachingSubjects: [],
    joinedSubjects: [],
    viewingSubject: {}
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
