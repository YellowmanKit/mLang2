import React from 'react'
import SubView from '../../SubView'
import SubjectList from '../../../list/item/Subject'

export default class Subject extends SubView {

  init({ store: { user: { user: { type } }, page: { nav } }, action: { page, subject } }){
    if(type === 'teacher'){
      subject.set('viewingSubject', {})
      page.set('nav', {...nav,
        right: {
          icon: require('res/image/button/add.png'),
          onPress: ()=>{ page.push('addSubject') }
        }
      })
    }
  }

  subView({ store: { ui: { style } } }, {}, { subjects }){
    return(
      <div style={style.flexColCS}>
        <SubjectList app={this.app} subjects={subjects}/>
      </div>
    )
  }

}
