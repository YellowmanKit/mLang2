import { reducer } from '../../redux'

export const modal = (
  state = {
    modal: false,
    requirePassword: false,
    english: '',
    chinese: '',
    simplifiedChinese: '',
    onConfirm: null,
    onCancel: null,
    nyan: ''
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    case 'off':
      state.modal = false
      return { ...state }
    case 'define':
      if('modal' in payload){
        return payload
      }else{
        return state
      }
    default:
      return state
  }
}
