import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/utils/Header";
import { Modal } from "../components/utils/Modal";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import { getSchedulesService, storeAvailableSchedule } from "../services/user";
import { AddScheduleModal } from "../components/Schedule/AddScheduleModal";
import { ScheduleList } from "../components/Schedule/ScheduleList";
import { DateSchedule } from "../types/schedule";
import { SubmitButton } from "../components/Schedule/ScheduleSubmitButton";
import { ToastContainer } from "react-toastify";

export const ScheduleSettings = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schedules, setSchedules] = useState<DateSchedule[]>([]);
    const [localSchedules, setLocalSchedules] = useState<DateSchedule[]>([]);
    const hasFetched = useRef(false);

    const formatDate = (dateString: string): string => {
        const formattedDate = new Date(dateString + "T00:00:00");
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        };
        return formattedDate.toLocaleDateString('pt-BR', options);
    };

    // const handleAddSchedule = (newSchedule: DateSchedule) => {
    //     setLocalSchedules(prev => {
    //         const existingIndex = prev.findIndex(s => s.date === newSchedule.date);
    //         if (existingIndex >= 0) {
    //             const updated = [...prev];
    //             updated[existingIndex].periods.push(...newSchedule.periods);
    //             return updated;
    //         }
    //         return [...prev, newSchedule];
    //     });
    //     setIsModalOpen(false);
    // };

    const handleSubmit = async () => {
        if (localSchedules.length === 0) {
            toast.error("Adicione pelo menos um horário");
            return;
        }

        setIsLoading(true);
    };

    const getSchedules = async () => {
        try {
            const response = await getSchedulesService();
            if (response.status !== 200) {
                throw new Error("Failed to fetch schedules");
            }
            setSchedules(response.data.data);
            setLocalSchedules(response.data.data);
        } catch (error) {
            toast.error('Não foi possível listar seus horários');
        }
    };

    useEffect(() => {

        getSchedules();
    }, []);

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#643f23] to-[#ffecb9] p-4 pt-24">
            <Header />

            <main className="container mx-auto max-w-md">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-marrom-escuro">
                            Meus Horários
                        </h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-areia text-marrom-escuro px-4 py-2 rounded-lg hover:bg-pele"
                        >
                            <FiPlus /> Adicionar
                        </button>
                    </div>

                    <ScheduleList
                        schedules={schedules}
                        formatDate={formatDate}
                    />

                    {/* <SubmitButton
                        isLoading={isLoading}
                        disabled={localSchedules.length === 0}
                        onClick={handleSubmit}
                    /> */}
                </div>
            </main>


            {isModalOpen &&

                <Modal >
                    <AddScheduleModal
                        setLoading={setIsLoading}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            }

            <ToastContainer />
        </section>
    );
};



