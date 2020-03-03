import React from 'react'
import View from '../View'

export default class Retrieve extends View {

  init(){
    this.state = {
      email: ''
    }
  }

  view({ input, button, text, func, store: { ui: { style } } }){
    return(
      <div style={this.viewStyle}>
        {input.shortText({
          placeholder: func.multiLang('Enter your email address','輸入你的電郵地址','输入你的电邮地址'),
          onChangeText: text => { this.setState({ email: text }) }
        })}
        {this.verGap(0.03)}
        {button.rectGreen({
          text: func.multiLang('Reset password','重設密碼','重设密码'),
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

  getAccount({ action: { modal, user } }){
    if(!this.state.email || !this.state.email.includes('@')){
      return modal.message('Invalid email!','電郵地址輸入錯誤!','电子邮件地址输入错误',()=>{ modal.off() })
    }
    user.resetPassword(this.state)
  }

}
