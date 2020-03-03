import { bindActionCreators } from 'redux'
import * as main from './control/main/action'
import * as modal from './control/modal/action'
import * as notice from './control/notice/action'
import * as page from './control/page/action'
import * as toggle from './control/toggle/action'
import * as ui from './control/ui/action'

import * as card from './data/card/action'
import * as course from './data/course/action'
import * as lang from './data/lang/action'
import * as profile from './data/profile/action'
import * as project from './data/project/action'
import * as school from './data/school/action'
import * as studentProject from './data/studentProject/action'
import * as subject from './data/subject/action'
import * as user from './data/user/action'

const add = (action, dispatch) => {
  action.set = (key, value) => { return { type: 'set', payload: { key, value } } }
  return bindActionCreators(action, dispatch)
}

const actions = dispatch => { return { action: {
  main: add(main, dispatch),
  modal: add(modal, dispatch),
  notice: add(notice, dispatch),
  page: add(page, dispatch),
  toggle: add(toggle, dispatch),
  ui: add(ui, dispatch),

  card: add(card, dispatch),
  course: add(course, dispatch),
  lang: add(lang, dispatch),
  profile: add(profile, dispatch),
  project: add(project, dispatch),
  school: add(school, dispatch),
  studentProject: add(studentProject, dispatch),
  subject: add(subject, dispatch),
  user: add(user, dispatch)
}}}

export default actions
