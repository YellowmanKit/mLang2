import axios from 'axios'
import { api, to, success, action, modal, upload } from '../../redux'

export const update = newProfile => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    if(newProfile.picked){
      const uploaded = await upload({ files: [{ file: newProfile.picked, name: 'profileIcon.png', type: 'image/*'}], type: 'profileIcon' })
      newProfile.icon = uploaded[0]
    }
    [err, res] = await to(axios.post(api() + '/profile/update',{ data: {
      profile: newProfile,
      newName: newProfile.name,
      newDesc: newProfile.description,
      newIcon: newProfile.newIcon? newProfile.newIcon: null
    }}))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.set('profile', res.data.updatedProfile))
    }else{
      modal.failed(dispatch)
    }
  }
}
