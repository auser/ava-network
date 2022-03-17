import { valuesForGenerate, Namespace } from "./lib";
import Openethereum from "./services/openethereum";

export const cluster = async () => {
  const service = Namespace("test");
  const resources = [service, ...(await Openethereum())];

  const manifests = valuesForGenerate(resources);
  return manifests;
};

export default cluster;
