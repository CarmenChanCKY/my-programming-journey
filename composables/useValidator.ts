export const useValidator = () => {
  const isValid = (data: any): boolean => {
    if (data !== undefined && data !== null && data !== "") {
      if (typeof data === "object") {
        return Object.keys(data).length > 0;
      } else if (Array.isArray(data)) {
        return data.length > 0;
      }
      return true;
    } else {
      return false;
    }
  };

  return { isValid };
};
