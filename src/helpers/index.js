export const changeBaseCurrency = (currencies, target) => {
  const currentBase = currencies.find(item => item.base);
  const targetBase = currencies.find(item => item.charCode === target);
  return currencies.map(item => {
      return {
          ...item,
          value: currentBase.value * item.value / targetBase.value,
          previous: currentBase.previous * item.previous / targetBase.previous,
          base: item === targetBase ? true : null,
      };
  });
}