import React from 'react'
import Component from 'component/Component'
import Lang from './Lang'

export default class Langs extends Component {

  content(){
    return this.langs(this.app, this.props)
  }

  langs({ store: { ui: { style, color, window } } }, { langs, onChange, add }){
    return(
      <div style={{ ...style.flexColCS, width: window.width, backgroundColor: color.grey[0] }}>
        {langs.map((lang, index) => <Lang app={this.app} remove={langs.length > 1} lang={lang} index={index} onChange={onChange} key={(lang._id || lang.id) + (lang.audio? lang.audio.path:'')}/>)}
        {langs.length < 3 && add && this.add(this.app, this.props)}
      </div>
    )
  }

  add({ func, button, store: { ui: { color, style }, lang: { keys } } }, { langs, onChange }){
    return button.touchableOpacity({ icon: require('res/image/button/add_black.png'), onPress: ()=>{ onChange({ key: func.unusedLangKey(langs, keys), text: '' }) } },{
      view: { ...this.size(0.95,0.035,true), backgroundColor: 'white' },
      icon: { ...this.size(0.025,0.025), opacity: 0.1 }
    })
  }


}
