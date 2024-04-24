import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BlobDragDrop from "../components/BlobDragDrop";

function BlobShop() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container">
                <BlobDragDrop/>
            </div>
        </DndProvider>
    );
}

export default BlobShop;
