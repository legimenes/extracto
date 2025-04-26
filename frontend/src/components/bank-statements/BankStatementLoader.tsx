import React, { useRef, useState } from 'react'
import axios from 'axios';
import Loading from '../shared/Loading';
import { LoadBankStatementResponse } from '@shared/contracts/load-bank-statement/LoadBankStatementResponse';
import { BankStatementEntry } from '@/models/BankStatementEntry';

interface BankStatementLoaderProps {
  onFileSelect: (bankStatementEntries: BankStatementEntry[]) => void;
}

const BankStatementLoader = ({ onFileSelect }: BankStatementLoaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setFileName(file.name);
    const entries: BankStatementEntry[] = await uploadAccountStatementFile(file);
    onFileSelect(entries);
    setIsLoading(false);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
  };

  const uploadAccountStatementFile = async (file: File): Promise<BankStatementEntry[]> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = `${import.meta.env.VITE_API_BASE_URL}load-bank-statement`;
      const response = await axios.post<LoadBankStatementResponse>(url, formData);
      console.log(response.data.entries);
      return response.data.entries.map(entry => ({
        selected: true,
        id: entry.id,
        activities: entry.activities,
        memo: entry.memo,
        date: entry.date,
        value: entry.value
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
      throw new Error('Failed to upload bank statement file');
      //return [];
    }
  }

  return (
    <>
      <div className="flex items-center justify-center pb-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          className="mr-4 px-3 py-1 text-sm text-white font-semibold rounded border-0 bg-lime-600 hover:bg-lime-700"
          onClick={handleClick}>
          Carregar extrato
        </button>
        {fileName && <span>{fileName}</span>}
      </div>
      <Loading isLoading={isLoading} />
    </>
  )
}

export { BankStatementLoader }