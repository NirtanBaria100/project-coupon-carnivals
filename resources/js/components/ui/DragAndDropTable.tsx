import React, { useState, useCallback, useRef } from "react";
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "ROW";

interface RowData {
  id: string;
  icon: string;
  data: string;
}

interface DragItem {
  id: string;
  index: number;
}

interface DraggableCardProps {
  id: string;
  index: number;
  moveRow: (from: number, to: number) => void;
  children: React.ReactNode;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ id, index, moveRow, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem>({
    accept: ItemType,
    hover(item) {
      if (item.index === index) return;
      moveRow(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`p-4 rounded-lg shadow-md bg-white transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
};

const DragAndDropGrid: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([
    { id: "T0", icon: "📊", data: "Sales Report" },
    { id: "T1", icon: "📦", data: "Inventory List" },
    { id: "T2", icon: "💳", data: "Payment Methods" },
  ]);

  const moveRow = useCallback((from: number, to: number) => {
    setRows((prevRows) => {
      const updated = [...prevRows];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Drag & Drop Grid View</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rows.map((row, index) => (
            <DraggableCard key={row.id} id={row.id} index={index} moveRow={moveRow}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{row.icon}</span>
                <span className="text-lg font-medium">{row.data}</span>
              </div>
            </DraggableCard>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDropGrid;
