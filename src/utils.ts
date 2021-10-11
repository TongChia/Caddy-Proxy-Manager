import { useCallback, useState, useReducer } from 'preact/hooks';
import { isBoolean } from 'lodash';

export const useToggle = (
  initialState = false,
): [boolean, (bool?: any) => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(
    (bool?: any) => setState((state) => (isBoolean(bool) ? bool : !state)),
    [],
  );

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
    headers: data && { 'content-type': 'application/json' },
    cache: 'no-cache',
    credentials: 'same-origin',
    mode: 'cors',
    redirect: 'error',
    referrer: 'no-referrer',
  }).then((response) => response.json() as Promise<P>);

export function parseJwt(token: string): {} {
  const base64Url = token.split('.')[1];
  if (!base64Url) return {};
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export const capitalize = (word: string) =>
  word
    .split(' ')
    .map((s) => (s[0] || '').toUpperCase() + (s.substring(1) || ''))
    .join(' ');
