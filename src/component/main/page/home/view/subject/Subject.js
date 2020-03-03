import React from 'react'
import View from '../View'
import Project from './subView/Project'
import Detail from './subView/Detail'

export default class Subject extends View {

  init({ func, action, store: { course: { courses }, subject: { viewingSubject } } }, { add }){
    action.page.set('nav', {
      title: ['UNIT', '單元','单元']
    })
    action.page.setSubView(add? 'detail': 'project', true)
    if(!add){ action.course.set('viewingCourse', func.idToItem(viewingSubject.course, courses)) }
  }

  view({ button, func, action: { page }, store: { subject: { viewingSubject }, ui: { style } } }, {}, { add }){
    return(
      <div style={style.flexColCS}>
        {button.tab({ text: add? func.multiLang('Adding...', '創建中...', '创建中...'): viewingSubject.title })}
        {!add && this.subViewBar(this.app, { subViews: [
          {
            key: 'project',
            text: func.multiLang('Project','專題研習','专题研习'),
            onPress: ()=>{ page.setSubView('project') }
          },
          { sep: true },
          {
            key: 'detail',
            text: func.multiLang('Detail','詳細資料','详细资料'),
            onPress: ()=>{ page.setSubView('detail') }
          }
        ]})}
        {this.subView(this.app, this.props)}
      </div>
    )
  }

  subView({ func, store: { page: { subView }, subject: { viewingSubject }, project: { projects } } }, { add }){
    switch (subView) {
      case 'project':
        return <Project app={this.app} projects={func.idsToItems(viewingSubject.projects, projects)}/>
      case 'detail':
        return <Detail app={this.app} subject={viewingSubject} add={add}/>
      default:
        return null
    }
  }

}
