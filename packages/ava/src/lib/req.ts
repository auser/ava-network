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

export const req = async (
  rawPath: string,
  method: string,
  params: IParams = defaultParams,
  options: IReqOptions = defaultOptions
) => {
  const { host, port, protocol, debug } = options;
  const baseURL = `${protocol}://${host}:${port}`;

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

  const axiosOptions: any = {
    method: "POST",
    url,
    responseType: "json",
    baseURL,
    headers,
    data,
  };

  // if (params.data) {
  //   axiosOptions["data"] = params.data;
  // }
  // if (params.body) {
  //   axiosOptions["body"] = params.body;
  // }
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
    } else {
      return e;
    }
  }
};