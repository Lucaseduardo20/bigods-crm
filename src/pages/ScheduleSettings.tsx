import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/utils/Header";
import { Modal } from "../components/utils/Modal";
import { toast } from "react-toastify";
import { FiPlus, FiClock } from "react-icons/fi";
import { getSchedulesService, storeAvailableSchedule } from "../services/user";
import { AddScheduleModal } from "../components/Schedule/AddScheduleModal";
import { ScheduleList } from "../components/Schedule/ScheduleList";
import { DateSchedule } from "../types/schedule";
import { SubmitButton } from "../components/Schedule/ScheduleSubmitButton";
import { ToastContainer } from "react-toastify";
import {Loading} from '../components/utils/Loading'

export const ScheduleSettings = () => {
    const { user, refreshSchedules } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schedules, setSchedules] = useState<DateSchedule[]>([]);
    const [localSchedules, setLocalSchedules] = useState<DateSchedule[]>([]);
    const [isFetching, setIsFetching] = useState(true);
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

    const getSchedules = async () => {
        setIsFetching(true);
        try {
            const response = await getSchedulesService();
            if (response.status !== 200) {
                throw new Error("Failed to fetch schedules");
            }
            setSchedules(response.data.data);
            setLocalSchedules(response.data.data);
        } catch (error) {
            toast.error('Não foi possível listar seus horários');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getSchedules();
    }, []);
    useEffect(() => {
        getSchedules();
    }, [refreshSchedules])

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

                    {isFetching ? (
                        <div className="flex justify-center py-8">
                            <Loading size="large" />
                        </div>
                    ) : schedules.length === 0 ? (
                        <div className="text-center py-8">
                            <FiClock className="mx-auto text-4xl text-marrom-claro mb-4" />
                            <p className="text-marrom-escuro font-medium">Nenhum horário cadastrado</p>
                            <p className="text-marrom-claro mt-2">Adicione seu primeiro horário clicando no botão acima</p>
                        </div>
                    ) : (
                        <ScheduleList
                            schedules={schedules}
                            formatDate={formatDate}
                        />
                    )}
                </div>
            </main>

            {isModalOpen &&
                <Modal>
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