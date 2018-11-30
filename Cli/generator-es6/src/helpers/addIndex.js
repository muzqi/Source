
/**
 *  index + 1
 */

export default function addIndex(index) {
  let num = index + 1
  if(num < 10) {
    num = `0${num}`
  }
  return num
}
