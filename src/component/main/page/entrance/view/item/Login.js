import React from 'react'
import View from '../View'

export default class Login extends View {

  init(app){
    this.state = {
      id: '',
      pw: '',
      stay: false
    }
    this.autoUser(app)
  }

  async autoUser(app){
    const id = await app.load('id')
    const pw = await app.load('pw')
    const stay = await app.load('stay')
    this.setState({ id, pw, stay: stay === 'true' })
    this.autoLogin()
  }

  autoLogin(){
    if(this.state.stay){
      this.login()
    }
  }

  stayOnCheck(){
    this.props.app.save('stay', '' + !this.state.stay)
    this.setState({ stay: !this.state.stay })
  }

  view({ input, button, text, func, store: { main: { version }, ui: { style, window, color } } }){
    return(
      <div style={this.viewStyle}>
        <img alt='' src={require('res/image/mlang.png')}
        style={{...this.size(0.35, 0.15), resizeMode: 'stretch' }}/>
        {input.shortText({
          value: this.state.id,
          placeholder: func.multiLang('Enter your id', '請輸入帳號', '请输入帐号'),
          onChangeText: text => { this.setState({ id: text }) }
        })}
        {this.verGap(0.01)}
        {input.shortText({
          value: this.state.pw,
          placeholder: func.multiLang('Enter your password', '請輸入密碼', '请输入密码'),
          onChangeText: text => { this.setState({ pw: text }) },
          isPassword: true
        })}
        {this.verGap(0.01)}
        {text.small(
          { text: func.multiLang('Stay login','保持登入','保持登入'), onPress: this.stayOnCheck.bind(this) },
          { color: this.state.stay? 'white':'grey', height: window.height * 0.02  })}
        {this.verGap(0.03)}
        {button.rectGreen({
          text: func.multiLang('Login','登入','登入'),
          onPress: ()=>{ this.login() }
        })}
        {this.verGap(0.0125)}
        {button.rectYellow({
          text: func.multiLang('Get account','獲取帳號','获取帐号'),
          onPress: ()=>{ this.props.set('acquire') }
        })}
        {this.verGap(0.0125)}
        {button.rectRed({
          text: func.multiLang('Forget password','忘記密碼','忘记密码'),
          onPress: ()=>{ this.props.set('retrieve') }
        })}
        {this.verGap(0.05)}
        {this.languageBar(this.app)}
        {this.verGap(0.03)}
        {text.hint({ text: version })}
      </div>
    )
  }

  languageBar({ text, store: { main: { language }, ui: { style } }, action }){
    return(
      <div style={{...style.flexRowCC, justifyContent: 'space-evenly', ...this.size(0.75, 0.04)}}>
        {text.small(
          { text: 'English', onPress: ()=>{ action.main.set('language', 'english') }},
          { color: language === 'english'? 'white':'grey' })}
        {this.horGap(0.06)}
        {text.small(
          { text: '繁體中文', onPress: ()=>{ action.main.set('language', 'chinese') }},
          { color: language === 'chinese'? 'white':'grey' })}
        {this.horGap(0.06)}
        {text.small(
          { text: '简体中文', onPress: ()=>{ action.main.set('language', 'simplifiedChinese') }},
          { color: language === 'simplifiedChinese'? 'white':'grey' })}
      </div>
    )
  }

  login(){
    this.app.action.user.login(this.state)
  }

}
