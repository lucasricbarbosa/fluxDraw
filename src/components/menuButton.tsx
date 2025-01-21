import { AlignLeft, Download, Trash2, TriangleAlert } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { FullScreenButton } from "./fullScreenButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface MenuButtonProps {
  onExport: () => void;
  onDelete: () => void;
}

export function MenuButton({ onExport, onDelete }: MenuButtonProps) {
  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <AlignLeft className="transition-all duration-150" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent align="start">
            <p>Menu principal</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Opções do board</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onExport} className="cursor-pointer">
              <Download className="mr-2 h-4 w-4 rotate-180" />
              <span>Exportar arquivo</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="px-2 py-1.5">
              <FullScreenButton />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="cursor-pointer">
              <AlertDialog>
                <AlertDialogTrigger className="relative cursor-pointer hover:bg-secondary w-full flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                  <span>Apagar board</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você tem certeza?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Seu board será apagado, e você não conseguirá acessá-lo novamente!
                      Recomendamos que você salve o board atual, caso queira utilizar ele depois.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="text-white" onClick={onDelete}>
                      <TriangleAlert size={20} className="mr-1" />
                      Apagar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
