import React from 'react'
import Cell from '../Cell'

export default class Course extends Cell {

  init({ action, store: { course: { courses } } }, { course: { title, icon, endDate }, expired }){
    this.state = { title, expired,
      size: this.size(0.15,0.15),
      file: {
        name: icon,
        type: 'courseIcon'
      },
      onPress: ()=>{
        action.course.set('viewingCourse', this.props.course)
        action.page.push('course')
      }
    }
  }

}
