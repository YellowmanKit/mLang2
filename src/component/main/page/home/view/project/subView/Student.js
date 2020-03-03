import React from 'react'
import SubView from '../../SubView'
import StudentProjectList from '../../../list/item/StudentProject'

export default class Student extends SubView {

  init({ store: { page: { nav } }, action: { page } }){
    page.set('nav', {...nav,
      right: null
    })
  }

  subView({ store: { ui: { style }, user: { user } } }, {}, { studentProjects }){
    return(
      <div style={style.flexColCS}>
        <StudentProjectList app={this.app} studentProjects={studentProjects.map(studentProject =>{
          return studentProject.cards.length > 0? studentProject: null })
          .filter(value => { return value && (value.student !== user._id) })}/>
        {this.missingStudent(this.app, this.props)}
      </div>
    )
  }

  missingStudent({ func, text, store: { ui: { color, style }, profile: { profiles }, course: { viewingCourse } } }, { studentProjects }){
    return viewingCourse.joinedStudents.map(student=>{
      for(var i=0;i<studentProjects.length;i++){
        if(studentProjects[i].student === student && studentProjects[i].cards.length > 0){
          return null
        }
      }
      const profile = func.userToProfile(student, profiles)
      if(!profile){ return null }
      return(
        <div style={{...this.size(1,0.025,true), ...style.flexRowCC, backgroundColor: color.grey[0] }} key={student}>
          {text.hint({ text: func.multiLang(
            profile.name + ' had not yet submit any card',
            profile.name + ' 尚未提交任何卡片',
            profile.name + ' 尚未提交任何卡片')}
          )}
        </div>
      )
    })
  }

}
