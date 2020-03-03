import React from 'react'
import List from '../List'
import RankingRow from '../row/item/Ranking'

export default class Ranking extends List {

  rows({ func, store: { user : { user } } }, { rankings }){
    return rankings.map((ranking, index) => {
      if(user.type === 'teacher' && user._id === ranking.studentProject.student){ return null }
      return <RankingRow app={this.app} ranking={ranking} index={index} key={ranking.studentProject._id}/>
    })
  }

}
