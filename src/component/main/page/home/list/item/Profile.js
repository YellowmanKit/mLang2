import React from 'react'
import List from '../List'
import ProfileRow from '../row/item/Profile'

export default class Profile extends List {

  rows({ func }, { profiles }){
    return profiles.map(profile => <ProfileRow app={this.app} profile={profile} key={profile._id}/>)
  }

}
