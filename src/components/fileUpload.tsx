import { useState } from "react";
import { Input } from "./ui/input";

interface FileUploadProps {
    onDataLoad: (data: any) => void; // Callback para passar os dados
}

export function FileUpload({ onDataLoad }: FileUploadProps) {
    const [_, setFile] = useState<File | null>(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            readFileContent(selectedFile);
        }
    }

    function readFileContent(file: File) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target?.result as string);
                onDataLoad(jsonData); // Chama a função de callback com os dados
            } catch (error) {
                console.error("Erro ao parsear JSON:", error);
            }
        };
        reader.onerror = (error) => {
            console.error("Erro ao ler o arquivo:", error);
        };
        reader.readAsText(file);
    }

    return (
            <Input className="cursor-pointer bg-primary text-white z-30 w-[148px] hover:bg-primary/90" type="file" onChange={handleChange} accept=".json" />
    );
}
