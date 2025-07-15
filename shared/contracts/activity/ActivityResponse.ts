interface ActivityResponse {
  id: number;
  name: string;
  operation: string;
  expressions: ExpressionResponse[];  
};

interface ExpressionResponse {
  id: number;
  pattern: string;
}

export { 
  ActivityResponse,
  ExpressionResponse
};