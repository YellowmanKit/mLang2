import React from 'react'
import Component from 'component/Component'

export default class List extends Component {

  content({ store: { ui: { style, color, window } } }){
    this.listStyle = { ...style.flexColCS, width: window.width }
    return this.list()
  }

  list(){
    return(
      <div style={this.listStyle}>
        {this.rows(this.app, this.props)}
      </div>
    )
  }

}
