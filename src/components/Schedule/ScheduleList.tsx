import { FiClock } from "react-icons/fi";
import { ScheduleListProps } from "../../types/schedule";
import { ScheduleItem } from "./ScheduleItem";

export const ScheduleList = ({ schedules, formatDate }: ScheduleListProps) => {

    console.log(schedules)
    if (schedules.length === 0) {
        return (
            <div className="text-center py-6 text-marrom-claro">
                <FiClock className="mx-auto text-3xl mb-2" />
                <p>Nenhum horário agendado</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 mb-6">
            {schedules?.map((schedule) => (
                <div key={schedule.date} className="border border-marrom-claro rounded-lg p-4">
                    <h3 className="font-bold text-marrom-escuro mb-2">
                        {formatDate(schedule.date)}
                    </h3>
                    <div className="space-y-2">
                        {schedule?.periods?.map((period, index) => (
                            <ScheduleItem
                                key={index}
                                period={period}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
