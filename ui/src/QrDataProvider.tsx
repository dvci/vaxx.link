import React, { createContext, useContext, useReducer } from 'react';

interface State {
    qrCodes?: null | string | string[],
    jws?: null | string[],
    setQrCodes: (arg: any) => any;
    resetQrCodes: () => any;
}

const initialState: State = {
  qrCodes: '',
  setQrCodes: () =>{ return},
  resetQrCodes: () => {return},
  jws: null
};

const actions = {
  SET_QR_CODES: 'SET_QR_CODES',
  RESET_QR_CODES: 'RESET_QR_CODES',
};

const QrDataContext = createContext<State>(initialState);

const getJws = (qrCodes: string[]) => qrCodes
  .map((c) => {
    const sliceIndex = c.lastIndexOf('/');
    const rawPayload = c.slice(sliceIndex + 1);
    const encodingChars = rawPayload.match(/\d\d/g);
    return encodingChars?.map((charPair) => String.fromCharCode(+charPair + 45)).join('');
  })
  .join('');

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.SET_QR_CODES: {
      let newState: State = initialState;
      localStorage.setItem('qrCodes', JSON.stringify(action.qrCodes));

      if (action.qrCodes) {
        newState.qrCodes = action.qrCodes;
        newState.jws = [];
        action.qrCodes.forEach((c: string | string[]) => {
        const jws = getJws(c instanceof Array ? c : [c]);
        newState.jws?.push(jws);
        });
      } else newState.jws = null;
      return {
        ...state,
        ...newState
      };
    }
    case actions.RESET_QR_CODES: {
      localStorage.setItem('qrCodes', '');
      return initialState;
    }
    default:
      return state;
  }
};

const QrDataProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    reducer,
    reducer(initialState, {
      type: actions.SET_QR_CODES,
      qrCodes: JSON.parse(localStorage.getItem('qrCodes') || '')
    })
  );

  const value = {
    qrCodes: state.qrCodes,
    jws: state.jws,
    validationStatus: state.validationStatus,
    matchingDemographicData: state.matchingDemographicData,
    setQrCodes: (qrCodes: string[]) => {
      dispatch({ type: actions.SET_QR_CODES, qrCodes });
    },
    resetQrCodes: () => {
      dispatch({ type: actions.RESET_QR_CODES });
    }
  };
  return (<QrDataContext.Provider value={value}>{children}</QrDataContext.Provider>);
};

const useQrDataContext = () => useContext(QrDataContext);

export { QrDataContext, QrDataProvider, useQrDataContext };
