import { useCallback, useState, useReducer } from 'preact/hooks';

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

type Action = {
  type: string;
};
export const useAsyncReducer = <S = {}>(
  reducer: <S>(state: S, action: Action) => Promise<S>,
  initState: S,
) => {
  const [{ state, error, updating }, setState] = useState({
    state: initState,
    updating: false,
  } as { state: S; error?: any; updating: boolean });

  const dispatch = (action: Action) => {
    setState({ state, updating: true });

    reducer(state, action)
      .then((s) => setTimeout(() => setState({ updating: false, state: s })))
      .catch((e) =>
        setTimeout(() => setState({ updating: false, state, error: e })),
      );
  };

  return [state, error, updating, dispatch];
};

export const curl = <P = {}>(url: string, method: string = 'GET', data?: {}) =>
  fetch(url, {
    method,
    body: data && JSON.stringify(data),
    headers: { 'content-type': 'application/json' },
    cache: 'no-cache',
    credentials: 'same-origin',
    mode: 'cors',
    redirect: 'error',
    referrer: 'no-referrer',
  }).then((response) => response.json() as Promise<P>);
