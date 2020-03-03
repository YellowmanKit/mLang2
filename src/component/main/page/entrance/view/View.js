import React from 'react'
import Component from 'component/Component'

export default class View extends Component {

  content({ store: { ui: { style, color } } }){
    this.viewStyle = { ...this.size(1,1,true), ...style.flexColCC }
    return this.view(this.app)
  }

}
