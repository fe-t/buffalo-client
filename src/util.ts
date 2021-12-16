export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });

export const DATETIME_FORMAT = "YYYY/MM/DD HH:mm:ss";
