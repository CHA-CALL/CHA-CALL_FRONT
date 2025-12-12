import { z } from 'zod';
import { FOOD_TRUCK_ERROR_MESSAGE } from '../constants/food-truck';

const parseTime = (time: string): number | null => {
  const [h, m] = time.split(':');
  const hour = Number(h);
  const minute = Number(m);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  return hour * 60 + minute;
};

// 푸드트럭 등록 및 수정 form의 time 에 대한 검증
export const validateFoodTruckFormTime = (
  value: string,
  ctx: z.RefinementCtx
) => {
  const [startRaw, endRaw] = value.split('-');

  if (!startRaw && !endRaw) {
    ctx.addIssue({
      code: 'custom',
      message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.start,
    });
    return;
  }

  if (!startRaw) {
    ctx.addIssue({
      code: 'custom',
      message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.start,
    });
    return;
  }

  if (!endRaw) {
    ctx.addIssue({
      code: 'custom',
      message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.end,
    });
    return;
  }

  const startMinutes = parseTime(startRaw);
  const endMinutes = parseTime(endRaw);

  if (startMinutes === null || endMinutes === null) {
    ctx.addIssue({
      code: 'custom',
      message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.invalid,
    });
    return;
  }

  if (startMinutes >= endMinutes) {
    ctx.addIssue({
      code: 'custom',
      message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.invalid,
    });
  }
};
