import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Levels from "../models/Levels";
import BlobDragDrop from "../components/BlobDragDrop";
import DisplayLevelDetails from "../components/DisplayLevelDetails";

function ShopPage() {
    const level = Levels(localStorage.getItem("level"));

    return (
        <DndProvider backend={HTML5Backend}>
            <DisplayLevelDetails
                target={level.target}
                env={level.env}
                costs={level.costs}
                marginTop={"200px"}
            />
            <div className="container">
                <BlobDragDrop costs={level.costs} budget={level.budget} />
            </div>
        </DndProvider>
    );
}

export default ShopPage;
