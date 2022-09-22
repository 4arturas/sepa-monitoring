import moment, {Moment} from "moment/moment";

export const ROLE_ADMIN = 'Administrator';
export const ROLE_NEED_TO_ASK_WHAT_ELSE_ROLES_ARE_AVAILABLE = '-----';

export const TABLE_PAGE_SIZE_DEFAULT = 5;


export const MSG_BUSINESS_AREA_IS_NOT_SET = 'Business area is not set'

export const getLastMonthFirstDay = (): Moment =>
{
    const lastMonth:Moment = moment().subtract(1, "month");
    return lastMonth.startOf('month');
}
