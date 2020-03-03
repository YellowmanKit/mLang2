import axios from 'axios'
import { api, to, success, action, modal, upload } from '../../redux'

export const update = newSchool => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    if(newSchool.picked){
      const uploaded = await upload({ files: [{ file: newSchool.picked, name: 'schoolIcon.png', type: 'image/*'}], type: 'schoolIcon' })
      newSchool.icon = uploaded[0]
    }
    [err, res] = await to(axios.post(api() + '/school/edit',{ data: newSchool }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('schools', [res.data.editedSchool]))
      dispatch(action.set('viewingSchool', res.data.editedSchool))
    }else{
      modal.failed(dispatch)
    }
  }
}
