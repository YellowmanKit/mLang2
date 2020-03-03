import React from 'react'
import Row from '../Row'

export default class Subject extends Row {

  init({ func, action }, { subject: { title, description, icon } }){
    this.state = {
      size: this.size(1,0.125, true),
      title: title,
      description: description,
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
