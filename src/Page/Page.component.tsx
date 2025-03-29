import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import Cover from "./Cover.component";
import Spacer from "./Spacer.component";
import Title from "./Title.component";
import { nanoid } from "nanoid";
import { AppStateContext } from "../state/AppStateContext";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import NodeContainer from "../Node/Node.Container";
import { useContext } from "react";

const Page = () => {
  const {
    title,
    nodes,
    addNode,
    cover,
    setCoverImage,
    reorderNodes,
    setTitle,
  } = useContext(AppStateContext);

  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  const handleDragEvent = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over?.id && active.id !== over?.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };

  return (
    <>
      <Cover
        filePath={cover}
        changePageCover={setCoverImage}
      />
      <div>
        <Title
          addNode={addNode}
          title={title}
          changePageTitle={setTitle}
        />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext
            items={nodes}
            strategy={verticalListSortingStrategy}
          >
            {nodes.map((node, index) => {
              return (
                <NodeContainer
                  key={node.id}
                  node={node}
                  isFocused={focusedNodeIndex === index}
                  updateFocusedIndex={setFocusedNodeIndex}
                  index={index}
                />
              );
            })}
          </SortableContext>
          <DragOverlay />
        </DndContext>
        <Spacer
          handleClick={() => {
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
          showHint={!nodes.length}
        />
      </div>
    </>
  );
};

export default Page;
