export const waitFor = async (timeout: number) => {
  return await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};