import axios from "axios";

interface IParams {}

interface IReqOptions {
  host: string;
  port: number;
  headers: {
    [key: string]: any;
  };
  protocol: string;
}

const defaultParams = {};
const defaultOptions = {
  host: "localhost",
  port: 9650,
  headers: {},
  protocol: "http",
};

export const req = async (
  rawPath: string,
  method: string,
  params: IParams = defaultParams,
  options: IReqOptions = defaultOptions
) => {
  const defaultHeaders = {};

  const { host, port, protocol } = options;
  const baseURL = `${protocol}://${host}:${port}`;

  const data = { jsonrpc: "2.0", id: 1, method, params };
  const headers = {
    "Content-Type": "application/json",
  };

  const axiosOptions: any = {
    method,
    url: `${baseURL}${rawPath}`,
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
  const resp = await axios(axiosOptions);
  return resp;
};
