import { FiTrash2 } from "react-icons/fi";
import { ScheduleItemProps } from "../../types/schedule";
import { deleteScheduleService } from "../../services/user";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "../../contexts/UserContext";
import { Loading } from "../utils/Loading";

export const ScheduleItem = ({ period }: ScheduleItemProps) => {
  const { setRefreshSchedules, refreshSchedules } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleRemovePeriod = async (id: number) => {
    setLoading(true)
    return await deleteScheduleService(id).then((res) => {
      toast.success('Horário deletado com sucesso!');
      setRefreshSchedules(!refreshSchedules);
    }).catch((err) => {
      toast.error('Erro ao deletar horário, entre em contato com o administrador.')
      setLoading(false)
    })
  };

  return (
    <div className="flex items-center justify-between bg-marrom-claro p-3 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">{period.start}</span>
        <span className="text-white">às</span>
        <span className="text-white font-medium">{period.end}</span>
      </div>
      {!loading ? (

        <button
          disabled={loading}
          onClick={() => handleRemovePeriod(period.id)}
          className={`bg-white rounded-md text-red-500  p-1 hover:text-red-900`}
          title="Remover horário"
        >
          <FiTrash2 />
        </button>
      ) : (
        <div className="flex justify-center">
          <Loading size="small" color="white"/>
        </div>
      )}
    </div>
  )
};