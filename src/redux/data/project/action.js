import axios from 'axios'
import { api, to, success, action, modal, upload } from '../../redux'

export const update = newProject => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    const append = newProject.add? 'add': 'edit'
    if(newProject.picked){
      const uploaded = await upload({ files: [{ file: newProject.picked, name: 'projectIcon.png', type: 'image/*'}], type: 'projectIcon' })
      newProject.icon = uploaded[0]
    }
    [err, res] = await to(axios.post(api() + '/project/' + append, { data: newProject }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      modal.off(dispatch)
      dispatch(action.update('projects', [newProject.add? res.data.newProject: res.data.editedProject]))
      dispatch(action.set('viewingProject', newProject.add? res.data.newProject: res.data.editedProject))
      if(newProject.add){
        dispatch(action.update('teachingProjects', [res.data.newProject._id], true))
        dispatch(action.update('subjects', [res.data.updatedSubject]))
        dispatch(action.set('viewingSubject', res.data.updatedSubject))
        dispatch(action.pull())
      }
    }else{
      modal.failed(dispatch)
    }
  }
}
