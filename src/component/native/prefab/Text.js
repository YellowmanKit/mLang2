import React from 'react'
import Native from '../Native'

export default class Text extends Native {

  tab(option){
    return this.text(option, {...this.size(0.9,0.025,true),...this.fontSize(0.02), fontWeight: 'bold'})
  }

  nav(option){
    return this.text(option, {...this.size(0.9, 0.0375, true), ...this.fontSize(0.035),
      color: 'white', fontWeight: 'bold', textAlign: 'center' })
  }

  modal(option){
    return this.text(option, {...this.fontSize(0.02), backgroundColor: 'rgba(255,255,255,0.95)', padding: 7, borderRadius: 10, overflow: 'hidden' })
  }

  hint(option){
    return this.small(option, { color: this.ui.color.grey[2] })
  }

  title(option){
    return this.moderate(option, { color: this.ui.color.green[0] })
  }

  tiny(option, style){
    return this.text(option, {...this.fontSize(0.01), fontWeight: 'bold', ...style })
  }

  small(option, style){
    return this.text(option, {...this.fontSize(0.015), fontWeight: 'bold', ...style })
  }

  moderate(option, style){
    return this.text(option, {...this.fontSize(0.02), fontWeight: 'bold', ...style })
  }

  large(option, style){
    return this.text(option, {...this.fontSize(0.03), fontWeight: 'bold', ...style })
  }

  huge(option, style){
    return this.text(option, {...this.fontSize(0.04), fontWeight: 'bold', ...style })
  }

}
