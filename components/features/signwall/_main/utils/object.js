// eslint-disable-next-line import/prefer-default-export
export const clean = obj => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      }
    }
  };
  