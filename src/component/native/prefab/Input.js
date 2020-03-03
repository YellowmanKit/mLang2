import React from 'react'
import Native from '../Native'

export default class Input extends Native {

  standardPicker(option){
    return this.picker(option, { ...this.size(0.5,0.15,true) })
  }

  dateTimePicker({ value, mode, onChange }, style){
    /*return(
      <DateTimePicker
      style={style}
      value={value}
      mode={mode? mode: 'date'}
      is24Hour={true}
      display='default'
      onChange={onChange} />
    )*/
  }

  standardCheckboxBar(option){
    return this.checkboxBar(option, {
      view: {...this.ui.style.flexRowCC, ...this.size(0.5, 0.03)},
      checkbox: this.size(0.02, 0.02),
      text: {...{ color: 'white', fontWeight: 'bold' }, ...this.fontSize(0.02) }
    })
  }

  standardSwitch(option){
    return this.switch(option, {
      view: {...this.ui.style.flexRowCC, ...this.size(0.5, 0.04)},
      text: {...{ color: 'white', fontWeight: 'bold' }, ...this.fontSize(0.025) }
    })
  }

  longText(option){
    return this.standardText({ ...option, multiline: true }, {
      ...this.size(0.3, 0.2),
      ...this.fontSize(0.02)
    })
  }

  shortText(option){
    return this.standardText(option, {
      ...this.size(0.35, 0.0325),
      ...this.fontSize(0.02)
    })
  }

  standardText(option, style){
    return this.textInput(option, { backgroundColor: 'white', borderWidth: 1, borderColor: '#9b9b9b', ...style })
  }

}
