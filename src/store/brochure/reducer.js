import {
  GET_BROCHURES_FAIL,
  GET_BROCHURES_SUCCESS,
  GET_BROCHURE_DETAIL_FAIL,
  GET_BROCHURE_DETAIL_SUCCESS,
  DELETE_BROCHURE_SUCCESS,
  DELETE_BROCHURE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  brochures: [],
  brochureDetail: {},
  error: {},
}

const brochures = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BROCHURES_SUCCESS:
      return {
        ...state,
        brochures: action.payload,
      }

    case GET_BROCHURES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BROCHURE_DETAIL_SUCCESS:
      return {
        ...state,
        brochureDetail: action.payload,
      }

    case GET_BROCHURE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELETE_BROCHURE_SUCCESS:
      return {
        ...state,
        brochures: state.brochures.filter(
          brochure => brochure.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_BROCHURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default brochures
