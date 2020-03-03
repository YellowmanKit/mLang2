import axios from 'axios'
import { api, to, success, action, modal, parse } from '../../redux'

export const login = ({ id, pw }) => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    [err, res] = await to(axios.post(api() + '/user/login', { data: { id, pw } }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      modal.off(dispatch)
      parse(res, dispatch)
      dispatch(action.set('user', res.data.user))
      dispatch(action.set('status', 'home'))
    }else{
      modal.message('Invalid login information!','登入失敗!','登入失败!', dispatch)
    }
  }
}

export const update = newUser => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    [err, res] = await to(axios.post(api() + '/user/update',{ data: newUser }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      modal.off(dispatch)
      dispatch(action.set('user', res.data.updatedUser))
    }else{
      modal.failed(dispatch)
    }
  }
}

export const getAccount = ({ code, codeType }) => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    [err, res] = await to(axios.post(api() + '/user/acquire', { data: { code, type: codeType } }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      login(res.data)(dispatch)
    }else{
      modal.message('Invalid code!','代碼輸入錯誤!','代码输入错误', dispatch)
    }
  }
}

export const resetPassword = ({ email }) => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    [err, res] = await to(axios.get(api() + '/user/resetPassword'),{ headers: { email } })
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      modal.message('A new password has been send to your email!','新密碼已被發送至你的電郵地址!','新密码已被发送至你的电子邮件地址!', dispatch)
    }else{
      modal.message('Invalid email address!','電郵地址不正確!','电邮地址不正确!', dispatch)
    }
  }
}
