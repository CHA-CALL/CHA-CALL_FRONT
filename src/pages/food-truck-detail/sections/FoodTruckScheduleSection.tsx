import ScheduleCalendar from '@pages/food-truck-detail/components/ScheduleCalendar';

interface FoodTruckScheduleSectionProps {
  availableDates: string;
}

export default function FoodTruckScheduleSection({
  availableDates,
}: FoodTruckScheduleSectionProps) {
  console.log(availableDates);
  return (
    <div className='flex flex-col gap-[2rem] p-[2rem]'>
      <h3 className='text-grayscale-900 title-sb-12'>가능한 일정대</h3>
      <div className='rounded-[1.6rem] border border-grayscale-200 px-[1.4rem] py-[2rem]'>
        <ScheduleCalendar />
      </div>
    </div>
  );
}
