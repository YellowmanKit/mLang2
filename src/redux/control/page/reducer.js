import { reducer } from '../../redux'

export const page = (
  state = {
    view: 'index',
    subView: '',
    trace: [{ view: 'index' }],
    nav: {
      title: ['','',''],
      left: {
        icon: '',
        onPress: ()=>{}
      },
      right: {
        icon: '',
        onPress: ()=>{}
      }
    }
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    case 'push':
      state.view = payload
      state.trace.push({ view: payload })
      return { ...state }
    case 'pull':
      state.view = state.trace[state.trace.length - 2].view
      state.subView = state.trace[state.trace.length - 2].subView
      state.trace.splice(state.trace.length - 1, 1)
      return { ...state }
    case 'setSubView':
      if(!payload.init || !state.trace[state.trace.length - 1].subView){
        state.subView = payload.subView
        state.trace[state.trace.length - 1].subView = payload.subView
      }
      return { ...state }
    default:
      return state
  }
}
