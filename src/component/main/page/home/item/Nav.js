import React from 'react'
import Component from 'component/Component'

export default class Nav extends Component {

  content(app){
    return this.nav(app)
  }

  nav({ func, text, button, action, store: { user, page: { nav: { title, left, right } }, ui: { window, style, color } } }){
    return(
      <div style={{...style.flexColCE, ...this.size(1, 0.05, true), backgroundImage: 'url(' + require('res/image/ui/top_bar.png') + ')', backgroundSize: '100% 100%'}}>
        <div style={{...style.flexRowCC, ...this.size(1, 0.04, true)}}>
          {button.nav({ background: left? left.icon: require('res/image/button/back_arrow.png'), onPress: left?left.onPress: ()=>{
            action.main.set('photo',null)
            action.page.pull()
          } })}
          {this.horGap(0.02)}
          {text.nav({ text: func.multiLang(title[0], title[1], title[2]) })}
          {this.horGap(0.02)}
          {button.nav({ background: right? right.icon: require('res/image/button/rotate.png'), onPress: right? right.onPress: ()=>{ action.user.login(user.user) } })}
        </div>
        {this.verGap(0.005)}
      </div>
    )
  }

}
