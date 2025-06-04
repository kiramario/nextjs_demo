

const sleep = (ms: number) => new Promise((resolve) => setTimeout(() => resolve("ok"), ms));



export { sleep }