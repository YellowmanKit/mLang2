import React from 'react'
import Component from 'component/Component'

import Nav from './item/Nav'
import Menu from './item/Menu'
import Notice from './item/Notice'

import Account from './view/menu/Account'
import Profile from './view/menu/Profile'
import Credit from './view/menu/Credit'

import Index from './view/index/Index'

import School from './view/school/School'
import Course from './view/course/Course'
import Subject from './view/subject/Subject'
import Project from './view/project/Project'

import Student from './view/student/Student'
import CardViewer from './view/card/viewer/Viewer'
import CardEditor from './view/card/editor/Editor'

export default class Home extends Component {

  init({ action, store: { user: { user } } }){
    action.notice.greeting(()=>{ action.notice.kill('greeting') })
    action.toggle.set('grading', user.type === 'teacher')
  }

  content(app){
    return this.home(app)
  }

  home({ store: { page: { view }, ui: { window, style, color } } }){
    return(
      <div style={{ ...window, ...style.flexColSC }}>
        <Nav app={this.app}/>
        {this.view(view)}
        <Notice app={this.app}/>
        <Menu app={this.app}/>
      </div>
    )
  }

  view(view){
    switch (view) {
      case 'account':
        return <Account app={this.app}/>
      case 'profile':
        return <Profile app={this.app}/>
      case 'credit':
        return <Credit app={this.app}/>
      case 'index':
        return <Index app={this.app}/>
      case 'school':
        return <School app={this.app}/>
      case 'course':
        return <Course app={this.app}/>
      case 'addCourse':
        return <Course app={this.app} add={true}/>
      case 'subject':
        return <Subject app={this.app}/>
      case 'addSubject':
        return <Subject app={this.app} add={true}/>
      case 'project':
        return <Project app={this.app}/>
      case 'addProject':
        return <Project app={this.app} add={true}/>
      case 'studentProject':
        return <Student app={this.app}/>
      case 'card':
        return <CardViewer app={this.app}/>
      case 'addCard':
        return <CardEditor app={this.app} add={true}/>
      case 'editCard':
        return <CardEditor app={this.app}/>
      default:
        return null;
    }
  }

}
