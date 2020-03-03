import React from 'react'
import List from '../List'
import SubjectRow from '../row/item/Subject'

export default class Subject extends List {

  rows({ func }, { subjects }){
    return subjects.map(subject => <SubjectRow app={this.app} subject={subject} key={subject._id}/>)
  }

}
