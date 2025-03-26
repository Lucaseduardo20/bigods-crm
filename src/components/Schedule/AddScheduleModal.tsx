import { useState } from "react";
import { AddScheduleModalProps } from "../../types/schedule";
import { toast } from "react-toastify";
import { FiCalendar } from "react-icons/fi";
import { storeAvailableSchedule } from "../../services/user";
import { useAuth } from "../../contexts/UserContext";
import { Loading } from "../utils/Loading";



export const AddScheduleModal = ({ onClose }: AddScheduleModalProps) => {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("12:00");
    const [loading, setLoading] = useState(false);
    const { setRefreshSchedules, refreshSchedules } = useAuth();

    const handleSubmit = async () => {
        if (!date) {
            toast.error("Selecione uma data");
            return;
        }

        if (!startTime || !endTime) {
            toast.error("Preencha ambos os horários");
            return;
        }

        if (startTime >= endTime) {
            toast.error("O horário final deve ser após o inicial");
            return;
        }
        setLoading(true);

        try {
            const payload = {
                date: date,
                start_time: startTime,
                end_time: endTime
            }

            const response: any = await storeAvailableSchedule(payload);

            if (response.status !== 201) {
                throw new Error("Failed to update schedules");
            }

            toast.success("Horários atualizados com sucesso!");
            onClose();
            setRefreshSchedules(!refreshSchedules);
        } catch (error) {
            setLoading(false);
            toast.error("Erro ao salvar horários");
        }
        setStartTime("13:00");
        setEndTime("18:00");
    };

    return (
        <div className="p-4 bg-white rounded-lg">
            <h2 className="text-xl font-bold text-marrom-escuro mb-4">Adicionar Horário</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-marrom-escuro font-medium mb-2 flex items-center gap-2">
                        <FiCalendar className="text-marrom-medio" />
                        Data
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border border-marrom-claro rounded-lg"
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-sm text-marrom-claro mb-1">Início</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-2 border border-marrom-claro rounded-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm text-marrom-claro mb-1">Fim</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-2 border border-marrom-claro rounded-lg"
                            min={startTime}
                        />
                    </div>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-marrom-escuro bg-pele hover:bg-areia transition-colors rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-marrom-escuro text-white rounded-lg hover:bg-areia transition-colors"
                    >
                        {!loading ? 'Adicionar' : (
                            <div className="flex justify-center">
                                <Loading size="small" color="white"/>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};