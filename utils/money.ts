export function changeMoney(amount: number): string {
  if (amount < 1000000) {
    return `${amount.toLocaleString()} dong`;
  } else if (amount < 10000000) {
    const kValue = (amount / 1000).toFixed(1);
    return `${kValue}k dong`;
  } else {
    const mValue = (amount / 1000000).toFixed(1);
    return `${mValue}M dong`;
  }
}

export function convertToDoLa(amountInUSD: number | undefined) {
  if (!amountInUSD) return `0 vnđ`;
  const exchangeRate = 23577;
  const amountInVND = amountInUSD * exchangeRate;
  const formattedAmount = `${amountInVND.toFixed(0)} vnđ`;
  return formattedAmount;
}

export function convertVNDtoUSD(amountVND: number): string {
  if (!amountVND) return `$0`;
  const exchangeRate = 23577; // Exchange rate as of my knowledge cutoff in September 2021
  const amountUSD = amountVND / exchangeRate;
  return `$${amountUSD.toFixed(2)}`;
}
