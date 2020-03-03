import React from 'react'
import Cell from '../Cell'

export default class Project extends Cell {

  init({ alert, func, action }, { project: { title, icon, subject } }){
    this.state = { title,
      size: this.size(0.1,0.1),
      alert: alert.project(this.props.project),
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
