import React from 'react'
import Component from 'component/Component'

export default class Menu extends Component {

  content({ store: { toggle: { menu } } }){
    if(!menu){ return null }
    return this.menu(this.app)
  }

  menu({ button, store: { ui: { window, style } }, action: { toggle, page } }){
    return(
      <div style={{...window, ...style.flexRowCS, position: 'absolute', top: 0, left: 0 }}>
        {this.options(this.app)}
        {button.touchableOpacity({ onPress: ()=>{ toggle.set('menu',false) }},{ view: { ...this.size(0.65,1,true) } })}
      </div>
    )
  }

  options({ func, text, store: { ui: { style, color }, user: { user }, profile: { profile } }, action: { toggle, page } }){
    return(
      <div style={{...this.size(0.35,1,true), ...style.flexColSC,
      background: 'url(' + require('res/image/ui/menu.png') + ')', backgroundSize: '100% 100%'  }}>
        <div style={{...this.size(0.65,0.175,true), ...style.flexColSC, marginLeft: '5%',}}>
          {this.verGap(0.05)}
          {text.moderate({ text: profile.name }, { color: 'white' })}
          {this.verGap(0.01)}
          {text.hint({ text: user.id + ' (' + func.userTypeToString(user.type) + ')' })}
        </div>
        <div style={{...this.size(0.65,0.765,true), ...style.flexColSS, marginLeft: '5%',}}>
          {this.verGap(0.03)}
          {text.large({ text: func.multiLang('Account','帳號資訊','帐号资讯'), onPress: ()=>{
            toggle.set('menu', false)
            page.push('account') } }, { color: 'white' })}
          {this.verGap(0.03)}
          {text.large({ text: func.multiLang('Profile','個人檔案','个人档案'), onPress: ()=>{
            toggle.set('menu', false)
            page.push('profile') } }, { color: 'white' })}
          {this.verGap(0.03)}
          {text.large({ text: func.multiLang('Credit','鳴謝','鸣谢'), onPress: ()=>{
            toggle.set('menu', false)
            page.push('credit') } }, { color: 'white' })}
          {this.verGap(0.575)}
        </div>
        <div style={{...this.size(0.65,0.06,true), ...style.flexColSS, marginLeft: '5%',}}>
          {text.large({ text: func.multiLang('Logout','登出','登出'), onPress: ()=>{
            toggle.set('menu', false)
            this.logout(this.app) } }, { color: color.green[0] })}
        </div>
      </div>
    )
  }

  logout({ action }){
    this.props.app.save('stay', 'false')
    //this.props.app.save('id', '')
    //this.props.app.save('pw', '')
    action.notice.clear()
    action.user.set('user',{})
    action.course.set('teachingCourses',[])
    action.course.set('joinedCourses',[])
    action.subject.set('teachingSubjects',[])
    action.subject.set('joinedSubjects',[])
    action.project.set('teachingProjects',[])
    action.project.set('joinedProjects',[])
    action.main.set('status', 'entrance')
  }

}
