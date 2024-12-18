import { TSchedul } from './OfferedCourse.interfaces';

export const hasTimeConfilge = (
  assignSchedules: TSchedul[],
  newSedules: TSchedul,
) => {
  for (const shedules of assignSchedules) {
    const existiongStartTime = new Date(`2001-10-10T${shedules.startTime}`);
    const existiongEndTime = new Date(`2001-10-10T${shedules.endTime}`);
    const newgStartTime = new Date(`2001-10-10T${newSedules.startTime}`);
    const newgEndTime = new Date(`2001-10-10T${newSedules.endTime}`);

    if (newgStartTime < existiongEndTime && newgEndTime > existiongStartTime) {
      return true;
    }
  }

  return false;
};
