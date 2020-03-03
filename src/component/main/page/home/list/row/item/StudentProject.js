import React from 'react'
import Row from '../Row'

export default class StudentProject extends Row {

  init({ func, action, store: { profile: { profiles }, project: { projects }, card: { cards } } }, { studentProject }){
    const profile = func.userToProfile(studentProject.student, profiles)
    this.state = {
      size: this.size(1,0.1, true),
      title: profile.name,
      file: {
        name: profile.icon,
        type: 'profileIcon'
      },
      onPress: ()=>{
        action.studentProject.set('viewingStudentProject', studentProject)
        action.project.set('viewingProject', func.idToItem(studentProject.project, projects))
        action.card.set('viewingCards', func.idsToItems(studentProject.cards, cards))
        action.profile.set('viewingProfile', profile)
        action.page.push('studentProject')
      }
    }
  }

  custom({ func, text, store: { ui: { style }, card } }, { studentProject: { cards } }){
    const data = func.idsToItems(cards, card.cards)
    const featured = data.filter(value => { return value.grade === 'featured' })
    const alert = data.filter(value => { return value.grade === 'notGraded' })
    return(
      <div style={{...this.size(0.6,0.05, true), ...style.flexRowCC }}>
        <img alt='' source={require('res/image/icon/cards.png')} style={{...this.size(0.03,0.03)}}/>
        {this.horGap(0.02)}
        {text.moderate({ text: '' + data.length })}
        {this.horGap(0.04)}
        <img alt='' source={require('res/image/icon/star.png')} style={{...this.size(0.03,0.03)}}/>
        {this.horGap(0.02)}
        {text.moderate({ text: '' + featured.length })}
        {this.horGap(0.04)}
        <img alt='' source={require('res/image/icon/alert.png')} style={{...this.size(0.03,0.03)}}/>
        {this.horGap(0.02)}
        {text.moderate({ text: '' + alert.length }, { color: alert.length > 0? 'red':'black'})}
        {this.horGap(0.04)}
      </div>
    )
  }

}
