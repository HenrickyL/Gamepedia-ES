import {ui} from "../../typings/Enums";
import { IUIAction } from "../../typings/Interfaces";
import {store} from '../index'




export const setLoading = ():IUIAction => {
    const state = store.getState().ui
    return ({
        ...state,
        type: ui.SET_LOADING,
        loading: true
    })
};

export const clearLoading = ():IUIAction => {
    const state = store.getState().ui
    return ({
        ...state,
        type: ui.CLEAR_LOADING,
        loading: false
    })
};


export const setError = ():IUIAction => {
    return ({
        type: ui.SET_ERRORS,
        error: true,
    })
};


export const clearError = ():IUIAction =>{ 
    return ({
        type: ui.CLEAR_ERRORS,
        error: false,
    })
};

export const setRedirect = ():IUIAction =>{ 
    return ({
        type: ui.SET_REDIRECT,
        redirect: true
  })
};

export const clearRedirect = ():IUIAction =>{ 
    return ({
        type: ui.CLEAR_REDIRECT,
        redirect: false
  })
};


export const setSuccess = ():IUIAction =>{ 
    return ({
        type: ui.SET_SUCCESS,
        success: true
  })
};

export const clearSuccess = ():IUIAction =>{ 
    return ({
        type: ui.CLEAR_SUCCESS,
        success: false
  })
};
