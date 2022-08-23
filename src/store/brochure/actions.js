import {
  GET_BROCHURES,
  GET_BROCHURES_FAIL,
  GET_BROCHURES_SUCCESS,
  GET_BROCHURE_DETAIL,
  GET_BROCHURE_DETAIL_FAIL,
  GET_BROCHURE_DETAIL_SUCCESS,
  DELETE_BROCHURE,
  DELETE_BROCHURE_SUCCESS,
  DELETE_BROCHURE_FAIL,
} from "./actionTypes"

export const getBrochures = () => ({
  type: GET_BROCHURES,
})

export const getBrochuresSuccess = brochures => ({
  type: GET_BROCHURES_SUCCESS,
  payload: brochures,
})
export const getBrochuresFail = error => ({
  type: GET_BROCHURES_FAIL,
  payload: error,
})
export const getBrochureDetail = brochureId => ({
  type: GET_BROCHURE_DETAIL,
  brochureId,
})

export const getBrochureDetailSuccess = brochureDetails => ({
  type: GET_BROCHURE_DETAIL_SUCCESS,
  payload: brochureDetails,
})

export const getBrochureDetailFail = error => ({
  type: GET_BROCHURE_DETAIL_FAIL,
  payload: error,
})
export const deleteBrochure = brochure => ({
  type: DELETE_BROCHURE,
  payload: brochure,
})

export const deleteBrochureSuccess = brochure => ({
  type: DELETE_BROCHURE_SUCCESS,
  payload: brochure,
})

export const deleteBrochureFail = error => ({
  type: DELETE_BROCHURE_FAIL,
  payload: error,
})
