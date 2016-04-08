import Immutable from 'immutable';
import * as l from '../../core/index';
import { dataFns } from '../../utils/data_utils';

// TODO: Android version also has "unknonwn-social", "evernote" and
// "evernote-sandbox""evernote" in the list, considers "google-openid"
// to be enterprise and doesn't contain "salesforce-community". See
// https://github.com/auth0/Lock.Android/blob/98262cb7110e5d1c8a97e1129faf2621c1d8d111/lock/src/main/java/com/auth0/android/lock/utils/Strategies.java
export const STRATEGIES = {
  "amazon": "Amazon",
  "aol": "Aol",
  "baidu": "百度",
  "box": "Box",
  "dwolla": "Dwolla",
  "ebay": "ebay",
  "exact": "Exact",
  "facebook": "Facebook",
  "fitbit": "Fitbit",
  "github": "GitHub",
  "google-openid": "Google OpenId",
  "google-oauth2": "Google",
  "instagram": "Instagram",
  "linkedin": "LinkedIn",
  "miicard": "miiCard",
  "paypal": "PayPal",
  "planningcenter": "Planning Center",
  "renren": "人人",
  "salesforce": "Salesforce",
  "salesforce-community": "Salesforce Community",
  "salesforce-sandbox": "Salesforce (sandbox)",
  "shopify": "Shopify",
  "soundcloud": "Soundcloud",
  "thecity": "The City",
  "thecity-sandbox": "The City (sandbox)",
  "thirtysevensignals": "37 Signals",
  "twitter": "Twitter",
  "vkontakte": "vKontakte",
  "windowslive": "Microsoft Account",
  "wordpress": "Wordpress",
  "yahoo": "Yahoo!",
  "yammer": "Yammer",
  "yandex": "Yandex",
  "weibo": "新浪微博"
};

const { get, initNS } = dataFns(["social"]);

export function initSocial(m, options) {
  return initNS(m, Immutable.fromJS(processSocialOptions(options)));
}

export function displayName(connection) {
  return STRATEGIES[connection.get("strategy")];
}

function processSocialOptions(options) {
  const result = {};
  const { socialButtonStyle } = options;

  // TODO: emit warnings
  if (typeof socialButtonStyle === "number"
      || socialButtonStyle === "big"
      || socialButtonStyle === "small") {
    result.socialButtonStyle = socialButtonStyle;
  }

  return result;
}

export function socialConnections(m) {
  return l.connections(m, "social");
}

export function useBigButtons(m) {
  const x = get(m, "socialButtonStyle", 3);
  return typeof x === "number"
    ? socialConnections(m).count() <= x
    : x === "big";
}
