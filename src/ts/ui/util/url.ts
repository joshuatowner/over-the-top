import {fromUrl, parseDomain} from "parse-domain";
import {getConfig} from "../../config";

export function getDomain(): string {
  const url = getConfig().network.webUrl;
  // @ts-ignore
  const {domain, topLevelDomains} = parseDomain(fromUrl(url));
  return [domain, ...topLevelDomains].join('.');
}
