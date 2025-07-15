import { useState } from 'react';
import ExpressionGateway from '@/gateways/ExpressionGateway';
import { InsertExpressionRequest } from '@shared/contracts/insert-expression/InsertExpressionRequest';

const useExpressions = () => {
  const [isExpressionsLoading, setIsExpressionsLoading] = useState(false);
  const [expressionsError, setExpressionsError] = useState<string | null>(null);

  const insertExpression = async (expression: InsertExpressionRequest): Promise<void> => {
    setIsExpressionsLoading(true);
    try {
      await ExpressionGateway.insertExpression(expression);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to insert expression';
      setExpressionsError(message);
      throw error;
    } finally {
      setIsExpressionsLoading(false);
    }
  };

  return {
    insertExpression,
    isExpressionsLoading,
    expressionsError
  };
}

export default useExpressions;