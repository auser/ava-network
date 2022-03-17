import { merge } from "lodash";
import type { CommonMetadata } from "./types";

export interface IValuesForGenerateOpts {
  namespaceDirs?: string[];
  prefix?: string;
}
// Given an array (or a promise of an array) of Kubernetes resources,
// return a list of values suitable for use with `jk generate`
export async function valuesForGenerate(
  resources,
  opts: IValuesForGenerateOpts = {}
) {
  const { prefix = "", namespaceDirs = true } = opts;
  const all = await Promise.resolve(resources);
  return all.map((r) => {
    const filename = `${r.metadata.name}-${r.kind.toLowerCase()}.yaml`;
    let path = filename;
    if (namespaceDirs && r.metadata.namespace) {
      path = `${r.metadata.namespace}/${filename}`;
    }
    if (prefix !== "") {
      path = `${prefix}/${path}`;
    }
    return { file: path, value: r };
  });
}

// Interpret a series of transformations expressed either as object
// patches (as in the argument to `patch` in this module), or
// functions. Usually the first argument will be an object,
// representing an initial value, but it can be a function (that will
// be given an empty object as its argument).
function mix(...transforms) {
  let r = {};

  for (const transform of transforms) {
    switch (typeof transform) {
      case "object":
        r = merge(r, transform);
        break;
      case "function":
        r = transform(r);
        break;
      default:
        throw new TypeError("only objects and functions allowed as arguments");
    }
  }

  return r;
}

// commonMetadata returns a tranformation that will indiscriminately
// add the given labels and annotations to every resource.
export function commonMetadata({
  commonLabels = null,
  commonAnnotations = null,
  namespace = null,
}: any) {
  // This isn't quite as cute as it could be; naively, just assembling a patch
  //     { metadata: { labels: commonLabels, annotations: commonAnnotations }
  // doesn't work, as it will assign null (or empty) values where they are not
  // present.
  const metaPatches: any[] = [];
  if (commonLabels !== null) {
    metaPatches.push({ metadata: { labels: commonLabels } });
  }
  if (commonAnnotations !== null) {
    metaPatches.push({ metadata: { annotations: commonAnnotations } });
  }
  if (namespace !== null) {
    metaPatches.push({ metadata: { namespace } });
  }
  return (r) => mix(r, ...metaPatches);
}
