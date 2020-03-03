import React from 'react'
import SubView from '../../SubView'
import RankingList from '../../../list/item/Ranking'

export default class Ranking extends SubView {

  subView({ func, store: { ui: { style } } }, {}, { profiles, studentProjects }){
    return(
      <div style={style.flexColCS}>
        <RankingList app={this.app} rankings={this.rankings(this.app, this.props)}/>
      </div>
    )
  }

  rankings({ func, store: { profile: { profiles }, card: { cards } } }, { studentProjects }){
    var rankings = []
    studentProjects.map(studentProject => {
      rankings.push({
        studentProject,
        profile: func.userToProfile(studentProject.student, profiles),
        featured: func.idsToItems(studentProject.cards, cards).filter(value => { return value.grade === 'featured'} ).length
      })
    })
    return rankings.sort((a, b) => { return b.featured - a.featured })
  }

}
