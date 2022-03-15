import * as k8s from "@jkcfg/kubernetes/api";
import { valuesForGenerate } from "@jkcfg/kubernetes/generate";
import Openethereum from "./services/openethereum";

export const cluster = async () => {
  const service = new k8s.core.v1.Namespace("test");
  const resources = [service, ...(await Openethereum())];

  const manifests = valuesForGenerate(resources);
  return manifests;
};

export default cluster;
