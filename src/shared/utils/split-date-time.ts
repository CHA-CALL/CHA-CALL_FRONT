/**
 * 'YYYY.MM.DD ~ YYYY.MM.DD HH:mm-HH:mm' 형식의 문자열을
 * 마지막 공백의 위치를 기준으로 날짜와 시간으로 분리하여 반환
 * @param dateTimeString - 변환할 전체 날짜 및 시간 문자열
 * @returns { date: string, time: string } 형식의 객체
 */
export function splitDateTime(dateTimeString: string): { date: string; time: string } {
  const lastSpaceIndex = dateTimeString.lastIndexOf(' ');

  const datePart = dateTimeString.substring(0, lastSpaceIndex);
  const timePart = dateTimeString.substring(lastSpaceIndex + 1);

  const formattedDate = datePart.replace('~', '-');
  const formattedTime = timePart.replace('-', ' - ');

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
