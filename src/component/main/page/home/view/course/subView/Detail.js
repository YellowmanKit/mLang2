import React from 'react'
import SubView from '../../SubView'
import Photo from 'component/element/Photo'

export default class Detail extends SubView {

  init({ func, action, store: { user: { user }, page: { nav }, main: { photo } }, action: { page, modal } }, { course, add }){
    if(user._id === course.teacher){ this.setEditButton(this.app) }
    if(user.type === 'student'){ this.setLeaveButton(this.app) }
    if(add){ this.setSaveButton(this.app) }
    this.state = { ...course, add,
      edit: add? true: false,
      teacher: add? user._id: course.teacher,
      endDate: add? func.addDayFromNow(365): course.endDate,
      file: {
        name: course.icon,
        type: 'courseIcon'
      },
      picked: photo,
      onChange: this.updatePicked,
      selectDate: false
    }
  }

  subView({ media, text, button, input, func, store: { ui: { style, color }, profile: { profiles } }, action: { main } },
          { edit, picked, title, teacher, description, createdAt, endDate, code, source, selectDate }){
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
        {text.title({ text: func.multiLang('Title','班名','班名') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: title })}
        {edit && input.shortText({
          value: title,
          placeholder: func.multiLang('Enter name', '請輸入校名', '请输入校名'),
          onChangeText: text => { this.setState({ title: text }) }
        })}
        {!edit && this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Teacher','老師','老师') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: func.userToProfile(teacher, profiles).name })}
        {!edit && this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Start','創建於','创建于') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: func.dateString(createdAt) })}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('End','完結於','完结于') })}
        {this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: func.dateString(endDate) })}
        {edit && !selectDate && text.moderate({ text: func.dateString(endDate), onPress: ()=>{ this.setState({ selectDate: true }) } })}
        {edit && selectDate && input.dateTimePicker({
          value: new Date(endDate),
          onChange: (event, date)=> { this.setState({ endDate: date, selectDate: false }) } },
          { ...this.size(1,0.275,true), backgroundColor: color.grey[0] }
        )}
        {!edit && this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Code','代碼','代码') })}
        {!edit && this.verSep(1)}
        {!edit && this.verGap(0.01)}
        {!edit && text.moderate({ text: code })}
      </div>
    )
  }

  save({ action : { modal, course, page }, store: { user: { user } } }, { title }, { add }){
    if(title === ''){
      return modal.invalid(()=>{ modal.off() })
    }
    if(add){
      course.update(this.state)
    }else{
      course.update(this.state)
      this.setEditButton(this.app)
      this.setState({ edit: false })
    }
  }

  leave({ action, store: { user: { user }, course: { viewingCourse } } }){
    action.course.leave({ code: viewingCourse.code, userId: user._id})
  }

}
