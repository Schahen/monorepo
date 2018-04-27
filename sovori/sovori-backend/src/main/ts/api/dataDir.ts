export let getDataDir = (): string => {

  let appData = process.env.APP_DATA;
  if (typeof appData == "undefined") {
    throw "data dir is not defined";
  }
  return appData;
}