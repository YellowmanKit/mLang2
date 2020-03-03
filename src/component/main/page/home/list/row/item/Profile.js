import React from 'react'
import Row from '../Row'

export default class Profile extends Row {

  init({ func, action }, { profile }){
    this.state = {
      size: this.size(1,0.1, true),
      title: profile.name,
      file: {
        name: profile.icon,
        type: 'profileIcon'
      },
      onPress: ()=>{
        //action.project.set('viewingProfile',profile)
        //action.page.push('profile')
      }
    }
  }

  custom({ func, text, store: { ui: { style } } }, { profile: { lastLogin } }){
    const lastLoginText = func.lastLoginText(lastLogin)
    return(
      <div style={{...this.size(0.6,0.05, true), ...style.flexRowCC }}>
        <img source={require('res/image/icon/clock.png')} style={{ ...this.size(0.025, 0.025) }}/>
        {this.horGap(0.02)}
        {text.moderate({ text: lastLoginText.text }, { color: lastLoginText.color })}
      </div>
    )
  }

}
