import React from 'react'
import View from './View'

export default class SubView extends View {

  init({ store: { page: { nav } }, action: { page } }){
    page.set('nav', { ...nav,
      right: null
    })
  }

  content({ store: { ui: { window, style, color } } }, { add }){
    this.subViewStyle = {...style.flexColCS, ...this.minSize(1, 1.25, true), backgroundColor: 'white'}
    return this.subView(this.app, this.state, this.props)
  }

}
