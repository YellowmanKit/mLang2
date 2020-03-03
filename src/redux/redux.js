import axios from 'axios'
export function api(){ return process.env.NODE_ENV === 'development'? process.env.REACT_APP_API_DEV: process.env.REACT_APP_API; }

export const upload = async ({ files, type }) => {
  if(files.length === 0){ return [] }
  var err, res
  var forms = new FormData()
  files.map(({ name, type, file })=>{
    forms.append('files', {
      name: name,
      type: type,
      uri: file.uri? file.uri: file
    }, name)
  });
  [err, res] = await to(fetch(api() + '/upload', { method: 'POST', headers: { type }, body: forms }))
  if(err){ return null }
  const response = await res.json()
  return response.filenames
}


export const to = promise => promise.then(data => [null, data] ).catch(err => [err])
export const success = res => { if(!res.data.err){ return true }else{ return false } }
export const action = {
  set: (key, value) => { return { type: 'set', payload: { key, value } } },
  define: state => { return { type: 'define', payload: state } },
  update: (key, value, append, remove) => { return { type: 'update', payload: { key, value, append, remove } } },
  pull: () => { return { type: 'pull' }}
}
export const modal = {
  off: dispatch => { dispatch(action.set('modal', false)) },
  message: (english, chinese, simplifiedChinese, dispatch) => {
    dispatch(action.define({
      modal: true,
      requirePassword: false,
      onConfirm: ()=>{ modal.off(dispatch) },
      onCancel: null,
      english, chinese, simplifiedChinese
    }))
  },
  loading: dispatch => {
    dispatch(action.define({
      modal: true,
      requirePassword: false,
      onConfirm: null,
      onCancel: null,
      nyan: 'runningLeft',
      english: 'Loading...', chinese: '載入中...', simplifiedChinese: '载入中...'
    }))
  },
  error: dispatch => {
    modal.message('Network error!','網絡異常!','网络异常!', dispatch)
  },
  failed: dispatch => {
    modal.message('Update failed!','更改失敗!','登入失败!', dispatch)
  },
  succeed: dispatch => {
    modal.message('Update succeed!','更改成功!','更改成功!', dispatch)
  }
}
export const parse = ({ data }, dispatch) => {
  for(var key in data){
    if(Array.isArray(data[key])){
      dispatch(action.update(key, data[key]))
    }else{
      dispatch(action.set(key, data[key]))
    }
  }
}
export const reducer = (state, { type, payload }, result) => {
  switch (type) {
    case 'set':
      if(payload.value === undefined){ return state }
      if(payload.key in state){ state[payload.key] = payload.value }
      return { ...state }
    case 'update':
      if(payload.key in state){ state[payload.key] = update(state[payload.key], payload.value, payload.append, payload.remove) }
      return { ...state }
    default:
      return result(state, { type, payload })
  }
}
const update = (original, newItems, append, remove) => {
  if(!newItems || newItems.length === 0){ return original }
  var result = original.slice(0)
  if(result.length === 0){ result = [newItems[0]] }
  for(var i=0;i<newItems.length;i++){
    if(!newItems[i]){ continue }
    for(var j=0;j<result.length;j++){
      if(result[j]._id && (result[j]._id === newItems[i]._id)){
        if(remove){
          result.splice(j, 1)
        }else{
          result[j] = { ...result[j], ...newItems[i] }
        }
        break
      }
      if(!result[j]._id && (result[j] === newItems[i])){
        if(remove){
          result.splice(j, 1)
        }else{
          result[j] = newItems[i]
        }
        break
      }
      if(j === result.length - 1){
        if(append){ result.splice(result.length, 0, newItems[i]) }
        else{ result.splice(0, 0, newItems[i]); break }
      }
    }
  }
  return result
}
