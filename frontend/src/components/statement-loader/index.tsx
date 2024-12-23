import axios from "axios";
import { useState } from "react";
import Statement from "../../models/Statement";

interface StatementLoaderProps {
  onFileSelect: (statement: Statement[]) => void;
}

export default function StatementLoader({ onFileSelect }: StatementLoaderProps) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("http://localhost:3000/load-statement", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const statement: Statement[] = response.data.map((item: Statement, index: number) => ({
        ...item,
        selected: true,
        id: index
      }));
      onFileSelect(statement);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pb-6">
        <input type="file" className="text-sm text-white
          file:mr-4 file:px-3 file:py-1 file:rounded file:border-0
          file:text-sm file:font-semibold file:text-white
          file:bg-lime-600 hover:file:bg-lime-700"
          onChange={handleFileChange}
        />
        <span className="text-white">{loading && "Carregando..."}</span>
      </div>
    </>
  );
}