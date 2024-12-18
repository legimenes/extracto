interface FileUploadProps {
  onFileChoice: (file: File) => void;
}

function FileUpload({ onFileChoice }: FileUploadProps) {
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChoice(file);
    }
  };

  return (
    <>
      <input type="file" className="mb-2 text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-slate-50 file:text-slate-700
        hover:file:bg-slate-300"
        onChange={onChangeFile}
      />
    </>
  );
}

export default FileUpload;