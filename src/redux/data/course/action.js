import axios from 'axios'
import { api, to, success, action, modal, upload } from '../../redux'

export const leave = data => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res;
    [err, res] = await to(axios.post(api() + '/course/leave', { data } ))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('courses', [res.data.leavedCourse]))
      dispatch(action.update('joinedCourses', [res.data.leavedCourse._id], false, true))
      dispatch(action.set('profile', [res.data.updatedProfile]))
      dispatch(action.pull())
      modal.off(dispatch)
    }else{
      modal.failed(dispatch)
    }
  }
}

export const join = data => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res;
    [err, res] = await to(axios.post(api() + '/course/join', { data } ))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('courses', [res.data.joinedCourse]))
      dispatch(action.update('joinedCourses', [res.data.joinedCourse._id]))
      dispatch(action.set('profile', [res.data.updatedProfile]))
      modal.off(dispatch)
    }else{
      modal.failed(dispatch)
    }
  }
}

export const update = newCourse => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    const append = newCourse.add? 'add': 'edit'
    if(newCourse.picked){
      const uploaded = await upload({ files: [{ file: newCourse.picked, name: 'courseIcon.png', type: 'image/*'}], type: 'courseIcon' })
      newCourse.icon = uploaded[0]
    }
    [err, res] = await to(axios.post(api() + '/course/' + append, { data: newCourse }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('courses', [newCourse.add? res.data.newCourse: res.data.editedCourse]))
      dispatch(action.set('viewingCourse', newCourse.add? res.data.newCourse: res.data.editedCourse))
      if(newCourse.add){
        dispatch(action.update('teachingCourses', [res.data.newCourse._id]))
        dispatch(action.pull())
      }
      modal.off(dispatch)
    }else{
      modal.failed(dispatch)
    }
  }
}
