import { NodeData, NodeType, Page } from "../utils/types";
import { arrayMove } from "@dnd-kit/sortable";
import { useSyncedState } from "./useSyncState";
import { debouncedUpdatePage } from "../utils/updatePage";

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useSyncedState<Page>(
    initialState,
    debouncedUpdatePage
  );

  const addNode = (node: NodeData, index: number): void => {
    setPage((draft) => {
      draft.nodes.splice(index, 0, node);
    });
  };

  const removeNodeByIndex = (index: number): void => {
    setPage((draft) => {
      draft.nodes.splice(index, 1);
    });
  };

  const changeNodeValue = (index: number, value: string) => {
    setPage((draft) => {
      draft.nodes[index].value = value;
    });
  };

  const changeNodeType = (nodeIndex: number, type: NodeType) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].type = type;
      draft.nodes[nodeIndex].value = "";
    });
  };
  const setNodes = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };

  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };

  const setCoverImage = (coverImage: string) => {
    setPage((draft) => {
      draft.cover = coverImage;
    });
  };

  const reorderNodes = (id1: string, id2: string) => {
    setPage((draft) => {
      const index1 = draft.nodes.findIndex((node) => node.id === id1);
      const index2 = draft.nodes.findIndex((node) => node.id === id2);
      draft.nodes = arrayMove(draft.nodes, index1, index2);
    });
  };

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    changeNodeType,
    changeNodeValue,
    addNode,
    removeNodeByIndex,
    setCoverImage,
    setTitle,
    setNodes,
    reorderNodes,
  };
};
