import React from 'react'
import View from '../../View'
import SchoolBasket from '../../../basket/item/School'
import CourseBasket from '../../../basket/item/Course'
import SubjectBasket from '../../../basket/item/Subject'

export default class Teacher extends View {

  view({ func, store: { ui: { style } } }){
    return(
      <div style={style.flexColCS}>
        {this.schoolBasket(this.app)}
        {this.courseBasket(this.app)}
        {this.subjectBasket(this.app)}
      </div>
    )
  }

  schoolBasket({ func, action, store: {
    toggle: { school },
    profile: { profile },
    school: { schools } } }
  ){
    return(
      <SchoolBasket app={this.app}
      tab={func.multiLang('School','學校','学校')}
      hide={!school}
      onPress={()=>{ action.toggle.set('school', !school) }}
      schools={func.idsToItems(profile.joinedSchools, schools)}/>
    )
  }

  courseBasket({ func, action, store: {
    toggle: { course },
    course: { courses, teachingCourses } } }
  ){
    return(
      <CourseBasket app={this.app}
      tab={func.multiLang('Class','班別','班别')}
      hide={!course}
      onPress={()=>{ action.toggle.set('course', !course) }}
      courses={func.idsToItems(teachingCourses, courses)}/>
    )
  }

  subjectBasket({ func, action, store: {
    toggle: { subject },
    subject: { subjects, teachingSubjects },
    course: { courses, teachingCourses },
    project: { projects, teachingProjects} } }
  ){
    return(
      <SubjectBasket app={this.app}
      tab={func.multiLang('Unit','單元','单元')}
      hide={!subject}
      onPress={()=>{ action.toggle.set('subject', !subject) }}
      courses={func.idsToItems(teachingCourses, courses)}
      subjects={func.idsToItems(teachingSubjects, subjects)}
      projects={func.idsToItems(teachingProjects, projects)}/>
    )
  }

}
