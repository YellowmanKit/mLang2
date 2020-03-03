import React from 'react'
import List from '../List'
import ProjectRow from '../row/item/Project'

export default class Project extends List {

  rows({ func, button, action, store: { toggle: { expiredProject } } }, { projects }){
    projects.push({ more: true })
    return projects.map(project => {
      if(project.more){ return button.more({ key: this.key(), onPress: ()=>{ action.toggle.set('expiredProject', !expiredProject) } }) }
      const expired = func.expired(project.endDate)
      if(expiredProject && expired){ return null }
      return <ProjectRow app={this.app} project={project} expired={expired} key={project._id}/>
    })
  }

}
