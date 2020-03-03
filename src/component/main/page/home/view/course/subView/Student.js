import React from 'react'
import SubView from '../../SubView'
import ProfileList from '../../../list/item/Profile'

export default class Student extends SubView {

  subView({ store: { ui: { style } } }, {}, { profiles }){
    return(
      <div style={style.flexColCS}>
        <ProfileList app={this.app} profiles={profiles}/>
      </div>
    )
  }

}
