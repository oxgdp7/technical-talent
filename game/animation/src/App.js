import React, { useState, useEffect } from 'react';
import './App.css';

// hover effect to display child/parent relationship

// Define paths for background and sprite images
const backgroundImage = 'sprites/background.jpg';

const spriteImages = [
  { color: 'blue', images: ['sprites/blue.png', 'sprites/BLUE_ZZZ.png']},
  { color: 'green', images: ['sprites/green.png', 'sprites/GREEN_ZZZ.png']},
  { color: 'orange', images: ['sprites/orange.png', 'sprites/ORANGE_ZZZ.png']},
  { color: 'purple', images: ['sprites/purple.png', 'sprites/PURPLE_ZZZ.png']},
  { color: 'red', images: ['sprites/red.png', 'sprites/RED_ZZZ.png']},
  { color: 'yellow', images: ['sprites/yellow.png', 'sprites/YELLOW_ZZZ.png']}

]

const blobDetails = [
  { color: "red", id: "red0", status: "Sleeping", phase: null, restarted: null, children: null, parent: "purple0"},
  { color: "red", id: "red1", status: "Sleeping", phase: null, restarted: null, children: null, parent: "purple0"},
  { color: "blue", id: "blue0", status: "Sleeping", phase: null, restarted: null, children: null, parent: "purple0"},
  { color: "green", id: "green0", status: "Active", phase: 1, restarted: null, children: null, parent: "purple0"},
  { color: "orange", id: "orange0", status: "Active", phase: 1, restarted: null, children: null, parent: "purple0"},
  { color: "purple", id: "purple0", status: "Active", phase: 1, restarted: "red0", children: ["red0", "red1", "blue0", "green0", "orange0"], parent: "yellow0"},
  { color: "blue", id: "blue1", status: "Active", phase: 1, restarted: null, children: null, parent: null},
  { color: "yellow", id: "yellow0", status: "Sleeping", phase: 1, restarted: null, children: ["purple0"], parent: null}
  // Add more sprite data as needed
];

const App = () => {
  const [blobs, setBlobs] = useState([]);

  useEffect(() => {
    // Process blob details and set state
    const processedBlobs = processBlobDetails(blobDetails);
    setBlobs(processedBlobs);
  }, []);

  const processBlobDetails = (blobDetails) => {
    // Create a map of blobs by their IDs for easy access
    const blobMap = {};
    blobDetails.forEach(blob => {
      blobMap[blob.id] = { ...blob, children: [] }; // Initialize children array
    });

    // Assign children to their respective parent blobs
    blobDetails.forEach(blob => {
      if (blob.parent) {
        blobMap[blob.parent].children.push(blobMap[blob.id]); // Add child blob to parent's children array
      }
    });

    // Identify top-level blobs (those without parents)
    const topLevelBlobs = blobDetails.filter(blob => !blob.parent);

    // Function to recursively process blobs and their children
    const processBlob = (blob) => {
      return {
          ...blob,
          children: blob.children.map(child => processBlob(child)) // Recursively process children
      };
    };

    // Process each top-level blob and its descendants recursively
    const processedBlobs = topLevelBlobs.map(blob => processBlob(blobMap[blob.id]));

    return processedBlobs;
  };

  // Function to handle mouse hover events
  const handleMouseHover = () => {
    // Mouse hover event handling logic goes here
  };

  // Function to recursively render blobs and their children
  const renderBlobs = (blobs) => {
    return blobs.map(blob => (
      <React.Fragment key={blob.id}>
        <Blob blob={blob} onMouseHover={handleMouseHover} />
        {blob.children.length > 0 && renderBlobs(blob.children)}
      </React.Fragment>
    ));
  };

  return (
    <div className="App">
      <div className="background-container">
        <img src={backgroundImage} alt="Background" className="background-image" />
        {renderBlobs(blobs)}
        {/* Render arrows */}
        {/* {arrows.map(arrow => (
          <Arrow key={arrow.id} arrow={arrow} />
        ))} */}
      </div>
    </div>
  );
};

