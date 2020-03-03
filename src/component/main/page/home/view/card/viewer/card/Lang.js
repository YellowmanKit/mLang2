import React from 'react'
import Component from 'component/Component'
import Key from './Key'
import Audio from 'component/element/Audio'

export default class Lang extends Component {

  init({}, { langs }){
    const keys = langs.map(lang => { return lang.key })
    this.state = {
      keys,
      selected: keys[0],
      langs: this.langs(langs),
      file: {
        name: (langs[0] && langs[0].audio)? langs[0].audio: null,
        type: 'langAudio'
      }
    }
  }

  langs(langs){
    var langsObject = {}
    langs.map(lang => { langsObject[lang.key] = lang })
    return langsObject
  }

  content({ store: { ui: { style } } }){
    return this.lang(this.app, this.state, this.props)
  }

  lang({ text, action: { main }, store: { ui: { style } } }, { keys, selected, langs, source }){
    return(
      <div style={{ ...style.flexColCS, ...this.size(0.4, 0.25) }}>
        <div style={{ ...style.flexRowCC, ...this.size(0.4, 0.05) }}>
          <Key app={this.app} keys={keys} selected={selected} onSelect={key=>{
            this.setState({
              selected: key,
              file: { name: this.state.langs[key].audio, type: 'langAudio' }
            }, ()=>{ this.createSource(this.app, this.state) })}}/>
          <Audio app={this.app} source={source}/>
        </div>
        {text.large({ text: langs[selected]? langs[selected].text:'',
        onPress: ()=>{ if(langs[selected] && langs[selected].text.length > 0){ main.set('enlarger', { text: langs[selected].text }) } } },
        { ...this.size(0.335, 0.175)})}
      </div>
    )
  }

}
