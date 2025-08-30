import { useState } from "react";
import useExpressions from "@/hooks/useExpressions";
import Loading from "@/components/shared/Loading";
import { ExpressionResponse } from "@shared/contracts/activity/ActivityResponse";
import { ExpressionModal } from "./ExpressionModal";

interface ExpressionListProps {
  activityId: number;
  expressions: ExpressionResponse[];
  onRefresh: () => Promise<void>;
}

const ExpressionList = ({ activityId, expressions, onRefresh }: ExpressionListProps) => {
  const [isExpressionModalOpen, setIsExpressionModalOpen] = useState(false);
  const { deleteExpression, isExpressionsLoading, expressionsError } = useExpressions();

  const handleOpenExpressionModal = () => {
    setIsExpressionModalOpen(true);
  };

  const handleCloseExpressionModal = () => {
    setIsExpressionModalOpen(false);
  };

  const handleDelete = async (expressionId: number) => {
    const confirmed = window.confirm('Confirma a exclusão desta expressão?');
    if (!confirmed) return;
    await deleteExpression(expressionId);
    onRefresh();
  };

  return (
    <>
      <div className="mt-6">
        <Loading isLoading={isExpressionsLoading} />
        {expressionsError && <p className="text-red-500">{expressionsError}</p>}
        {expressions && expressions.length > 0 ? (
          <div className="overflow-auto max-h-48">
            <table className="min-w-full bg-neutral-900 border-collapse border border-neutral-700 select-none">
              <thead className="sticky top-0">
                <tr className="bg-neutral-900 text-neutral-400">
                  <th className="pl-2 text-start cursor-pointer">
                    <button
                      className="px-3 py-1 text-sm text-white font-semibold rounded bg-lime-600 hover:bg-lime-700"
                      onClick={handleOpenExpressionModal}>
                      +
                    </button>
                    <span className="ml-2">Expressão</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {expressions.map((expression) => (
                  <tr
                    key={expression.id}
                    className="border border-neutral-700 hover:bg-neutral-800">
                    <td className="p-2">{expression.pattern}</td>
                    <td className="p-2 text-right">
                      <button
                        className="px-2 py-1 text-xs text-white font-semibold rounded bg-red-600 hover:bg-red-700"
                        onClick={() => handleDelete(expression.id)}>
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <button
              className="px-3 py-1 text-sm text-white font-semibold rounded bg-lime-600 hover:bg-lime-700"
              onClick={handleOpenExpressionModal}>
              +
            </button>
            <p className="text-neutral-300">Nenhuma expressão associada</p>
          </div>
        )}
      </div>
      {activityId !== null && (
        <ExpressionModal
          activityId={activityId}
          open={isExpressionModalOpen}
          onClose={handleCloseExpressionModal}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
}

export { ExpressionList };