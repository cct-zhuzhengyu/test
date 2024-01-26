import axios from "axios";
import qs from "qs";
import { showMsg } from "./utils";

const callApi: any = axios.create({
  // timeout
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) ?? 30000,
  // baseURL
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_PROXY,
  // cookie
  withCredentials: false,
  // headers
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

callApi.defaults.headers.post["Content-Type"] =
  "application/json;charset=utf-8";

/**
 * request 統一処理
 */
callApi.interceptors.request.use(
  (config: any) => {
    // TODO Authorization
    // config.headers.authorization = "TODO";
    // if (cookies.load("token")) {
    //   config.headers.token = cookies.load("token");
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

/**
 * response 統一処理
 */
callApi.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error: any) => {
    debugger;
    if (error.code == "ECONNABORTED") {
      showMsg({ msg: "TIMEOUT" });
      return Promise.reject(error);
    }
    let resStatus = error.response.status;
    if (resStatus) {
      switch (resStatus) {
        case 401:
          if (error.response.data && error.response.data.message) {
            showMsg({ msg: error.response.data.message });
          } else {
            showMsg({ msg: "SERVER UNKONWN ERROR" });
          }
          setTimeout(() => {
            // loading
          }, 10);
          setTimeout(() => {
            // logout();
          }, 2000);
          break;
        case 404:
          showMsg({ msg: "404" });
          break;
        default:
          if (error.response.data && error.response.data.message) {
            showMsg({ msg: error.response.data.message });
          } else {
            showMsg({ msg: "SERVER UNKONWN ERROR" });
          }
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

/**
 * GET
 *
 * const param = {
        userId: 1,
        date: 20190601,
      };
 * １、apiからのメッセージを表示する
 *   a)、apiAxiosPost("/aaa/bbb", param)
 *   b)、apiAxiosPost("/aaa/bbb", param, {unShowMsg:false})
 * ２、apiからのメッセージを表示しない
 *   apiAxiosPost("/aaa/bbb", param, {unShowMsg:true})
 */
function apiAxiosGet(
  url: string,
  params?: unknown,
  options?: { timeout: number }
) {
  const config: any = {
    params: params,
    paramsSerializer: (params: unknown) => {
      return qs.stringify(params, { indices: false });
    },
  };
  if (options && options.timeout) {
    config.timeout = options.timeout;
  }

  return thenResponse(callApi.get(url, config), options);
}

/**
 * DELETE
 */
function apiAxiosDelete(
  url: string,
  params: any,
  options: { timeout: number }
) {
  const config: any = {
    params: params,
    paramsSerializer: (params: any) => {
      return qs.stringify(params, { indices: false });
    },
  };
  if (options && options.timeout) {
    config.timeout = options.timeout;
  }
  return thenResponse(callApi.delete(url, config), options);
}

/**
 * POST
 */
function apiAxiosPost(url: string, params: any, options: { timeout: number }) {
  const config: any = {};
  if (options && options.timeout) {
    config.timeout = options.timeout;
  }
  return thenResponse(callApi.post(url, params, config), options);
}

/**
 * PUT
 */
function apiAxiosPut(url: string, params: any, options: { timeout: any }) {
  const config: any = {};
  if (options && options.timeout) {
    config.timeout = options.timeout;
  }
  return thenResponse(callApi.put(url, params, config), options);
}

/**
 * UPLOAD
 *
 * let formData = new FormData();
 * formData.append("file", params.file)
 * apiAxiosPut("/aaa/bbb", formData)
 */
function upload(url: string, params: any, options: { timeout: any }) {
  callApi.headers = {
    "Content-Type": "multipart/form-data",
  };
  const config: any = {};
  if (options && options.timeout) {
    config.timeout = options.timeout;
  }
  return thenResponse(callApi.post(url, params, config), options);
}

/**
 * DOWNLOAD
 */
function download(url: any, params: any, options: { timeout: number }) {
  const opts = {
    ...{ saveFlg: false, download: true },
    ...options,
  };

  if (opts.saveFlg) {
    const config: any = { responseType: "blob" };
    if (options && options.timeout) {
      config.timeout = options.timeout;
    }
    return thenResponse(callApi.post(url, params, config), {
      ...{ fileFlg: true },
      ...opts,
    });
  } else {
    const config: any = {
      params: params,
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { indices: false });
      },
      responseType: "blob",
    };
    if (options && options.timeout) {
      config.timeout = options.timeout;
    }
    return thenResponse(callApi.get(url, config), {
      ...{ fileFlg: true },
      ...opts,
    });
  }
}

/**
 * response 統一処理
 */
function thenResponse(
  axiosResponse: Promise<any>,
  options?: {
    timeout: number;
    saveFlg?: boolean;
    download?: boolean;
    fileFlg?: boolean;
  }
) {
  const opts = {
    ...{ unShowMsg: false, fileFlg: false },
    ...options,
  };
  return new Promise(function (resolve, reject) {
    axiosResponse
      .then((response) => {
        if (typeof response.data === "string") {
          resolve(response.data);
          return;
        }
        // エラー表示
        if (!opts.unShowMsg && response.data.error) {
          if (response.data.message) {
            showMsg({ msg: response.data.message });
          } else {
            showMsg({ msg: "SERVER UNKONWN ERROR" });
          }
          reject(response.data);
        } else {
          resolve(response.data.data);
        }
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

export {
  apiAxiosGet,
  apiAxiosDelete,
  apiAxiosPost,
  apiAxiosPut,
  upload,
  download,
};
