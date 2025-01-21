import "@xyflow/react/dist/style.css";

import {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import {
  Braces,
  Circle as LucideCircle,
  Diamond as LucideDiamond,
  Download,
  Filter,
  Square as LucideSquare,
  StickyNote as LucideStickyNote,
  Type as LucideType,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

import { BracketBottomSvg } from "@/components/bracketsSvg/bracketBottom";
import { BracketLeftSvg } from "@/components/bracketsSvg/bracketLeft";
import { BracketRightSvg } from "@/components/bracketsSvg/bracketRight";
import { BracketTopSvg } from "@/components/bracketsSvg/bracketTop";
import ArrowEdge from "@/components/edges/arrowEdge";
import DefaultEdge from "@/components/edges/defaultEdge";
import EditableTitle from "@/components/editableTitle";
import { FileUpload } from "@/components/fileUpload";
import { LateralMenuButton } from "@/components/lateralMenuButton";
import { MenuButton } from "@/components/menuButton";
import { ImageUploader } from "@/components/nodes/imageUploader";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useTheme } from "@/components/theme/theme-provider";
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
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import drawflowJSONData from "@/utils/drawflowJSONData.json";
import { NODE_TYPES } from "@/utils/nodeTypes";

const EDGE_TYPES = {
  default: DefaultEdge,
  arrowEdge: ArrowEdge,
};

export function Drawflow() {
  const { colorMode } = useTheme();
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    drawflowJSONData.edges,
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    drawflowJSONData.nodes,
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setNodes((prev) => [...prev]);
    setEdges((prev) => [...prev]);
  }, []);

  function isValidData(data: any): boolean {
    return (
      Array.isArray(data.nodes) &&
      Array.isArray(data.edges) &&
      typeof data.title === "string"
    );
  }

  function handleDataLoad(data: any) {
    if (!isValidData(data)) {
      toast.error("Arquivo incompatível!", {
        description: "O JSON enviado não possui a estrutura correta.",
      });
      return;
    }

    const { nodes: newNodes, edges: newEdges, title } = data;

    setNodes(newNodes);
    setEdges(newEdges);
    setProjectTitle(title);

    setDialogOpen(false);

    toast.success("Arquivo carregado!", {
      description: "O arquivo foi aceito, e aberto para você",
    });
  }

  function handleDeleteBoard() {
    setNodes([]);
    setEdges([]);

    toast.warning("Seu board foi apagado");
  }

  const [projectTitle, setProjectTitle] = useState("Título do projeto");

  const data = {
    title: projectTitle,
    nodes,
    edges,
  };

  const formatProjectTitle = (projectTitle: string) => {
    return projectTitle
      .toLowerCase() // Converte para letras minúsculas
      .replace(/\s+/g, "-") // Substitui espaços por traços
      .replace(/[^\w-]/g, ""); // Remove caracteres inválidos, permitindo apenas letras, números e traços
  };

  const exportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2),
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${formatProjectTitle(projectTitle)}.json`;
    link.click();

    toast.success("Download iniciado!");
  };

  const updateEdgeLabel = useCallback((id: string, newLabel: string) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id
          ? { ...edge, data: { ...edge.data, label: newLabel } }
          : edge,
      ),
    );
  }, []);

  const onChangeEdgeType = (id: string, newType: string) => {
    setEdges((eds) =>
      eds.map((edge) => (edge.id === id ? { ...edge, type: newType } : edge)),
    );
  };

  const onConnect = useCallback((connection: Connection) => {
    const newEdge = {
      ...connection,
      id: `${connection.source}-${connection.target}-${Date.now()}`,
      type: "arrowEdge",
      data: { label: "" },
      markerEnd: {
        type: MarkerType.ArrowClosed, // Marcador de fim
      },
    };
    setEdges((eds: any) => addEdge(newEdge, eds));
  }, []);

  function addSquareNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "square",
        position: {
          x: 750,
          y: 350,
        },
        data: {
          label: "Insira um texto",
          fontWeight: "normal",
          fontSize: "base",
          isItalic: false,
          isUnderline: false,
          isStrikethrough: false,
        },
        measured: {
          width: 144,
          height: 96,
        },
      },
    ]);
  }

  function addFunelNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "funnel",
        position: {
          x: 750,
          y: 350,
        },
        data: {
          label: "Insira um texto",
          fontWeight: "normal",
          fontSize: "base",
          isItalic: false,
          isUnderline: false,
          isStrikethrough: false,
        },
        measured: {
          width: 144,
          height: 96,
        },
      },
    ]);
  }

  function addStickyNoteNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "stickyNote",
        position: {
          x: 750,
          y: 350,
        },
        data: { label: "Insira um texto" }, // Armazena o texto inicial
        measured: {
          // Adicionando a propriedade 'measured'
          width: 144, // Defina a largura desejada
          height: 96, // Defina a altura desejada
        },
      },
    ]);
  }

  function addCircleNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "circle",
        position: {
          x: 750,
          y: 350,
        },
        data: { label: "Insira um texto" }, // Armazena o texto inicial
        measured: {
          // Adicionando a propriedade 'measured'
          width: 144, // Defina a largura desejada
          height: 96, // Defina a altura desejada
        },
      },
    ]);
  }

  function addBracketTopNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "bracketTop",
        position: {
          x: 750,
          y: 350,
        },
        data: { label: "Insira um texto" }, // Armazena o texto inicial
        measured: {
          // Adicionando a propriedade 'measured'
          width: 144, // Defina a largura desejada
          height: 96, // Defina a altura desejada
        },
      },
    ]);
  }
  function addBracketBottomNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "bracketBottom",
        position: {
          x: 750,
          y: 350,
        },
        data: { label: "Insira um texto" }, // Armazena o texto inicial
        measured: {
          // Adicionando a propriedade 'measured'
          width: 144, // Defina a largura desejada
          height: 96, // Defina a altura desejada
        },
      },
    ]);
  }
  function addBracketLeftNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "bracketLeft",
        position: {
          x: 750,
          y: 350,
        },
        data: { label: "Insira um texto" }, // Armazena o texto inicial
        measured: {
          // Adicionando a propriedade 'measured'
          width: 144, // Defina a largura desejada
          height: 96, // Defina a altura desejada
        },
      },
    ]);
  }
  function addBracketRightNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "bracketRight",
        position: {
          x: 750,
          y: 350,
        },
        data: { label: "Insira um texto" }, // Armazena o texto inicial
        measured: {
          // Adicionando a propriedade 'measured'
          width: 144, // Defina a largura desejada
          height: 96, // Defina a altura desejada
        },
      },
    ]);
  }

  function addImageNode(imageUrl: string) {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "image", // tipo do node
        data: { imageUrl, altText: "Descrição da imagem", label: "" }, // dados do node
        position: { x: 0, y: 0 },
        measured: {
          height: 128,
          width: 128,
        },
      },
    ]);
  }

  function addTextNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "text",
        position: {
          x: 750,
          y: 350,
        },
        data: {
          label: "Insira um texto",
          fontWeight: "normal",
          fontSize: "base",
          isItalic: false,
          isUnderline: false,
          isStrikethrough: false,
        },
        measured: {
          // Adicionando a propriedade 'measured'
          width: 120, // Defina a largura desejada
          height: 24, // Defina a altura desejada
        },
      },
    ]);
  }

  function addDiamondNode() {
    setNodes((nodes: any) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "diamond",
        position: {
          x: 750,
          y: 350,
        },
        data: { label: "Insira um texto" }, // Armazena o texto inicial
        measured: {
          // Adicionando a propriedade 'measured'
          width: 160, // Defina a largura desejada
          height: 160, // Defina a altura desejada
        },
      },
    ]);
  }

  return (
    <>
      <Helmet title="Drawflow" />
      <div className="relative h-[100dvh] w-[100dvw]">
        <div className="absolute left-5 top-5 z-40 flex flex-col gap-2 md:flex-row md:items-center">
          <MenuButton onDelete={handleDeleteBoard} onExport={exportData} />
          <ModeToggle />
          <div>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogTrigger className="relative flex h-10 cursor-pointer select-none items-center rounded-sm border bg-background px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground md:w-full">
                <Download className="mr-2 h-4 w-4" />{" "}
                <span>Importar arquivo</span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação irá apagar o seu fluxograma atual, e subtitui-lo
                    pelo novo, caso ele seja aceito. Tome cuidado!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <FileUpload onDataLoad={handleDataLoad} />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <EditableTitle
            initialTitle={projectTitle}
            onTitleChange={setProjectTitle} // Passa a função para atualizar o título
          />
        </div>
        <ReactFlow
          edgeTypes={EDGE_TYPES}
          nodeTypes={NODE_TYPES}
          connectionMode={ConnectionMode.Loose}
          edges={edges.map((edge) => ({
            ...edge,
            data: {
              ...edge.data,
              onTypeChange: onChangeEdgeType,
              onLabelChange: updateEdgeLabel,
            },
          }))}
          nodes={nodes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          colorMode={colorMode}
          snapToGrid={true}
          onNodesChange={onNodesChange}
          defaultEdgeOptions={{
            type: "default",
          }}
        >
          <Background
            gap={12}
            size={2}
            color="hsl(var(--text-muted-foreground))"
            bgColor="hsl(var(--background))"
          />
          <Controls position="bottom-right" />
          <MiniMap
            nodeStrokeColor="#2563eb"
            position="top-right"
            nodeStrokeWidth={4}
          />
        </ReactFlow>
        <nav className="fixed left-5 top-1/2 flex -translate-y-1/2 transform flex-col gap-3">
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md bg-background p-2 shadow-xl transition-all data-[state=open]:bg-primary dark:bg-secondary data-[state=open]:dark:bg-primary">
              <LateralMenuButton tooltipContent="Adicionar nó com ícone">
                <LayoutPanelLeft
                  className="size-6 group-hover:text-primary"
                  strokeWidth={2.2}
                />
              </LateralMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="ml-4 dark:bg-secondary"
              side={"right"}
              align="start"
            >
              <DropdownMenuLabel className="pb-0">Tráfego</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-4 gap-1">
                {renderSocialButtons()}
              </div>
              <DropdownMenuLabel className="pb-0 pt-10">
                Conversão/Retenção
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-4 gap-1">
                {renderConversaoRetencaoButtons()}
              </div>
              <DropdownMenuLabel className="pb-0 pt-10">
                Engajamento
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-4 gap-1">
                {renderEngajamentoButtons()}
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <section className="flex flex-col gap-1 rounded-md bg-background p-2 shadow-xl dark:bg-secondary">
            <LateralMenuButton
              tooltipContent="Adicionar quadrado"
              onClick={addSquareNode}
            >
              <LucideSquare
                className="size-6 group-hover:text-primary"
                strokeWidth={2.2}
              />
            </LateralMenuButton>
            <LateralMenuButton
              tooltipContent="Adicionar círculo"
              onClick={addCircleNode}
            >
              <LucideCircle
                className="size-6 group-hover:text-primary"
                strokeWidth={2.2}
              />
            </LateralMenuButton>
            <LateralMenuButton
              tooltipContent="Adicionar losango (decisão)"
              onClick={addDiamondNode}
            >
              <LucideDiamond
                className="size-6 group-hover:text-primary"
                strokeWidth={2.2}
              />
            </LateralMenuButton>
            <LateralMenuButton
              tooltipContent="Adicionar filtro"
              onClick={addFunelNode}
            >
              <Filter
                className="size-6 group-hover:text-primary"
                strokeWidth={2.2}
              />
            </LateralMenuButton>
            <LateralMenuButton
              tooltipContent="Adicionar texto"
              onClick={addTextNode}
            >
              <LucideType
                className="size-6 group-hover:text-primary"
                strokeWidth={2.2}
              />
            </LateralMenuButton>
            <ImageUploader onUpload={addImageNode} />
            <LateralMenuButton
              tooltipContent="Adicionar anotação"
              onClick={addStickyNoteNode}
            >
              <LucideStickyNote
                className="size-6 group-hover:text-primary"
                strokeWidth={2.2}
              />
            </LateralMenuButton>
            {/* <LateralMenuButton tooltipContent="Adicionar coluna" onClick={addColumnNode}>
            <Columns2 className="size-6 group-hover:text-primary" strokeWidth={2.2} />
          </LateralMenuButton> */}
          </section>

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md bg-background p-2 shadow-xl transition-all data-[state=open]:bg-primary dark:bg-secondary data-[state=open]:dark:bg-primary">
              <LateralMenuButton tooltipContent="Adicionar chaves com texto">
                <Braces
                  className="size-6 group-hover:text-primary"
                  strokeWidth={2.2}
                />
              </LateralMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="ml-4 dark:bg-secondary"
              side={"right"}
              align="start"
            >
              <DropdownMenuLabel className="pb-0">
                Chaves disponíveis
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-4 gap-1">
                <LateralMenuButton
                  onClick={addBracketRightNode}
                  tooltipContent="Chaves para a direita"
                >
                  <BracketRightSvg />
                </LateralMenuButton>
                <LateralMenuButton
                  onClick={addBracketLeftNode}
                  tooltipContent="Chaves para a esquerda"
                >
                  <BracketLeftSvg />
                </LateralMenuButton>
                <LateralMenuButton
                  onClick={addBracketTopNode}
                  tooltipContent="Chaves para a esquerda"
                >
                  <BracketTopSvg />
                </LateralMenuButton>
                <LateralMenuButton
                  onClick={addBracketBottomNode}
                  tooltipContent="Chaves para a esquerda"
                >
                  <BracketBottomSvg />
                </LateralMenuButton>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </>
  );
}
