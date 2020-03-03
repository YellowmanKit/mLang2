export default class Function {

  constructor({ app: { store: { main, user: { user }, studentProject: { studentProjects }, card: { cards } } } }){
    this.main = main
    this.user = user
    this.studentProjects = studentProjects
    this.cards = cards
  }

  isEmpty(obj){
    for(var key in obj) { if(obj.hasOwnProperty(key)){ return false } }
    return true
  }

  unusedLangKey(langs, langKeys){
    const keys = Object.keys(langKeys)
    for(var i=0;i<keys.length;i++){
      for(var j=0;j<langs.length;j++){
        if(keys[i] === langs[j].key){ break }
        if(j === langs.length - 1){ return keys[i] }
      }
    }
    return keys[0]
  }

  clamp(value, min, max){
    if(value > max){ return min }
    if(value < min){ return max }
    return value
  }

  indexOf(item, items){
    for(var i=0;i<items.length;i++){
      if(items[i]._id === item._id){ return i }
    }
  }

  studentProject({ student, project, studentProjects }){
    return studentProjects.filter(studentProject => (studentProject.student === student) && (studentProject.project === project))[0]
  }

  cardsFromProject(project, grade){
    var cardsId = []
    project.studentProjects.map(studentProject => { this.idToItem(studentProject, this.studentProjects).cards.map(cardId => { cardsId.push(cardId) }) })
    return this.idsToItems(cardsId, this.cards).filter(card => {
      if(!grade){ return true }
      return card.grade === grade
    })
  }

  addDayFromNow(day){
    var date = new Date()
    date.setDate(date.getDate() + day)
    return date
  }

  deltaDay(start, end){
    var deltaTime = Math.abs(start.getTime() - end.getTime())
    var deltaDay = Math.ceil(deltaTime / (1000 * 3600 * 24))
    return deltaDay
  }

  randomNyan(set){
    return set[Math.floor(Math.random() * (set.length - 1) + 1)]
  }

  undeadCount(items){
    return items.filter(item => { return !item.dead }).length
  }

  usersToProfiles(userIds, profiles){
    const requested = []
    for(var i=0;i<userIds.length;i++){
      for(var j=0;j<profiles.length;j++){
        if(profiles[j].belongTo === userIds[i]){
          requested.push(profiles[j])
          continue
        }
      }
    }
    return requested
  }

  userToProfile(userId, profiles){
    for(var i=0;i<profiles.length;i++){
      if(profiles[i].belongTo === userId){
        return profiles[i]
      }
    }
    return null
  }

  userTypeToString(type){
    switch (type) {
      case 'developer':
        return this.multiLang('Developer','開發者','开发者')
      case 'admin':
        return this.multiLang('Admin','管理員','管理员')
      case 'teacher':
        return this.multiLang('Teacher','老師','老师')
      case 'student':
        return this.multiLang('Student','學生','学生')
      default:
        return ''
    }
  }

  lastLoginText(lastLogin){
    const lastLoginDate = new Date(lastLogin);
    var color = 'red';
    var text = '-';
    if(lastLogin){
      const current = new Date();
      const deltaTime = Math.abs(current.getTime() - lastLoginDate.getTime());
      const deltaDays = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
      const deltaMins = Math.floor(deltaTime / (1000 * 60));

      if(deltaDays < 1){
        color = 'green';
      }else if(deltaDays > 1 && deltaDays < 7){
        color = 'grey';
      }

      if(deltaMins < 60){
        text = deltaMins + ' mins'
      }else if(deltaMins < 1440){
        const deltaHours = Math.floor(deltaMins/60);
        text = deltaHours + ' hrs'
      }else{
        text = deltaDays + ' days'
      }
    }
    return { text, color }
  }

  periodString(start, end){
    return this.dateString(new Date(start)) + ' ~ ' + this.dateString(new Date(end))
  }

  dateString(datetime) {
    const date = new Date(datetime)
    return date.getFullYear() + '-' + this.addZeroIfSingle(date.getMonth() + 1) + '-' + this.addZeroIfSingle(date.getDate());
  }

  timeString(datetime){
    const time = new Date(datetime)
    return this.addZeroIfSingle(time.getHours()) + ':' + this.addZeroIfSingle(time.getMinutes()) + ':' + this.addZeroIfSingle(time.getSeconds())
  }

  addZeroIfSingle(number){
    if(number < 10){
      return '0' + String(number);
    }else{
      return '' + String(number);
    }
  }

  isCourse(course){
    return 'teacher' in course
  }

  isSubject(subject){
    if(!subject){ return false }
    return 'course' in subject && 'projects' in subject
  }

  isProject(project){
    return 'studentProjects' in project
  }

  expired(date){
    return (new Date() > new Date(date))
  }

  idToItem(id, data){
    for(var i=0;i<data.length;i++){
      if(data[i]._id === id){
        return data[i]
      }
    }
    return null
  }

  idsToItems(ids, data){
    var items = []
    if(!ids){ return [] }
    for(var i=0;i<ids.length;i++){
      for(var j=0;j<data.length;j++){
        if(ids[i] === data[j]._id){
          items.push(data[j])
          continue
        }
      }
    }
    return items
  }

  isUserType(types){
    for(var i=0;i<types.length;i++){
      if(this.user.type === types[i]){
        return true
      }
    }
    return false
  }

  multiLangByArray(array){
    switch (this.main.language) {
      case 'english':
        return array[0]
      case 'chinese':
        return array[1]
      case 'simplifiedChinese':
        return array[2]
      default:
        return array[0]
    }
  }

  multiLang(english, chinese, simplifiedChinese){
    switch (this.main.language) {
      case 'english':
        return english
      case 'chinese':
        return chinese
      case 'simplifiedChinese':
        return simplifiedChinese
      default:
        return english
    }
  }

  to(promise){ return promise.then(data => [null, data]).catch(err => [err]) }

}
