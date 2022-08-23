import { call, put, takeEvery } from "redux-saga/effects"
import { toast } from "react-toastify"
// Crypto Redux States
import {
  GET_BROCHURES,
  GET_BROCHURE_DETAIL,
  DELETE_BROCHURE,
} from "./actionTypes"
import {
  getBrochuresSuccess,
  getBrochuresFail,
  getBrochureDetailSuccess,
  getBrochureDetailFail,
  deleteBrochureSuccess,
  deleteBrochureFail,
} from "./actions"
import {
  getBrochures,
  getBrochuresDetails,
  deleteBrochure,
} from "helpers/fakebackend_helper"
function* fetchBrochures() {
  try {
    const response = yield call(getBrochures)
    yield put(getBrochuresSuccess(response.data))
  } catch (error) {
    yield put(getBrochuresFail(error))
  }
}

function* fetchBrochureDetail({ brochureId }) {
  try {
    const response = yield call(getBrochuresDetails, brochureId)
    yield put(getBrochureDetailSuccess(response.data))
  } catch (error) {
    yield put(getBrochureDetailFail(error))
  }
}
function* onDeleteBrochure({ payload: brochure }) {
  try {
    const response = yield call(deleteBrochure, brochure)
    toast("Амжилттай устгаллаа")
    yield put(deleteBrochureSuccess(response))
  } catch (error) {
    let message = error.message
    if (
      message === "Cannot read properties of undefined (reading 'toString')"
    ) {
      return null
    } else {
      toast(message)
    }
    yield put(deleteBrochureFail(error))
  }
}
function* brochuresSaga() {
  yield takeEvery(GET_BROCHURES, fetchBrochures)
  yield takeEvery(GET_BROCHURE_DETAIL, fetchBrochureDetail)
  yield takeEvery(DELETE_BROCHURE, onDeleteBrochure)
}

export default brochuresSaga
