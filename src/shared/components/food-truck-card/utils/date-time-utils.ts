/**
 * 날짜/시간 정보 배열을 포맷팅하여 기간과 시간을 반환합니다.
 *
 * @param dateTimeInfos - 입력 형식: ["2024-10-03 14시~18시", "2024-10-04 14시~18시"]
 * @returns {DateTime}
 *   - period: "2024.10.03 - 2024.10.04" (단일 날짜인 경우: "2024.10.03")
 *   - time: "14:00 - 18:00"
 *
 * @example
 * // 여러 날짜인 경우
 * formatDateTimeInfos(["2024-10-03 14시~18시", "2024-10-04 14시~18시"])
 * // 결과: { period: "2024.10.03 - 2024.10.04", time: "14:00 - 18:00" }
 *
 * // 단일 날짜인 경우
 * formatDateTimeInfos(["2024-10-03 9시~17시"])
 * // 결과: { period: "2024.10.03", time: "09:00 - 17:00" }
 */

interface DateTime {
  period: string;
  time: string;
}

export const formatDateTimeInfos = (dateTimeInfos?: string[]): DateTime => {
  if (!dateTimeInfos || dateTimeInfos.length === 0) {
    return { period: '', time: '' };
  }

  const dateTimeRegex = /(\d{4}-\d{2}-\d{2})\s+(\d+)시~(\d+)시/;

  const dates: string[] = [];
  let startTime = '';
  let endTime = '';

  dateTimeInfos.forEach((info) => {
    const match = info.match(dateTimeRegex);
    if (match) {
      const [, date, start, end] = match;

      dates.push(date.replace(/-/g, '.'));

      if (!startTime) {
        startTime = start.padStart(2, '0');
        endTime = end.padStart(2, '0');
      }
    }
  });


  const period = dates.length > 1
    ? `${dates[0]} - ${dates[dates.length - 1]}`
    : dates[0] || '';

  const time = startTime && endTime
    ? `${startTime}:00 - ${endTime}:00`
    : '';

  return { period, time };
}
