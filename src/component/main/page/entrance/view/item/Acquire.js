import React from 'react'
import View from '../View'

export default class Acquire extends View {

  init(){
    this.state = {
      codeType: 'course',
      code: ''
    }
  }

  view({ input, button, text, func, store: { ui: { style } } }){
    return(
      <div style={this.viewStyle}>
        {text.small({ text: func.multiLang('Please select your user type:', '請選擇用戶類型:', '请选择用户类型:') }, { color: 'white' })}
        {this.verGap(0.01)}
        {this.accountTypeBar(this.app)}
        {this.verGap(0.01)}
        {input.shortText({
          placeholder: func.multiLang(
            this.state.codeType === 'course'? 'Enter class code': 'Enter school code',
            this.state.codeType === 'course'? '請輸入班別代碼': '請輸入學校代碼',
            this.state.codeType === 'course'? '请输入班别代码': '请输入学校代码'),
          onChangeText: text => { this.setState({ code: text }) }
        })}
        {this.verGap(0.03)}
        {button.rectGreen({
          text: func.multiLang('Acquire new account','獲得新帳號','获得新帐号'),
          onPress: ()=>{ this.getAccount(this.app) }
        })}
        {this.verGap(0.01)}
        {button.rectRed({
          text: func.multiLang('Cancel','取消','取消'),
          onPress: ()=>{ this.props.set('login') }
        })}
      </div>
    )
  }

  accountTypeBar({ text, func, store: { ui: { style } } }){
    return(
      <div style={{...style.flexRowCC, ...this.size(0.3, 0.04)}}>
        {text.small(
          { text: func.multiLang('Student','學生','学生'), onPress: ()=>{ this.setState({ codeType: 'course' }) }},
          { color: this.state.codeType === 'course'? 'white':'grey' })}
        {this.horGap(0.06)}
        {text.small(
          { text: func.multiLang('Teacher','老師','老师'), onPress: ()=>{ this.setState({ codeType: 'school' }) }},
          { color: this.state.codeType === 'school'? 'white':'grey' })}
      </div>
    )
  }

  getAccount({ action: { modal, user } }){
    if(this.state.code.length < 5){
      return modal.message('Invalid code!','代碼輸入錯誤!','代码输入错误',()=>{ modal.off() })
    }
    user.getAccount(this.state)
  }

}
