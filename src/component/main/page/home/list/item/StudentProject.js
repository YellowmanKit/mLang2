import React from 'react'
import List from '../List'
import StudentProjectRow from '../row/item/StudentProject'

export default class StudentProject extends List {

  rows({},{ studentProjects }){
    return studentProjects.map(studentProject =>
      <StudentProjectRow app={this.app} studentProject={studentProject} key={studentProject._id}/>)
  }

}
