import axios from 'axios'
import { api, to, success, action, modal, upload } from '../../redux'

export const read = cardId => {
  return async dispatch => {
    var err, res
    [err, res] = await to(axios.post(api() + '/card/studentRead', { data: { cardId } }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('cards', [res.data.updatedCard]))
    }
  }
}

export const grade = ({ cards }) => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    var files = []
    cards.map((card, i) => {
      if(card.audioComment && card.audioComment.path){
        files.push({ name: 'audioComment_' + i + '.wav', type: 'audio/*', file: card.audioComment.path })
      }
    })
    const uploaded = await upload({ files, type: 'audioComment'})
    cards.map((card, i)=>{
      const newAudio = uploaded.filter(name => {
        const index = name.split('.')[0].slice(-1)
        if(index === '' + i){ return true }
        return false
      })[0]
      if(newAudio){ card.audioComment = newAudio }
    });

    [err, res] = await to(axios.post(api() + '/card/grade', { data: { cards }}))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('cards', res.data.updatedCards))
      modal.off(dispatch)
      dispatch(action.pull())
    }else{
      modal.failed(dispatch)
    }

  }
}

export const update = newCard => {
  return async dispatch => {
    modal.loading(dispatch)
    var err, res
    const append = newCard.add? 'add': 'edit'
    var files = []
    if(newCard.picked){
      files.push({ name: 'cardIcon.png', type: 'image/*', file: newCard.picked })
    }
    newCard.langs.map((lang, i) => {
      if(lang.audio && lang.audio.path){
        files.push({ name: 'langAudio_' + i + '.wav', type: 'audio/*', file: lang.audio.path })
      }
    })

    const uploaded = await upload({ files, type: 'card'})

    var newIcon = null
    var langAudios = []
    uploaded.map(name => {
      const split = name.split('-')
      if(split[1] === 'cardIcon.png'){ newIcon = name }
      else{ langAudios.splice(0,0,name) }
    })

    newCard = { ...newCard,
      icon: newIcon? newIcon: newCard.icon,
      createdAt: new Date()
    }
    const langs = []
    newCard.langs.map((lang, i) => {
      const newAudio = uploaded.filter(name => {
        const index = name.split('.')[0].slice(-1)
        if(index === '' + i){ return true }
        return false
      })[0]
      langs.splice(0,0,{ ...lang, audio: newAudio? newAudio: lang.audio })
    })
    newCard.langs = [];
    [err, res] = await to(axios.post(api() + '/card/' + append, { data: { ...newCard, card: newCard, langs } }))
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('cards', [res.data.card]))
      dispatch(action.update('cards', [res.data.updatedCard]))
      dispatch(action.update('langs', res.data.langs))
      dispatch(action.update('langs', res.data.updatedLangs))

      dispatch(action.update('projects', [res.data.updatedProject]))
      dispatch(action.update('studentProjects', [res.data.updatedStudentProject]))

      dispatch(action.set('viewingProject', res.data.updatedProject))
      dispatch(action.set('viewingStudentProject', res.data.updatedStudentProject))
      dispatch(action.set('viewingCard', res.data.updatedCard))

      dispatch(action.set('profile', res.data.updatedProfile))

      dispatch(action.pull())
      modal.off(dispatch)
    }else{
      modal.failed(dispatch)
    }
  }
}

export const like = (cardId, userId) => {
  return async dispatch => {
    modal.loading(dispatch)
    let err, res;
    [err, res] = await to(axios.post(api() + '/card/like', { data: { cardId, userId } }));
    if(err){ return modal.error(dispatch) }
    if(success(res)){
      dispatch(action.update('cards', [res.data.updatedCard]))
      dispatch(action.set('viewingCard', res.data.updatedCard))
      modal.off(dispatch)
    }else{
      modal.failed(dispatch)
    }
  }
}
