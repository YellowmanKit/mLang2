import React from 'react'
import View from '../View'

import Subject from './subView/Subject'
import Student from './subView/Student'
import Detail from './subView/Detail'

export default class Course extends View {

  init({ func, action }, { add }){
    action.page.set('nav', {
      title: ['COURSE', '班別','班别']
    })
    action.page.setSubView(add? 'detail': 'subject', true)
  }

  view({ button, func, action: { page }, store: { course: { viewingCourse }, ui: { style } } }, {}, { add }){
    return(
      <div style={style.flexColCS}>
        {button.tab({ text: add? func.multiLang('Adding...', '創建中...', '创建中...'): viewingCourse.title })}
        {!add && this.subViewBar(this.app, { subViews: [
          {
            key: 'subject',
            text: func.multiLang('Unit','單元','单元'),
            onPress: ()=>{ page.setSubView('subject') }
          },
          {
            key: 'student',
            text: func.multiLang('Student','學生','学生'),
            onPress: ()=>{ page.setSubView('student') }
          },
          { sep: true },
          {
            key: 'detail',
            text: func.multiLang('Detail','詳細資料','详细资料'),
            onPress: ()=>{ page.setSubView('detail') }
          }
        ]})}
        {this.subView(this.app, this.props)}
      </div>
    )
  }

  subView({ func, store: { page: { subView }, course: { viewingCourse }, subject: { subjects }, profile: { profiles } } }, { add }){
    switch (subView) {
      case 'subject':
        return <Subject app={this.app} subjects={func.idsToItems(viewingCourse.subjects, subjects)}/>
      case 'student':
        return <Student app={this.app} profiles={func.usersToProfiles(viewingCourse.joinedStudents, profiles)}/>
      case 'detail':
        return <Detail app={this.app} course={viewingCourse} add={add}/>
      default:
        return null
    }
  }

}
