import React from 'react'
import Component from 'component/Component'

export default class Enlarger extends Component {

  content({ store: { main: { enlarger } } }){
    if(!enlarger){ return null }
    return this.enlarger(this.app)
  }

  enlarger({ media, button, store: { main: { enlarger: { url, uri, text } }, ui: { window, style } }, action: { main } }){
    return(
      <div style={{ ...window, ...style.flexColCC, position: 'absolute', backgroundColor: 'black' }}>
        {(url || uri ) && <img source={{ url, uri }} style={{ ...this.size(0.5,1), resizeMode: 'contain' }}/>}
        {text && this.app.text.huge({ text }, { color: 'white' })}
        {button.back({ onPress: ()=>{ main.set('enlarger', false) }})}
      </div>
    )
  }

}
