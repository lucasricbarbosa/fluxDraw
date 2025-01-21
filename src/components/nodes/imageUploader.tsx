// ImageUploader.tsx
import { useRef } from "react";
import { Image } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void;
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onUpload(reader.result as string); // Chama a função de upload
        }
      };
      reader.readAsDataURL(selectedFile); // Lê o arquivo como URL de dados
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group relative flex size-10 cursor-pointer items-center justify-center rounded-md hover:bg-primary/25">
            <Image className="size-6 group-hover:text-primary cursor-pointer" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              ref={fileInputRef}
              aria-label="Upload de imagem"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Adicionar imagem</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
