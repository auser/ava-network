import type { KubernetesObject, CommonMetadata } from "./types";
import { commonMetadata } from ".";
import { Namespace } from "./kubernetes";

export const finalize = (
  resources: KubernetesObject[],
  meta: CommonMetadata = { labels: null, annotations: null, namespace: null }
): KubernetesObject[] =>
  resources
    .map(commonMetadata(meta))
    .concat(
      meta.namespace === "default" ? [] : Namespace(meta.namespace!)
    ) as KubernetesObject[];
