import { FiTrash2 } from "react-icons/fi";
import { ScheduleItemProps } from "../../types/schedule";

export const ScheduleItem = ({ period, onRemove }: ScheduleItemProps) => (
    <div className="flex items-center justify-between bg-pele/10 p-3 rounded-lg">
        <div className="flex items-center gap-2">
            <span className="font-medium">{period.start}</span>
            <span className="text-marrom-claro">às</span>
            <span className="font-medium">{period.end}</span>
        </div>
        <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 p-1"
            title="Remover horário"
        >
            <FiTrash2 />
        </button>
    </div>
);