import React from 'react'
import Component from 'component/Component'

export default class Audio extends Component {

  init({ action: { modal } }, { source, onRecord, id }){
    this.state = {
      source,
      recorder: null,
      player: null,
      playing: false,
      onChange: (nextProps, prevState)=>{
        if(nextProps.source && !prevState.player){
          return {
            source: nextProps.source,
            player: this.newPlayer(this.app, nextProps)
          }
        }
        else if(nextProps.source && (nextProps.source !== prevState.source)){
          if(prevState.playing){ prevState.player.stop() }
          return {
            source: nextProps.source,
            player: this.newPlayer(this.app, nextProps),
            playing: false
          }
        }
        return null
      }
    }
  }

  newRecorder({ action: { modal } }, { id }){
    /*const recorder = new Recorder(id + '.mp4')
    recorder.prepare(err=>{ if(err){ console.log('audio error') } })
    return recorder*/
  }

  newPlayer({ action: { modal } }, { source }){
    /*const player = new Player(source, { autoDestroy: false })
    player.on('ended', ()=>{ if(!this.dead){ this.setState({ playing: false }) } })
    player.prepare(err=>{ if(err){ console.log('audio error') } })
    return player*/
  }

  content(){
    return this.audio(this.app, this.state, this.props)
  }

  audio({ button, store: { ui: { style } } }, { playing, player }, { isAudioComment, hasAudioComment, onRecord, source, canDelete, onDelete }){
    return(
      <div style={{ ...style.flexRowCC }} key={source}>
        {onRecord && button.record({ onPress: ()=>{ this.record(this.app, this.props) }, disabled: !onRecord })}
        {onRecord && this.horGap(0.065)}
        {onRecord && button.file({ onPress: ()=>{ this.onFileSelected(this.app, this.props)} })}
        {onRecord && this.horGap(0.065)}
        {isAudioComment && !playing && button.audioComment({ onPress: ()=>{ this.play(this.state) }, disabled: !hasAudioComment })}
        {isAudioComment && playing && button.audioComment({ onPress: ()=>{ this.stop(this.state) }})}
        {!isAudioComment && !playing && button.play({ onPress: ()=>{ this.play(this.state) }, disabled: !player, key: player })}
        {!isAudioComment && playing && button.stop({ onPress: ()=>{ this.stop(this.state) } })}
        {onDelete && this.horGap(0.05)}
        {onDelete && button.cross({ onPress: ()=>{
          this.setState({ player: null, playing: false })
          if(onDelete){ onDelete() }
        }, disabled: !canDelete, key: source })}
      </div>
    )
  }

  async onFileSelected({ func: { to }, action: { main, modal } },{ onRecord, onDelete }){
    var err, data
    //[err, data]= await to(DocumentPicker.pick({ type: 'audio/*' }))
    if(data){
      if(onDelete){ onDelete() }
      onRecord(data.uri)
    }
  }

  record({ action: { modal, main } }, { id, text }){
    const recorder = this.newRecorder(this.app, { id })
    recorder.record(err=>{
      if(err){ console.log('audio error') }
      else{ main.set('recorder', { text: text? text: '', onEnd: ()=>{ this.end(this.app, this.props, this.state) } }) }
    })
    this.setState({ recorder })
  }

  end({ action: { modal } }, { id, onRecord, onDelete }, { recorder }){
    recorder.stop(err=>{
      if(err){ console.log('audio error') }
      else{
        if(onDelete){ onDelete() }
        onRecord('file:' + recorder.fsPath)
      }
    })
  }

  play({ player }){
    if(!player){ return }
    player.play()
    this.setState({ playing: true })
  }

  stop({ player }){
    this.setState({ playing: false })
    player.stop()
  }

  onUnmount({ player }){
    if(player){ player.stop() }
  }

}
