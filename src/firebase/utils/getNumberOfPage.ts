export const getNumberOfPage = (length: number, limit: number): number => {
  const page = length / limit;
  if (page % 2 === 0) {
    return page;
  }
  return Math.floor(page) + 1;
};
