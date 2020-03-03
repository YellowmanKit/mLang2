import React from 'react'
import Basket from '../Basket'
import SubjectCell from '../cell/item/Subject'
import ProjectCell from '../cell/item/Project'

export default class Subject extends Basket {

  cells({ app: { text, func, store: { ui: { style } } }, courses, subjects, projects }){
    var cells = []
    for(var i=0;i<courses.length;i++){
      if(func.expired(courses[i].endDate)){ continue }
      cells.push(courses[i])
      for(var j=0;j<subjects.length;j++){
        if(subjects[j].course !== courses[i]._id){ continue }
        if(func.isSubject(cells[cells.length - 1])){ cells.splice(cells.length - 1, 1) }
        cells.push(subjects[j])
        for(var k=0;k<projects.length;k++){
          if(func.expired(projects[k].endDate)){ continue }
          if(projects[k].subject !== subjects[j]._id){ continue }
          cells.push(projects[k])
        }
      }
    }
    if(func.isSubject(cells[cells.length - 1])){ cells.splice(cells.length - 1, 1) }
    return cells.map(cell=>{
      if(func.isCourse(cell)){ return this.courseTitle(this.app, cell) }
      if(func.isSubject(cell)){ return this.subject(this.app, cell) }
      if(func.isProject(cell)){ return this.project(this.app, cell) }
    })
  }

  courseTitle({ text, store: { ui: { style, color } } }, course){
    return(
      <div style={{...style.flexColCC, ...this.size(0.03,0.2)}} key={course._id}>
        {this.horSep(0.075)}
        {text.hint({ text: course.title })}
        {this.horSep(0.075)}
      </div>
    )
  }

  subject({ store: { ui: { style } } }, subject){
    return(
      <div style={{...style.flexColCC, ...this.size(0.15,0.2)}} key={subject._id}>
        <SubjectCell app={this.app} subject={subject}/>
      </div>
    )
  }

  project({ store: { ui: { style } } }, project){
    return(
      <div style={{...style.flexColCC, ...this.size(0.11,0.2)}} key={project._id}>
        <ProjectCell app={this.app} project={project}/>
      </div>
    )
  }

}
