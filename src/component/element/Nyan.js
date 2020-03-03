import React from 'react'
import Component from 'component/Component'

import sit1 from 'res/image/nyan/sit/sit1.png';
import sit2 from 'res/image/nyan/sit/sit2.png';

import running_left1 from 'res/image/nyan/running/running_left1.png';
import running_left2 from 'res/image/nyan/running/running_left2.png';
import running_left3 from 'res/image/nyan/running/running_left3.png';
import running_left4 from 'res/image/nyan/running/running_left4.png';

import running_up1 from 'res/image/nyan/running/running_up1.png';
import running_up2 from 'res/image/nyan/running/running_up2.png';
import running_up3 from 'res/image/nyan/running/running_up3.png';
import running_up4 from 'res/image/nyan/running/running_up4.png';

import running_down1 from 'res/image/nyan/running/running_down1.png';
import running_down2 from 'res/image/nyan/running/running_down2.png';
import running_down3 from 'res/image/nyan/running/running_down3.png';
import running_down4 from 'res/image/nyan/running/running_down4.png';

import ennui1 from 'res/image/nyan/ennui/ennui1.png';
import ennui2 from 'res/image/nyan/ennui/ennui2.png';
import ennui3 from 'res/image/nyan/ennui/ennui3.png';
import ennui4 from 'res/image/nyan/ennui/ennui4.png';

import fly1 from 'res/image/nyan/fly/fly1.png';
import fly2 from 'res/image/nyan/fly/fly2.png';
import fly3 from 'res/image/nyan/fly/fly3.png';
import fly4 from 'res/image/nyan/fly/fly4.png';

import sniff1 from 'res/image/nyan/sniff/sniff1.png';
import sniff2 from 'res/image/nyan/sniff/sniff2.png';

import lick1 from 'res/image/nyan/lick/lick1.png';
import lick2 from 'res/image/nyan/lick/lick2.png';

import tail1 from 'res/image/nyan/tail/tail1.png';
import tail2 from 'res/image/nyan/tail/tail2.png';
import tail3 from 'res/image/nyan/tail/tail3.png';

import relax1 from 'res/image/nyan/relax/relax1.png';
import relax2 from 'res/image/nyan/relax/relax2.png';
import relax3 from 'res/image/nyan/relax/relax3.png';
import relax4 from 'res/image/nyan/relax/relax4.png';

import sleep1 from 'res/image/nyan/sleep/sleep1.png';
import sleep2 from 'res/image/nyan/sleep/sleep2.png';
import sleep3 from 'res/image/nyan/sleep/sleep3.png';
import sleep4 from 'res/image/nyan/sleep/sleep4.png';

import stretch1 from 'res/image/nyan/stretch/stretch1.png';
import stretch2 from 'res/image/nyan/stretch/stretch2.png';
import stretch3 from 'res/image/nyan/stretch/stretch3.png';
import stretch4 from 'res/image/nyan/stretch/stretch4.png';

export default class Nyan extends Component {

 init({}, { status }){
   this.state = {
     status,
     onChange: this.updateNyan,
     animation: {
       sit: {
         frames: [sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit2],
         mspf: 200
       },
       runningLeft: {
         frames: [running_left1, running_left2, running_left3, running_left4],
         mspf: 100
       },
       runningUp: {
         frames: [running_up1, running_up2, running_up3, running_up4],
         mspf: 100
       },
       runningDown: {
         frames: [running_down1, running_down2, running_down3, running_down4],
         mspf: 100
       },
       ennui: {
         frames: [ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui2, ennui3, ennui4, ennui4, ennui3, ennui2],
         mspf: 100
       },
       fly: {
         frames: [fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly2, fly1, fly1, fly2, fly3, fly3, fly2],
         mspf: 100
       },
       sniff: {
         frames: [sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff2, sniff1, sniff1, sniff1, sniff1, sniff1, sniff2, sniff1, sniff2, sniff1],
         mspf: 125
       },
       tail: {
         frames: [tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail2, tail3, tail2],
         mspf: 150
       },
       lick: {
         frames: [lick2, lick2, lick2, lick2, lick1, lick2, lick2, lick2, lick2, lick1, lick2, lick1, lick2],
         mspf: 200
       },
       relax: {
         frames: [relax1, relax2, relax3, relax4],
         mspf: 150
       },
       sleep: {
         frames: [sleep1, sleep1, sleep1, sleep2, sleep3, sleep4, sleep4, sleep4, sleep3, sleep2],
         mspf: 300
       },
       stretch: {
         frames: [stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch3, stretch2, stretch1, stretch1, stretch1, stretch1, stretch1, stretch1, stretch1, stretch1, stretch1, stretch1, stretch1, stretch1, stretch2, stretch3],
         mspf: 125
       }
     }
   }
 }

 updateNyan({ status }, prevState){
   return { ...prevState, status }
 }

 randomNyan(statusSet){
   return statusSet[Math.floor((Math.random() * statusSet.length) + 1)]
 }

 content(app){
   return this.nyan(app, this.props, this.state)
 }

 nyan({ button, store: { ui: { style} } }, { onPress }, { status, index, animation }){
   const animate = animation[status? status: 'sit']
   return(
     <div style={{ ...this.size(0.1,0.1), ...this.ui.style.flexColCC }} onPress={onPress} key={status}>
       <img alt='' onPress={onPress} src={sit1} style={{ ...this.size(0.1,0.1) }}
       startFrameIndex={0} framesPerSecond={Math.round(1000/animate.mspf)}/>
     </div>
   )
 }

}
