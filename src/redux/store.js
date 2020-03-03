import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { main } from './control/main/reducer'
import { modal } from './control/modal/reducer'
import { notice } from './control/notice/reducer'
import { page } from './control/page/reducer'
import { toggle } from './control/toggle/reducer'
import { ui } from './control/ui/reducer'

import { card } from './data/card/reducer'
import { course } from './data/course/reducer'
import { lang } from './data/lang/reducer'
import { profile } from './data/profile/reducer'
import { project } from './data/project/reducer'
import { school } from './data/school/reducer'
import { studentProject } from './data/studentProject/reducer'
import { subject } from './data/subject/reducer'
import { user } from './data/user/reducer'

const reducer = combineReducers({
  main, modal, notice, page, toggle, ui,
  card, course, lang, profile, project, school, studentProject, subject, user
})

export default createStore(reducer, {}, applyMiddleware(thunk))