const Blob = ({ blob, onMouseHover }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isBobbing] = useState(true);

  useEffect(() => {
    const colorData = spriteImages.find(sprite => sprite.color === blob.color);
    
    if (blob.status === "Active") {
      if (colorData) {
        setImageIndex(0);
      }
    }else{
      if (colorData) {
        setImageIndex(1);
      }
    }

  }, [blob.color, blob.status]);

  const colorData = spriteImages.find(sprite => sprite.color === blob.color);
  if (!colorData) {return null;}

  function blobPosition(blob) {
    let x = 0;
    let y = 0;

    function getRandomPointInCircle(centerX, centerY, radius) {
      const angle = Math.random() * Math.PI * 2; // Random angle between 0 and 2π
      const x = centerX + Math.cos(angle) * radius; // Convert polar coordinate to Cartesian coordinate for x
      const y = centerY + Math.sin(angle) * radius; // Convert polar coordinate to Cartesian coordinate for y
      return { x, y };
    }
  
    if (blob.status === "Waiting" || blob.status === "Sleeping") {
      ({x, y} = getRandomPointInCircle(20, 30, 5));
    } else {
      switch (blob.color) {
        case "red":
          ({x, y} = getRandomPointInCircle(60, 40, 5));
          break;
        case "blue":
          ({x, y} = getRandomPointInCircle(30, 50, 5));
          break;
        case "green":
          ({x, y} = getRandomPointInCircle(83, 20, 5));
          break;
        case "orange":
          ({x, y} = getRandomPointInCircle(85, 80, 5));
          break;
        case "purple":
          ({x, y} = getRandomPointInCircle(50, 40, 5));
          break;
        case "yellow":
          ({x, y} = getRandomPointInCircle(50, 50, 5));
          break;
        default:
          x = 0;
          y = 0;
      }
    }
  
    return { x, y };
  }

  const {x, y} = blobPosition(blob);

  const bobbingAnimation = isBobbing ? 'bobbing-animation' : '';

  return (
    <img
      src={colorData.images[imageIndex]}
      alt="Blob"
      className={`blob-image ${blob.status} ${bobbingAnimation}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => onMouseHover(blob)}
    />
  );
};



export default App;




























// ____________________________________________________________________________
// const blobData = [
//   { id: 1, images: ['sprites/blue.png', 'sprites/BLUE_ZZZ.png'], x: 10, y: 20 },
//   { id: 2, images: ['sprites/green.png', 'sprites/GREEN_ZZZ.png'], x: 20, y: 20 },
//   { id: 3, images: ['sprites/orange.png', 'sprites/ORANGE_ZZZ.png'], x: 30, y: 20 },
//   { id: 4, images: ['sprites/purple.png', 'sprites/PURPLE_ZZZ.png'], x: 40, y: 20 },
//   { id: 5, images: ['sprites/red.png', 'sprites/RED_ZZZ.png'], x: 50, y: 20 },
//   { id: 6, images: ['sprites/yellow.png', 'sprites/YELLOW_ZZZ.png'], x: 60, y: 20 }
//   // Add more sprite data as needed
// ];


// function App() {
//   const [blobHierarchy, setBlobHierarchy] = useState([]);

//   useEffect(() => {
//     // [Blobtype, Blobstate, ParentBlob]
//     const inputBlobStates 
//     = [[1, 'Sleeping', null],
//     [1, 'Waiting', 0],
//     [2, 'Active', 1]]

//     // This represents blobs: 1 (parent), 2 (child of 1), 3 (child of 1), 4 (child of 2)
//     const inputHierarchy = [[1, null], [2, 1], [3, 1], [4, 3]]; // Example input hierarchy
//     setBlobHierarchy(inputHierarchy);
//   }, []);

//   const getBlobTree = () => {
//     const blobTree = {};

//     // Create blob tree from hierarchy
//     blobHierarchy.forEach(([blobId, parentId]) => {
//       if (!blobTree[parentId]) blobTree[parentId] = { children: [] };
//       blobTree[parentId].children.push(blobId);
//     });

//     return blobTree;
//   };

//   const Blob = ({ blob, x, y }) => {
//     const [imageIndex, setImageIndex] = useState(0);
  
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setImageIndex((prevIndex) => (prevIndex + 1) % blob.images.length);
//       }, 500); // Adjust the interval for sprite animation speed
  
//       return () => clearInterval(interval);
//     }, [blob.images.length]);
  
//     return (
//       <img src={blob.images[imageIndex]} alt="Blob" className="blob-image" style={{ left: `${x}%`, top: `${y}%` }} />
//     );
//   };

//   const renderBlob = (blobId, x, y) => {
//     const blob = blobDetails.find(blob => blob.id === blobId);
//     let childBlobs = [];

//     {blobTree[blobId]?.children.map((childId, index) => {
//       const childX = x + 10 * index;
//       const childY = y + 20;
//       const childBlob = renderBlob(childId, childX, childY);
//       childBlobs.push(childBlob); // Store rendered child blob in array
//     })}
  
//     return [<Blob key={blobId} blob={blob} x={x} y={y} />, ...childBlobs];
//   };

//   const blobTree = getBlobTree();

//   return (
//     <div className="App">
//       <div className="background-container">
//         <img src={backgroundImage} alt="Background" className="background-image" />
//         {blobTree[null]?.children.map((blobId, index) => (
//           renderBlob(blobId, 10, 10) // Adjust initial positioning as needed
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

// ______________________________________________________________________________________
// import React, { useState, useEffect } from 'react';
// import './App.css';

// // Define paths for background and sprite images
// const backgroundImage = 'sprites/Nature-Background-Graphics-66003049-1.jpg';

// const blobData = [
//   { id: 1, images: ['sprites/blue.png', 'sprites/BLUE_ZZZ.png'], x: 10, y: 20 },
//   { id: 2, images: ['sprites/green.png', 'sprites/GREEN_ZZZ.png'], x: 20, y: 20 },
//   { id: 3, images: ['sprites/orange.png', 'sprites/ORANGE_ZZZ.png'], x: 30, y: 20 },
//   { id: 4, images: ['sprites/purple.png', 'sprites/PURPLE_ZZZ.png'], x: 40, y: 20 },
//   { id: 5, images: ['sprites/red.png', 'sprites/RED_ZZZ.png'], x: 50, y: 20 },
//   { id: 6, images: ['sprites/yellow.png', 'sprites/YELLOW_ZZZ.png'], x: 60, y: 20 }
//   // Add more sprite data as needed
// ];

// const margin = 5

// function App() {
//   const [blobCounts, setBlobCounts] = useState({});

//   useEffect(() => {
//     // Example input: { 1: 2, 2: 3, 3: 1 }
//     // This means blob 1 should display 2 copies, blob 2 should display 3 copies, and blob 3 should display 1 copy.
//     const inputCounts = { 1: 2, 2: 7, 3: 1 }; // Example input counts
//     setBlobCounts(inputCounts);
//   }, []);

//   return (
//     <div className="App">
//       <div className="background-container">
//         <img src={backgroundImage} alt="Background" className="background-image" />
//         {blobData.map(blob => (
//           Array.from({ length: blobCounts[blob.id] || 0 }, (_, index) => (
//             <Blob key={`${blob.id}_${index}`} blob={blob} x={index * ((100 - margin * 2) / blobCounts[blob.id]) + margin} y={blob.id * 10}/>
//           ))
//         ))}
//       </div>
//     </div>
//   );
// }

// function Blob({ blob, x, y }) {
//   const [imageIndex, setImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setImageIndex((prevIndex) => (prevIndex + 1) % blob.images.length);
//     }, 500); // Adjust the interval for sprite animation speed

//     return () => clearInterval(interval);
//   }, [blob.images.length]);

//   return (
//     <img src={blob.images[imageIndex]} alt="Blob" className="blob-image" style={{ left: `${x}%`, top: `${y}%` }} />
//   );
// }

// export default App;