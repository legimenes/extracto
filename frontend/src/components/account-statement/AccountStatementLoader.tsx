import React, { useRef, useState } from 'react'
import axios from 'axios';
import Loading from '../shared/Loading';
import { AccountStatement } from '../../models';

interface AccountStatementLoaderProps {
  onFileSelect: (statement: AccountStatement[]) => void;
}

const AccountStatementLoader = ({ onFileSelect }: AccountStatementLoaderProps) => {
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
    const statement: AccountStatement[] = await uploadAccountStatementFile(file);
    onFileSelect(statement);
    setIsLoading(false);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
  };

  const uploadAccountStatementFile = async (file: File): Promise<AccountStatement[]> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const endpointUrl = `${import.meta.env.VITE_API_BASE_URL}load-statement`;
      const response = await axios.post(endpointUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const statement: AccountStatement[] = response.data.map((item: AccountStatement, index: number) => ({
        ...item,
        selected: true,
        id: index
      }));
      return statement;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
      return [];
    }
  }

  console.log('RENDER AccountStatementLoader');

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

export { AccountStatementLoader }