import React from 'react'
import Component from 'component/Component'
import { RNCamera } from 'react-native-camera';

export default class Preset extends Component {

  content({ store: { main: { preset } } }){
    if(!preset){ return null }
    return this.preset(this.app)
  }

  preset({ media, button, text, action: { main }, store: { main: { preset }, ui: { window, style } } }){
    return(
      <div style={{ ...window, ...style.flexColCC, position: 'absolute', backgroundColor: 'black' }}>
        {preset.options.map(({ label, value }) => text.large({ text: label, key: value, onPress: ()=>{
          preset.onPress(value)
          main.set('preset', null)
        }}, { color: 'white', margin: 2 }))}
        {button.back({ onPress: ()=>{ main.set('preset', false) }})}
      </div>
    )
  }

}
