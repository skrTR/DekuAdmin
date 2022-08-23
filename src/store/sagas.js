import { all, fork } from "redux-saga/effects"

import AuthSaga from "./auth/login/saga"
import projectsSaga from "./projects/saga"
import brochureSaga from "./brochure/saga"
import contactsSaga from "./contacts/saga"
import LayoutSaga from "./layout/saga"
export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(projectsSaga),
    fork(brochureSaga),
    fork(contactsSaga),
    fork(LayoutSaga),
  ])
}
