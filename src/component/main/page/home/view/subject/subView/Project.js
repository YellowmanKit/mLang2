import React from 'react'
import SubView from '../../SubView'
import ProjectList from '../../../list/item/Project'

export default class Project extends SubView {

  init({ store: { user: { user: { type } }, page: { nav } }, action: { page, subject } }){
    if(type === 'teacher'){
      subject.set('viewingProject', {})
      page.set('nav', {...nav,
        right: {
          icon: require('res/image/button/add.png'),
          onPress: ()=>{ page.push('addProject') }
        }
      })
    }else{
      page.set('nav', {...nav,
        right: null
      })
    }
  }

  subView({ store: { ui: { style } } }, {}, { projects }){
    return(
      <div style={style.flexColCS}>
        <ProjectList app={this.app} projects={projects}/>
      </div>
    )
  }

}
