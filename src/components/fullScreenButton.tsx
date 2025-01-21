import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";

export function FullScreenButton() {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch((err) =>
          console.error(`Erro ao entrar em tela cheia: ${err.message}`),
        );
    } else {
      document
        .exitFullscreen()
        .catch((err) =>
          console.error(`Erro ao sair da tela cheia: ${err.message}`),
        );
    }
  };

  return (
    <Button
      variant={"ghost"}
      onClick={toggleFullscreen}
      className="h-full w-full justify-start rounded font-normal text-foreground p-0"
    >
      {document.fullscreenElement ? (
        <>
          <Minimize2 className="mr-2 h-4 w-4" />
          <span>Sair da tela cheia</span>
        </>
      ) : (
        <>
          <Maximize2 className="mr-2 h-4 w-4" />
          <span>Entrar na tela cheia</span>
        </>
      )}
    </Button>
  );
}
