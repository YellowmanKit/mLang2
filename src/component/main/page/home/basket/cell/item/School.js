import React from 'react'
import Cell from '../Cell'

export default class Course extends Cell {

  init({ func, action, store: { course: { courses } } }, { school: { name, icon } }){
    this.state = {
      size: this.size(0.2,0.15),
      title: name,
      file: {
        name: icon,
        type: 'schoolIcon'
      },
      onPress: ()=>{
        action.course.set('viewingSchool', this.props.school)
        action.page.push('school')
      }
    }
  }

}
