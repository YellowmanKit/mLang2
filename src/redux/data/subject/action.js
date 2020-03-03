import axios from 'axios'
import { api, to, success, action, modal, upload } from '../../redux'

export const update = newSubject => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    const append = newSubject.add? 'add': 'edit'

    if(newSubject.picked){
      const uploaded = await upload({ files: [{ file: newSubject.picked, name: 'subjectIcon.png', type: 'image/*'}], type: 'subjectIcon' })
      newSubject.icon = uploaded[0]
    }
    [err, res] = await to(axios.post(api() + '/subject/' + append,{ data: newSubject.add? { subject: newSubject }: newSubject }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      modal.off(dispatch)
      dispatch(action.update('subjects', [newSubject.add? res.data.newSubject: res.data.editedSubject]))
      dispatch(action.set('viewingSubject', newSubject.add? res.data.newSubject: res.data.editedSubject))
      if(newSubject.add){
        dispatch(action.update('teachingSubjects', [res.data.newSubject._id], true))
        dispatch(action.update('courses', [res.data.updatedCourse]))
        dispatch(action.set('viewingCourse', res.data.updatedCourse))
        dispatch(action.pull())
      }
    }else{
      modal.failed(dispatch)
    }
  }
}
