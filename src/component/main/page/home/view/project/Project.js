import React from 'react'
import View from '../View'

import Card from './subView/Card'
import Student from './subView/Student'
import Detail from './subView/Detail'
import Ranking from './subView/Ranking'

export default class Project extends View {

  init({ func, action, store: { studentProject: { studentProjects }, user: { user }, course: { courses }, subject: { subjects }, project: { viewingProject }, card: { filter } } }, { add }){
    action.page.set('nav', {
      title: ['PROJECT', '專題研習','专题研习']
    })
    action.page.setSubView(add? 'detail': 'card', true)
    if(!add){
      action.course.set('viewingCourse',func.idToItem(func.idToItem(viewingProject.subject, subjects).course, courses))
      action.subject.set('viewingSubject',func.idToItem(viewingProject.subject, subjects))
      this.viewCards(this.app, { cards: func.cardsFromProject(viewingProject), filter: { ...filter, author: user.type ==='student'? user._id: undefined } })
    }
    if(user.type === 'student'){
      const studentProject = func.studentProject({ student: user._id, project: viewingProject._id, studentProjects})
      if(!studentProject){
        action.studentProject.fetch({ student: user._id, project: viewingProject._id })
      }else{
        action.studentProject.set('viewingStudentProject', studentProject)
      }

    }
  }

  view({ button, func, action: { page, card }, store: { user: { user } , project: { viewingProject }, ui: { style } } }, {}, { add }){
    var subViews = [
      {
        key: 'card',
        text: func.multiLang('Card',' 己提交','己提交'),
        onPress: ()=>{
          page.setSubView('card')
        }
      },
      /*{ sep: true },
      {
        key: 'group',
        text: func.multiLang('Group','小組','小组'),
        onPress: ()=>{ page.setSubView('group') }
      },*/
      { sep: true },
      {
        key: 'ranking',
        text: func.multiLang('Ranking','排名','排名'),
        onPress: ()=>{ page.setSubView('ranking') }
      },
      { sep: true },
      {
        key: 'detail',
        text: func.multiLang('Detail','詳細資料','详细资料'),
        onPress: ()=>{ page.setSubView('detail') }
      }
    ]
    if(user.type === 'teacher'){
      subViews.splice(1,0, { sep: true })
      subViews.splice(2,0,
      {
        key: 'student',
        text: func.multiLang('Student','學生','学生'),
        onPress: ()=>{ page.setSubView('student') }
      })
    }
    return(
      <div style={style.flexColCS}>
        {button.tab({ text: add? func.multiLang('Adding...', '創建中...', '创建中...'): viewingProject.title })}
        {!add && this.subViewBar(this.app, { subViews })}
        {this.subView(this.app, this.props)}
      </div>
    )
  }

  subView({ func, store: { page: { subView }, profile: { profiles }, project: { viewingProject }, studentProject: { studentProjects } } }, { add }){
    switch (subView) {
      case 'card':
        return <Card app={this.app} cards={func.cardsFromProject(viewingProject)} viewCards={this.viewCards.bind(this)}/>
      case 'student':
        return <Student app={this.app} studentProjects={func.idsToItems(viewingProject.studentProjects, studentProjects)}/>
      case 'detail':
        return <Detail app={this.app} project={viewingProject} add={add}/>
      case 'ranking':
        return <Ranking app={this.app} studentProjects={func.idsToItems(viewingProject.studentProjects, studentProjects)}/>
      default:
        return null
    }
  }

}
