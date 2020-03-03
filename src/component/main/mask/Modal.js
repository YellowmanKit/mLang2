import React from 'react'
import Component from 'component/Component'
import Nyan from 'component/element/Nyan'

export default class Modal extends Component {

  init({ store: { user: { user } } }){
    this.state = {
      pw: user.pw,
      input: '',
      onChange: ({ app: { store: { user: { user } } } }, prevState) => {
        return { ...prevState, pw: user.pw }
      }
    }
  }

  content({ store: { modal: { modal } } }){
    if(!modal){ return null }
    return this.modal(this.app)
  }

  modal({ store: { ui: { window, style } } }){
    return (
      <div style={{...window, ...style.flexColCC, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.25)'}}>
        {this.paperBox(this.app)}
      </div>
    )
  }

  paperBox({ text, input, func, store: { modal: { english, chinese, simplifiedChinese, requirePassword, requireInput, nyan }, ui: { style } } }){
    return(
      <div style={{...this.size(0.35,0.35), ...style.flexColCC, backgroundImage: 'url(' + require('res/image/paperBox.png') + ')', backgroundSize: '100% 100%'}}>
        {text.modal({ text: func.multiLang(english, chinese, simplifiedChinese) })}
        {this.verGap(0.01)}
        <Nyan status={nyan? nyan: 'sit'} app={this.app}/>
        {this.verGap(0.01)}
        {requirePassword && input.shortText({
          value: this.state.pw,
          placeholder: func.multiLang('Enter your password', '請輸入密碼', '请输入密码'),
          onChangeText: text => { this.setState({ pw: this.state.pw }) },
          isPassword: true
        })}
        {requireInput && input.shortText({
          value: this.state.input,
          placeholder: func.multiLangByArray(requireInput),
          onChangeText: text => { this.setState({ input: text }) }
        })}
        {!requirePassword && this.verGap(0.04)}
        {this.verGap(0.01)}
        {this.buttonArea(this.app)}
        {this.verGap(0.06)}
      </div>
    )
  }

  buttonArea({ text, func, store: { modal: { onConfirm, onCancel, requirePassword }, ui: { style} } }){
    return(
      <div style={{...this.size(0.2, 0.05), ...style.flexRowCC }}>
        {onConfirm && text.modal({ text: func.multiLang('Confirm','確定','确定'), onPress:
        requirePassword? ()=>{ this.checkPassword(this.app) }: ()=>{ onConfirm(this.state.input) } })}
        {onCancel && this.horGap(0.1)}
        {onCancel && text.modal({ text: func.multiLang('Cancel','取消','取消'), onPress: onCancel })}
      </div>
    )
  }

  checkPassword({ store: { modal: { onConfirm, onCancel }, user: { user: { pw } } }, action: { modal } }){
    if(this.state.pw === pw){
      onConfirm()
    }else{
      modal.message('Invalid password!','密碼錯誤!','密码错误!', onCancel)
    }
    //this.setState({ pw: '' })
  }

}
