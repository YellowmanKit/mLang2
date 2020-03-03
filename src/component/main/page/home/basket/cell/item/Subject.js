import React from 'react'
import Cell from '../Cell'

export default class Subject extends Cell {

  init({ alert, func, action }, { subject: { title, icon, course } }){
    this.state = { title,
      size: this.size(0.135,0.135),
      alert: alert.subject(this.props.subject),
      file: {
        name: icon,
        type: 'subjectIcon'
      },
      onPress: ()=>{
        action.subject.set('viewingSubject', this.props.subject)
        action.page.push('subject')
      }
    }
  }

}
