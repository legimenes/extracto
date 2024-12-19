import axios from "axios";
import { useState } from "react";
import Statement from "../../models/Statement";

interface StatementLoaderProps {
  onFileSelect: (statement: Statement[]) => void;
}

const StatementLoader = ({ onFileSelect }: StatementLoaderProps) => {
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
      <div className="flex flex-col items-center justify-center p-6">
        <input type="file" className="mb-2 text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-slate-50 file:text-slate-700
          hover:file:bg-slate-300"
          onChange={handleFileChange}
        />        
        <span className="text-white">{loading ? "Carregando..." : ""}</span>        
      </div>
    </>
  );
}

export default StatementLoader;