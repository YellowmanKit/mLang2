import axios from 'axios'
import { api, to, success, action, modal } from '../../redux'

export const fetch = ({ student, project }) => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    [err, res] = await to(axios.get(api() + '/studentProject/get', { headers: { student, project } }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('studentProjects', [res.data.studentProject]))
      dispatch(action.set('viewingStudentProject', res.data.studentProject))
      dispatch(action.update('project', [res.data.updatedProject]))
      modal.off(dispatch)
    }else{
      modal.failed(dispatch)
    }
  }
}

export const update = newStudentProject => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    [err, res] = await to(axios.post(api() + '/studentProject/update', { data: newStudentProject }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('studentProjects', [res.data.updatedStudentProject]))
      dispatch(action.set('viewingStudentProject', res.data.updatedStudentProject))
      modal.off(dispatch)
    }else{
      modal.failed(dispatch)
    }
  }
}
