import { FiTrash2 } from "react-icons/fi";
import { ScheduleItemProps } from "../../types/schedule";
import { deleteScheduleService } from "../../services/user";
import { toast } from "react-toastify";
import { useState } from "react";

export const ScheduleItem = ({ period }: ScheduleItemProps) => {
  const [loading, setLoading] = useState(false);
  const handleRemovePeriod = async (id: number) => {
    setLoading(true)
    return await deleteScheduleService(id).then((res) => {
      toast.success('Horário deletado com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 2000)
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
      <button
        disabled={loading}
        onClick={() => handleRemovePeriod(period.id)}
        className={`bg-white rounded-md text-red-500  p-1 ${loading ? 'text-red-200 bg-red-700 ' : 'hover:text-red-900'}` }
        title="Remover horário"
      >
        <FiTrash2 />
      </button>
    </div>
  )
};