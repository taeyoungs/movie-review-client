export function CalculateBox(
  targetArr: [number, number?, number?, number?]
): string {
  let resultArr: [number, number, number, number] = [
    targetArr[0],
    targetArr[0],
    targetArr[0],
    targetArr[0],
  ];

  if (targetArr.length === 2) {
    if (targetArr[1] !== undefined)
      resultArr = [targetArr[0], targetArr[1], targetArr[0], targetArr[1]];
  } else if (targetArr.length === 3) {
    if (targetArr[1] !== undefined && targetArr[2] !== undefined)
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[1]];
  } else if (targetArr.length === 4) {
    if (
      targetArr[1] !== undefined &&
      targetArr[2] !== undefined &&
      targetArr[3] !== undefined
    )
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[3]];
  }

  return `${resultArr.toString().replace(/,/gi, 'px ')}px`;
}

export function setWidth(): number {
  const width = window.innerWidth;
  if (width >= 1280) {
    return (1280 / 3) * 2;
  } else if (width >= 1024) {
    return (1024 / 3) * 2;
  } else {
    return width - 17;
  }
}
