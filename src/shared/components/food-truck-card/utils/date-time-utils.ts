/**
 * 날짜/시간 정보 문자열을 파싱하여 배열로 반환합니다.
 *
 * @param dateTimeInfos - 입력 형식: "2025.10.13 ~ 2025.10.13 12:00-14:00"
 * @returns {string[]}
 *   - ['25.10.13', '25.10.13', '12:00', '14:00']
 *
 * @example
 * formatDateTimeInfos("2025.10.13 ~ 2025.11.19 09:00-17:00")
 * // 결과: ['25.10.13', '25.11.19', '09:00', '17:00']
 *
 * formatDateTimeInfos("2025.09.30 ~ 2025.09.30 13:00-19:00")
 * // 결과: ['25.09.30', '25.09.30', '13:00', '19:00']
 */

export const formatDateTimeInfos = (dateTimeInfos?: string): string[] => {
  if (!dateTimeInfos || dateTimeInfos.length === 0) {
    return [];
  }

  const dateTimeRegex = /(\d{4})\.(\d{2})\.(\d{2})\s*~\s*(\d{4})\.(\d{2})\.(\d{2})\s+(\d{2}:\d{2})-(\d{2}:\d{2})/;

  const match = dateTimeInfos.match(dateTimeRegex);
  if (!match) {
    return [];
  }

  const [, startYear, startMonth, startDay, endYear, endMonth, endDay, startTime, endTime] = match;

  const startDateShort = `${startYear.slice(2)}.${startMonth}.${startDay}`;
  const endDateShort = `${endYear.slice(2)}.${endMonth}.${endDay}`;

  return [startDateShort, endDateShort, startTime, endTime];
};
