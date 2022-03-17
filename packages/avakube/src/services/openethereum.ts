import { appNameSelector, finalize } from "../lib";
import { IFileConfigMap, readConfigFile, IMapping, rootDir } from "../lib";
import { ConfigMap as K8SConfigMap } from "../lib";

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

  return K8SConfigMap(name, {
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
