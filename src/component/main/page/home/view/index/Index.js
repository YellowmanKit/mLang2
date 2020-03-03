import React from 'react'
import View from '../View'
import Teacher from './item/Teacher'
import Student from './item/Student'

export default class Index extends View {

  init({ action: { page, toggle }, store }){
    page.set('nav', {
      title: ['INDEX','主頁','主页'],
      left: {
        icon: require('res/image/button/menu.png'),
        onPress: ()=>{ toggle.set('menu',true) }
      }
    })
  }

  view({ func, store: { ui: { style } } }){
    return(
      <div style={style.flexColCS}>
        {func.isUserType(['teacher']) && <Teacher app={this.app}/>}
        {func.isUserType(['student']) && <Student app={this.app}/>}
      </div>
    )
  }

}
