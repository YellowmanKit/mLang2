import React from 'react'
import Row from '../Row'

export default class Project extends Row {

  init({ func, action }, { project: { title, description, icon, createdAt, endDate }, expired }){
    this.state = {
      expired,
      size: this.size(1,0.15, true),
      title: title,
      description: description,
      period: func.periodString(createdAt, endDate),
      file: {
        name: icon,
        type: 'projectIcon'
      },
      onPress: ()=>{
        action.project.set('viewingProject', this.props.project)
        action.page.push('project')
      }
    }
  }

}
