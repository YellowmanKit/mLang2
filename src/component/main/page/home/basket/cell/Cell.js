import React from 'react'
import Component from 'component/Component'

export default class Cell extends Component {

  content({ store: { ui: { style, color } } }){
    this.cellStyle = {
      ...this.state.size,
      ...style.flexColCC,
      ...style.border,
      ...style.shadow,
      backgroundColor: 'white', opacity: this.state.expired? 0.5: 1
    }
    return this.cell(this.state)
  }

  cell({ expired, size: { height } }){
    return(
      <div style={this.cellStyle} onPress={this.state.onPress}>
        {this.icon(this.app, this.state)}
        {this.title(this.app, this.state)}
        {this.badge(this.app, this.state)}
        {this.heart(this.app, this.state)}
        {this.state.tag && this.tag(this.app, this.state)}
        {this.alert(this.app, this.state)}
        {expired && <img alt='' source={require('res/image/ui/expired.png')} style={{
          width: height,
          height: height,
          resizeMode: 'contain',
          position: 'absolute'}}/>}
      </div>
    )
  }

  icon({ media, store: { ui: { style, color } } }, { size, fileName, fileType, source }){
    return(
      <img alt='' source={source}
      style={{ ...style.border,
        borderColor: color.grey[1],
        width: size.width * 1,
        height: size.height * 0.7,
        resizeMode: 'contain' }}/>
    )
  }

  title({ text, store: { ui: { style, color } } },{ size, title }){
    return text.small({ text: title },{
      width: size.width * 0.775,
      height: size.height * 0.3,
      textAlign: 'center'
    })
  }

  badge({},{ badge }){
    return <img alt='' source={
      badge === 'failed'? require('res/image/badge/failed.png'):
      badge === 'passed'? require('res/image/badge/passed.png'):
      badge === 'featured'? require('res/image/badge/featured.png'): null}
      style={{ ...this.size(0.065,0.065), resizeMode: 'contain', position: 'absolute', top: -2, right: -2 }}/>
  }

  heart({ text, store: { ui: { style, window: { width } } } }, { badge, like }){
    if(badge !== 'featured' || like === undefined){ return null }
    return(
      <div style={{ ...this.size(0.025, 0.025), ...style.flexColCC, position: 'absolute', top: width * -0.02 , left: width * -0.02 }}>
        <img alt='' source={require('res/image/icon/heart.png')} style={{ ...style.background }}/>
        {text.tiny({ text: like }, { color: 'white' })}
      </div>
    )
  }

  tag({ store: { ui: { style } } }, { hasComment, hasAudioComment }){
    return(
      <div style={{ ...this.size(0.015,0.03), ...style.flexColCE, position: 'absolute', bottom: 0, right: 0}}>
        <img alt='' source={require('res/image/icon/comment.png')} style={{ ...this.size(0.0125,0.0125), opacity: hasComment? 1: 0.25 }}/>
        <img alt='' source={require('res/image/icon/audio_comment.png')} style={{ ...this.size(0.0125,0.0125), opacity: hasAudioComment? 1: 0.25 }}/>
      </div>
    )
  }

  alert({ store: { ui: { window: { height } } } }, { alert }){
    return <img alt='' source={
      alert? require('res/image/icon/alert_circle.png'): null}
      style={{ ...this.size(0.025,0.025), resizeMode: 'contain', position: 'absolute', top: height * -0.0125, right: height * -0.0125 }}/>
  }

}
