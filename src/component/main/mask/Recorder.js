import React from 'react'
import Component from 'component/Component'
import Nyan from 'component/element/Nyan'

export default class Recorder extends Component {

  content({ store: { main: { recorder } } }){
    if(!recorder){ return null }
    return this.recorder(this.app)
  }

  recorder({ func, text, button, action: { main }, store: { ui: { window, style }, main: { recorder } } }){
    return (
      <div style={{...window, ...style.flexColCC, position: 'absolute', backgroundColor: 'rgba(255,255,255,0.9)'}}>
        {button.notice({ text: func.multiLang('Recording...','錄音中...','录音中...') })}
        <Nyan status={'runningLeft'} app={this.app}/>
        {this.verGap(0.05)}
        {text.large({ text: recorder.text? recorder.text: '' })}
        {button.touchableOpacity({ onPress: ()=>{
          main.set('recorder', null)
          recorder.onEnd()
        } }, { view: { ...this.size(1,1,true), position: 'absolute'}})}
      </div>
    )
  }

}
