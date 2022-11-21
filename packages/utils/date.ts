/**
 * 检查日期是否有效
 * @param val
 * @returns boolean
 * isDateValid("December 17, 1995 03:24:00");  // true
 */
export const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

/**
 * 计算两个日期之间的间隔
 * @param start 起始日期
 * @param end 结束日期
 * @returns 天数
 * dayDif(new Date("2021-11-3"), new Date("2022-2-1"))  // 90
 */
export const dayDif = (start: Date, end: Date) => Math.ceil(Math.abs(end.getTime() - start.getTime()) / 86400000);

/**
 * 查找日期位于一年中的第几天
 * @param date
 * @returns 天数
 * dayOfYear(new Date());   // 307
 */
export const dayOfYear = (date: Date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

type FormatProps = 'default' | 'date' | 'time' | 'dateTime' | 'week' | 'month' | 'quarter' | 'year';
/**
 *
 * @param format
 * @returns
 */
export const getFormat = (format: FormatProps = 'default') => {
  const FORMAT_MAP = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm:ss',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    week: 'YYYY-w',
    month: 'YYYY-MM',
    quarter: 'YYYY-Q',
    year: 'YYYY',
    default: 'YYYY-MM-DD HH:mm:ss',
  };
  return FORMAT_MAP[format];
};
