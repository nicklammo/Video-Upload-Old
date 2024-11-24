export const formatString = (string: string) => {
  const upperCase = string.charAt(0).toUpperCase() + string.slice(1);
  const lowerCase = string.charAt(0).toLowerCase() + string.slice(1);
  return {
    upperCase: upperCase,
    lowerCase: lowerCase,
  }
}