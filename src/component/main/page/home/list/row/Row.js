import React from 'react'
import Component from 'component/Component'

export default class Row extends Component {

  content({ store: { ui: { style, color } } }){
    this.rowStyle = {
      ...this.state.size,
      ...style.flexRowCC,
      backgroundColor: 'white',
      opacity: this.state.expired? 0.5: 1,
      margin: 1 }
    return this.row(this.state)
  }

  row({ expired, size: { height } }){
    return(
      <div style={this.rowStyle} onPress={this.state.onPress}>
        {this.icon(this.app, this.state)}
        {this.info(this.app, this.state)}
        {expired && <img source={require('res/image/ui/expired.png')} style={{
          width: height,
          height: height,
          resizeMode: 'contain',
          position: 'absolute'}}/>}
      </div>
    )
  }

  icon({ media, store: { ui: { style, color } } }, { source }){
    return(
      <img source={source}
      style={{ ...style.border,
        width: this.state.size.height * 0.9,
        height: this.state.size.height * 0.9,
        resizeMode: 'contain' }}/>
    )
  }

  info({ text, store: { ui: { style, color } } }, { size, title, description, period }){
    return(
      <div style={{ ...style.flexColCC,
        width: size.width - size.height,
        height: size.height * 0.9,
        justifyContent: 'space-evenly'
      }}>
      {title && text.large({ text: title })}
      {description !== undefined && text.moderate({ text: description })}
      {period && text.moderate({ text: period })}
      {this.custom && this.custom(this.app, this.props)}
      </div>
    )
  }

}
