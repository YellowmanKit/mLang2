import React from 'react'
import Basket from '../Basket'
import SchoolCell from '../cell/item/School'

export default class Course extends Basket {

  cells({ schools }){
    return schools.map(school => this.school(this.app, { school }) )
  }

  school({ store: { ui: { style } } },{ school }){
    return(
      <div style={{ ...style.flexColCC, ...this.size(0.225,0.175) }} key={school._id}>
        <SchoolCell app={this.app} school={school}/>
      </div>
    )
  }

}
