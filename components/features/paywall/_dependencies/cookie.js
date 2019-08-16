
export const hasEnableCookie = (() => {
    try {
      localStorage.setItem('test', true);
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  })();