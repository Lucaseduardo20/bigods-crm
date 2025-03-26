import { SubmitButtonProps } from "../../types/schedule";

export const SubmitButton = ({ isLoading, disabled, onClick }: SubmitButtonProps) => (
    <button
        onClick={onClick}
        disabled={isLoading || disabled}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white ${isLoading || disabled
                ? 'bg-marrom-claro cursor-not-allowed'
                : 'bg-marrom-escuro hover:bg-marrom-medio'
            }`}
    >
        {isLoading ? 'Salvando...' : 'Salvar Horários'}
    </button>
);