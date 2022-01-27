export const zeroPadding = (num, len) => {
  return (Array(len).join('0') + num).slice(-len)
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
