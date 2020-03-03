export default class Alert {

  constructor({ app }){
    this.app = app
  }

  subject(subject){
    return this.checkSubject(this.app, subject)
  }

  project(project){
    return this.checkProject(this.app, project)
  }

  checkSubject({ func, store: { project } }, subject){
    const projects = func.idsToItems(subject.projects, project.projects)
    for(var i=0;i<projects.length;i++){
      if(this.checkProject(this.app, projects[i])){ return true }
    }
    return false
  }

  checkProject({ func, action, store: { user: { user }, studentProject } }, project){
    const studentProjects = func.idsToItems(project.studentProjects, studentProject.studentProjects)
    for(var i=0;i<studentProjects.length;i++){
      if(this.checkStudentProject(this.app, studentProjects[i])){
        if(user.type === 'teacher'){
          action.notice.spawn({
            _id: project._id,
            english: 'Your student had submitted new card!',
            chinese: '你的學生提交了新的卡片!',
            simplifiedChinese: '你的学生提交了新的卡片!',
            onPress: ()=>{
              action.notice.kill(project._id)
              action.project.set('viewingProject', project)
              action.page.push('project')
            }
          })
        }
        if(user.type === 'student'){
          action.notice.spawn({
            _id: project._id,
            english: 'Your card has been graded!',
            chinese: '你的卡片已獲評分!',
            simplifiedChinese: '你的卡片已获评分!',
            onPress: ()=>{
              action.notice.kill(project._id)
              action.project.set('viewingProject', project)
              action.page.push('project')
            }
          })
        }
        return true
      }
    }
    return false
  }

  checkStudentProject({ func, store: { card } }, studentProject){
    const cards = func.idsToItems(studentProject.cards, card.cards)
    for(var i=0;i<cards.length;i++){
      if(this.checkCard(this.app, cards[i])){ return true }
    }
    return false
  }

  checkCard({ store: { user: { user: { _id, type } } } }, { grade, author, studentRead, resubmitted }){
    if(type === 'teacher' && grade === 'notGraded'){ return true }
    if(type === 'student' && _id === author){
      //if(grade === 'failed' && !resubmitted ){ return true }
      if(grade !== 'notGraded' && !studentRead){ return true }
    }
    return false
  }

}
