import React from 'react'
import SubView from '../../SubView'
import Photo from 'component/element/Photo'

export default class Detail extends SubView {

  init({ store: { user: { user }, page: { nav }, main: { photo }, course: { viewingCourse } }, action: { page, modal } }, { subject, add }){
    if(user.type === 'teacher'){ this.setEditButton(this.app) }
    if(add){ this.setSaveButton(this.app)}
    this.state = { ...subject, add,
      edit: add? true: false,
      course: add? viewingCourse._id: subject.course,
      file: {
        name: subject.icon,
        type: 'subjectIcon'
      },
      picked: photo,
      onChange: this.updatePicked
    }
  }

  subView({ media, text, button, input, func, store: { ui: { style }, course: { courses, viewingCourse } }, action: { main } },
          { edit, picked, title, description, createdAt, source }){
    return(
      <div style={this.subViewStyle}>
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Icon','圖標','图标') })}
        {this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && button.image({ icon: picked? picked: this.state.source, onPress: ()=>{ main.set('enlarger', this.state.source) } })}
        {edit && <Photo app={this.app} icon={picked? picked: source}/>}
        {edit && this.verSep(1)}
        {!edit && this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Class','班別','班别') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: viewingCourse.title })}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Title','標題','标题') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: title })}
        {edit && input.shortText({
          value: title,
          placeholder: func.multiLang('Enter title', '請輸入標題', '请输入标题'),
          onChangeText: text => { this.setState({ title: text }) }
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
        {!edit && text.moderate({ text: func.dateString(createdAt) })}
      </div>
    )
  }

  save({ action : { modal, subject } }, { title }, { add }){
    if(title === ''){
      return modal.invalid(()=>{ modal.off() })
    }
    if(add){
      subject.update(this.state)
    }else{
      subject.update(this.state)
      this.setEditButton(this.app)
      this.setState({ edit: false })
    }
  }

}
