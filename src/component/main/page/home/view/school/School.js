import React from 'react'
import View from '../View'

import Teacher from './subView/Teacher'
import Detail from './subView/Detail'

export default class School extends View {

  init({ func, action }){
    action.page.set('nav', {
      title: ['SCHOOL', '學校','学校']
    })
    action.page.setSubView('teacher', true)
  }

  view({ button, func, action: { page }, store: { school: { viewingSchool }, ui: { style } } }){
    return(
      <div style={style.flexColCS}>
        {button.tab({ text: viewingSchool.name })}
        {this.subViewBar(this.app, { subViews: [
          /*{
            key: 'statistic',
            text: func.multiLang('Stat','統計','统计'),
            onPress: ()=>{ page.setSubView('statistic') }
          },
          { sep: true },*/
          {
            key: 'teacher',
            text: func.multiLang('Teacher','老師','老师'),
            onPress: ()=>{ page.setSubView('teacher') }
          },
          { sep: true },
          {
            key: 'detail',
            text: func.multiLang('Detail','詳細資料','详细资料'),
            onPress: ()=>{ page.setSubView('detail') }
          }
        ]})}
        {this.subView(this.app)}
      </div>
    )
  }

  subView({ func, store: { page: { subView }, school: { viewingSchool }, profile: { profiles } } }){
    switch (subView) {
      case 'teacher':
        return <Teacher app={this.app} profiles={func.usersToProfiles(viewingSchool.joinedTeachers, profiles)}/>
      case 'detail':
        return <Detail app={this.app} school={viewingSchool}/>
      default:
        return null
    }
  }

}
