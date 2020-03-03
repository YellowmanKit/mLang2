import React from 'react'
import Component from 'component/Component'
import Audio from 'component/element/Audio'

export default class Lang extends Component {

  init({}, { lang }){
    this.state = {
      file: {
        name: lang.audio,
        type: 'langAudio'
      }
    }
  }

  content(){
    return this.lang(this.app, this.props, this.state)
  }

  lang({ button, func, input, action: { main }, store: { ui: { style, color, window }, lang: { keys } } }, { lang, index, onChange, remove }, { source }){
    return(
      <div style={{ ...style.flexColCS, ...this.size(0.95,0.175,true), backgroundColor: 'white', margin: 1 }}>
        <div style={{ ...style.flexRowCS, ...this.size(0.9, 0.04, true) }}>
          {this.app.text.moderate({ text: func.multiLangByArray(keys[lang.key]), onPress: ()=>{ main.set('preset', {
            options: Object.keys(keys).map(key => { return { label: func.multiLangByArray(keys[key]), value: key } } ),
            onPress: value=>{ onChange({ ...lang, key: value }, index) }
          }) } }, { ...this.size(0.45,0.025,true) })}
          <Audio app={this.app} onRecord={path=>{ onChange({ ...lang, audio: { path } }, index) }} source={source} text={lang.text} id={lang._id || lang.id}/>
          {this.horGap(0.075)}
          {button.cross({ onPress: ()=>{ onChange(null, index) }, disabled: index === 0, key: remove })}
        </div>
        <div style={{ ...style.flexRowCC, ...this.size(0.95, 0.135, true) }}>
          {input.standardText({
            multiline: true,
            value: lang.text,
            onChangeText: text => { onChange({ ...lang, text }, index) }
          },{ ...this.size(0.925,0.125,true), ...this.fontSize(0.02) })}
        </div>
      </div>
    )
  }

}
