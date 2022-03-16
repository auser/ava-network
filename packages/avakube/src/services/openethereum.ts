import * as k8s from "@jkcfg/kubernetes/api";
import { finalize } from "@dpu/jkcfg-k8s/util";
import { appNameSelector } from "@dpu/jkcfg-k8s/labels";
import { IFileConfigMap, readConfigFile, IMapping } from "../utils";
// import { Deployment } from '@dpu/jkcfg-k8s/deployment';

const ConfigMap = async (service: any, { name, files }: IFileConfigMap) => {
  const data: IMapping = await files.reduce(
    async (acc: Promise<IMapping>, filename: string) => {
      const contents = await readConfigFile(filename);
      return {
        ...acc,
        [filename]: contents,
      };
    },
    Promise.resolve({})
  );

  return new k8s.core.v1.ConfigMap(name, {
    metadata: {
      namespace: service.namespace,
      labels: {
        app: service.name,
        maintainer: service.maintainer,
      },
    },
    data,
  });
};

export async function OpenEthereum() {
  const namespace = "openethereum";
  const selector = appNameSelector(namespace);

  const fileConfigMap = await ConfigMap("ethereum-config-map", {
    name: "ethereum-config-map",
    files: ["openethereum/config.toml"],
  });

  return finalize([fileConfigMap], {
    labels: selector,
    namespace,
  });
}

export default OpenEthereum;
