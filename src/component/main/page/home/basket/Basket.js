import React from 'react'
import Component from 'component/Component'

export default class Backet extends Component {

  content({ button, store: { ui: { style, color, window } } }, { tab, hide, onPress }){
    return(
      <div style={{ ...style.flexColCS }}>
        {tab && button.tab({ text: tab, hide, onPress })}
        {!hide && this.basket(this.app)}
      </div>
    )
  }

  basket({ text, store: { ui: { window, style } } }){
    return(
      <div style={{...style.flexRowSS, flexWrap: 'wrap', width: window.width }}>
        {this.cells(this.props)}
      </div>
    )
  }

}
