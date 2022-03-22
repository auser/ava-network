import axios from "axios";

type IParams = { [key: string]: any };

interface IReqOptions {
  host: string;
  port: number;
  headers: {
    [key: string]: any;
  };
  protocol: string;
  token?: string;
  alias?: string;
  debug?: boolean;
}

const defaultParams = {};
const defaultOptions = {
  host: "localhost",
  port: 9650,
  headers: {},
  protocol: "http",
  token: "JWT",
};

const prepareArgs = async (
  rawPath: string,
  method: string,
  options: any,
  args?: any[]
) => {
  const { host, port, protocol, debug, requestParams } = options;
  const { requestOptions } = options;
  const baseURL = `${protocol}://${host}:${port}`;

  const params = requestParams
    ? requestParams
    : Object.keys(args!).length === 0
    ? []
    : [
        (args || []).reduce((acc: any, key: string) => {
          const value = options[key];
          if (!value) return acc;
          return { ...acc, [key]: value };
        }, {}),
      ];

  const data = { jsonrpc: "2.0", id: 1, method, params };
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (options.token && options.token !== "") {
    const token = options.token;
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${baseURL}${rawPath}`;

  if (debug) {
    console.log(
      `Making POST request to:
${url}
${JSON.stringify(headers, null, 2)}
${JSON.stringify(data, null, 2)}
`
    );
  }
  return { url, baseURL, headers, data };
};

export const req = async (
  rawPath: string,
  method: string,
  args: any,
  params: any[] = []
) => {
  const { url, baseURL, headers, data } = await prepareArgs(
    rawPath,
    method,
    args,
    params
  );

  const axiosOptions: any = {
    method: "POST",
    url,
    responseType: "json",
    baseURL,
    headers,
    data,
  };

  try {
    const resp = await axios(axiosOptions);
    if (resp && resp.data) {
      return resp.data.result ? resp.data.result : resp.data;
    } else {
      return resp;
    }
  } catch (e: any) {
    console.log(`An error occurred in request`);
    if (e.response && e.response.data) {
      console.log(`Axios error`, e.code, e.response.data);
      return e.response.data;
    } else if (e.error) {
      return e.error;
    } else {
      console.log(e);

      return e;
    }
  }
};
