import React from 'react'
import View from '../View'

export default class Account extends View {

  init({ action: { page }, store: { user : { user } } }){
    page.set('nav', {
      title: ['ACCOUNT','帳號資訊','帐号资讯'],
    })
    this.setEditButton(this.app)
    this.state = { ...user,
      edit: false,
      newPw: '',
      confirmPw: ''
    }
  }

  view({ text, input, func, store: { user: { user }, ui: { style } } }, { edit }){
    return(
      <div style={this.viewStyle}>
        {!edit && this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Type','類型','类型') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: func.userTypeToString(user.type) })}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Identity','登入名稱','登入名称') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: this.state.id })}
        {edit && input.shortText({
          value: this.state.id,
          placeholder: func.multiLang('Enter your identity', '請輸入登入名稱', '请输入登入名称'),
          onChangeText: text => { this.setState({ id: text }) }
        })}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Email','電郵','电邮') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: this.state.email })}
        {edit && input.shortText({
          value: this.state.email,
          placeholder: func.multiLang('Enter your email address', '請輸入電郵地址', '请输入电邮地址'),
          onChangeText: text => { this.setState({ email: text }) }
        })}
        {edit && this.verGap(0.02)}
        {edit && text.title({ text: func.multiLang('New password','新密碼','新密码') })}
        {edit && this.verSep(1)}
        {edit && this.verGap(0.01)}
        {edit && input.shortText({
          value: this.state.newPw,
          placeholder: func.multiLang('Leave it blank if no change', '不更改密碼時請留空', '不更改密码时请留空'),
          onChangeText: text => { this.setState({ newPw: text }) },
          isPassword: true
        })}
        {edit && this.verGap(0.02)}
        {edit && text.title({ text: func.multiLang('Confirm new password','確定新密碼','确定新密码') })}
        {edit && this.verSep(1)}
        {edit && this.verGap(0.01)}
        {edit && input.shortText({
          value: this.state.confirmPw,
          placeholder: func.multiLang('Leave it blank if no change', '不更改密碼時請留空', '不更改密码时请留空'),
          onChangeText: text => { this.setState({ confirmPw: text }) },
          isPassword: true
        })}
        {!edit && this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Start','創建於','创建于') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: func.dateString(user.createdAt) })}
      </div>
    )
  }

  save({ action : { modal, user } }, { id, pw, email, newPw, confirmPw }){
    if(id === '' || (newPw && (newPw !== confirmPw)) || (newPw && newPw.length < 6)){
      return modal.invalid(()=>{ modal.off() })
    }
    const newUser = {...this.state, pw: this.state.newPw? this.state.newPw: pw}
    modal.password(()=>{
      user.update(newUser)
      this.setEditButton(this.app)
      this.setState({ edit: false })
    }, ()=>{ modal.off() })
  }

}
