/*
 * @Author: liqi1@cmiot.chinamobile.com
 * @Tel:  19823363089
 * @Date: 2019-11-21 22:56:43
 * @Description:
 * @Last Modified by: liqi1@cmiot.chinamobile.com
 * @Last Modified time: 2019-11-26 13:43:33
 */

type FormatNumber = (n: number) => String;
const formatNumber: FormatNumber = n => {
  const s = n.toString();
  return s[1] ? s : `0${s}`;
};

type FormatTime = (date: Date) => String;
const formatTime: FormatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second]
    .map(formatNumber)
    .join(':')}`;
};

export { formatTime };
