import React from 'react'
import SubView from '../../SubView'
import Photo from 'component/element/Photo'

export default class Detail extends SubView {

  init({ store: { user: { user }, page: { nav }, main: { photo } }, action: { page, modal } }, { school }){
    if(user._id === school.admin){ this.setEditButton(this.app) }
    this.state = { ...school,
      edit: false,
      file: {
        name: school.icon,
        type: 'schoolIcon'
      },
      picked: photo,
      onChange: this.updatePicked
    }
  }

  subView({ media, text, button, input, func, store: { ui: { style } }, action: { main } },
          { edit, picked, name, description, createdAt, code, source }){
    return(
      <div style={this.subViewStyle}>
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Icon','圖標','图标') })}
        {this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && button.image({ icon: picked? picked: this.state.source, onPress: ()=>{ main.set('enlarger', this.state.source) } })}
        {edit && <Photo app={this.app} icon={picked? picked: source}/>}
        {edit && this.verSep(1)}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Name','校名','校名') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: name })}
        {edit && input.shortText({
          value: name,
          placeholder: func.multiLang('Enter name', '請輸入校名', '请输入校名'),
          onChangeText: text => { this.setState({ name: text }) }
        })}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Description','描述','描述') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: description })}
        {edit && input.longText({
          value: description,
          placeholder: func.multiLang('Enter description', '請輸入描述', '请输入描述'),
          onChangeText: text => { this.setState({ description: text }) }
        })}
        {!edit && this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Start','創建於','创建于') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: func.dateString(new Date(createdAt)) })}
        {!edit && this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Code','代碼','代码') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: code })}
      </div>
    )
  }

  save({ action : { modal, school } }, { name }){
    if(name === ''){
      return modal.invalid(()=>{ modal.off() })
    }
    school.update(this.state)
    this.setEditButton(this.app)
    this.setState({ edit: false })
  }

}
