import React from 'react'
import SubView from '../../SubView'
import Photo from 'component/element/Photo'

export default class Detail extends SubView {

  init({ func, store: { user: { user }, page: { nav }, main: { photo }, subject: { viewingSubject } }, action: { page } }, { project, add }){
    if(user.type === 'teacher'){ this.setEditButton(this.app) }
    else if(add){ this.setSaveButton(this.app) }
    else{ page.set('nav', { ...nav, right: null }) }
    this.state = { ...project, add,
      edit: add? true: false,
      subject: add? viewingSubject._id: project.subject,
      endDate: add? func.addDayFromNow(7): project.endDate,
      file: {
        name: project.icon,
        type: 'projectIcon'
      },
      picked: photo,
      onChange: this.updatePicked,
      selectDate: false
    }
  }

  subView({ media, text, button, input, func, store: { ui: { style, color }, subject: { subjects, viewingSubject } }, action: { main } },
          { edit, picked, title, description, createdAt, endDate, source, selectDate }){
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
        {!edit && text.title({ text: func.multiLang('Unit','單元','单元') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: viewingSubject.title })}
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
        {this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Start','創建於','创建于') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: func.dateString(createdAt) })}
        {!edit && this.verGap(0.02)}
        {text.title({ text: func.multiLang('End','完結於','完结于') })}
        {this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: func.dateString(endDate) })}
        {edit && !selectDate && text.moderate({ text: func.dateString(endDate), onPress: ()=>{ this.setState({ selectDate: true }) } })}
        {edit && selectDate && input.dateTimePicker({
          value: new Date(endDate),
          onChange: (event, date)=> { this.setState({ endDate: date, selectDate: false })}},
          { ...this.size(1,0.275,true), backgroundColor: color.grey[0] }
        )}
        {this.verGap(0.1)}
      </div>
    )
  }

  save({ action : { modal, project } }, { title, picked }, { add }){
    if(title === '' || (add && !picked)){
      return modal.invalid(()=>{ modal.off() })
    }
    if(add){
      project.update(this.state)
    }else{
      project.update(this.state)
      this.setEditButton(this.app)
      this.setState({ edit: false })
    }
  }

}
