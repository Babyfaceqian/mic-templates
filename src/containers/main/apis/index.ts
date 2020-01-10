import http from '@@utils';

function makeRequestCreator(url: string, method: string) {
  if (method == 'post') {
    return async function (params: object) {
      return http.post(url, params);
    };
  } else {
    return async function (params: object) {
      return http.get(url, {
        params
      })
    }
  }
}