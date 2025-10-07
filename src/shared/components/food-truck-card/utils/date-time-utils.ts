/**
 * 날짜/시간 정보 배열을 포맷팅하여 기간과 시간을 반환합니다.
 *
 * @param dateTimeInfos - 입력 형식: ["2025.10.13 ~ 2025.10.13 12:00-14:00", "2025.11.19 ~ 2025.11.19 12:00-14:00"]
 * @returns {DateTime}
 *   - period: "2025.10.13 - 2025.10.13"
 *   - time: "12:00 - 14:00"
 *
 * @example
 * // 날짜 범위인 경우
 * formatDateTimeInfos(["2025.10.13 ~ 2025.11.19 09:00-17:00"])
 * // 결과: { period: "2025.10.13 - 2025.11.19", time: "09:00 - 17:00" }
 *
 * // 배열에 여러 항목이 있는 경우 (첫 번째만 처리)
 * formatDateTimeInfos(["2025.10.13 ~ 2025.10.13 12:00-14:00", "2025.11.19 ~ 2025.11.19 15:00-17:00"])
 * // 결과: { period: "2025.10.13 - 2025.10.13", time: "12:00 - 14:00" }
 */

interface DateTime {
  period: string;
  time: string;
}

export const formatDateTimeInfos = (dateTimeInfos?: string[]): DateTime => {
  if (!dateTimeInfos || dateTimeInfos.length === 0) {
    return { period: '', time: '' };
  }

  // 첫 번째 항목만 처리 (임시)
  const firstInfo = dateTimeInfos[0];
  const dateTimeRegex = /(\d{4}\.\d{2}\.\d{2})\s*~\s*(\d{4}\.\d{2}\.\d{2})\s+(\d{2}:\d{2})-(\d{2}:\d{2})/;

  const match = firstInfo.match(dateTimeRegex);
  if (!match) {
    return { period: '', time: '' };
  }

  const [, startDate, endDate, startTime, endTime] = match;

  const period = `${startDate} - ${endDate}`;
  const time = `${startTime} - ${endTime}`;

  return { period, time };
}
