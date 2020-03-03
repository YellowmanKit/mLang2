import React from 'react'
import Basket from '../Basket'
import CourseCell from '../cell/item/Course'

export default class Course extends Basket {

  cells({ courses }){
    courses.push({ more: true })
    courses.push({ add: true })
    return courses.map(course => this.course(this.app, { course }) )
  }

  course({ func, button, action, store: { user: { user }, ui: { style }, toggle: { expiredCourse } } }, { course }){
    const expired = func.expired(course.endDate)
    if(expired && expiredCourse){ return null }
    if(course.more){
      return button.more({ onPress: ()=>{ action.toggle.set('expiredCourse', !expiredCourse) }, key: this.key() })
    }
    return(
      <div style={{ ...style.flexColCC, ...this.size(0.175,0.175) }} key={course._id?course._id:this.key()}>
        {course.add && button.add({ key: this.key(), onPress: ()=>{
          if(user.type === 'teacher'){
            action.page.push('addCourse')
            action.course.set('viewingCourse', {})
          }else if(user.type === 'student'){
            action.modal.confirm(['Enter class code','輸入班別代碼','输入班别代码'],
            code => { action.course.join({ code, userId: user._id }) },
            ()=>{ action.modal.off() },
            ['Class code','班別代碼','班别代码'])
          }
        } })}
        {!course.add && <CourseCell app={this.app} course={course} expired={expired}/>}
      </div>
    )
  }

}
