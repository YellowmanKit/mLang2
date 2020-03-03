import React from 'react'
import Component from 'component/Component'

export default class Key extends Component {

  content(){
    return this.key(this.app, this.props)
  }

  key({ func, text, store: { ui: { style, color }, lang } }, { keys, selected, onSelect }){
    return(
      <div style={{ ...style.flexRowCS, ...this.size(0.35, 0.04) }}>
        {keys.map(key => text.small({ text: func.multiLangByArray(lang.keys[key]), onPress: ()=>{ onSelect(key) }, key },
        { color: selected === key? 'black': color.grey[1], padding: 5 }))}
      </div>
    )
  }

}
