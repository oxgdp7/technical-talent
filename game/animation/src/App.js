import React, { useState, useEffect } from 'react';
import './App.css';

// Define paths for background and sprite images
const backgroundImage = 'sprites/Nature-Background-Graphics-66003049-1.jpg';

const blobData = [
  { id: 1, images: ['sprites/blue.png', 'sprites/BLUE_ZZZ.png']},
  { id: 2, images: ['sprites/green.png', 'sprites/GREEN_ZZZ.png']},
  { id: 3, images: ['sprites/orange.png', 'sprites/ORANGE_ZZZ.png']},
  { id: 4, images: ['sprites/purple.png', 'sprites/PURPLE_ZZZ.png']},
  { id: 5, images: ['sprites/red.png', 'sprites/RED_ZZZ.png']},
  { id: 6, images: ['sprites/yellow.png', 'sprites/YELLOW_ZZZ.png']}
  // Add more sprite data as needed
];
function App() {
  const [blobHierarchy, setBlobHierarchy] = useState([]);

  useEffect(() => {
    // Example input: [[1, null], [2, 1], [3, 1], [4, 2]]
    // This represents blobs: 1 (parent), 2 (child of 1), 3 (child of 1), 4 (child of 2)
    const inputHierarchy = [[1, null], [2, 1], [3, 1], [4, 3]]; // Example input hierarchy
    setBlobHierarchy(inputHierarchy);
  }, []);

  const getBlobTree = () => {
    const blobTree = {};

    // Create blob tree from hierarchy
    blobHierarchy.forEach(([blobId, parentId]) => {
      if (!blobTree[parentId]) blobTree[parentId] = { children: [] };
      blobTree[parentId].children.push(blobId);
    });

    return blobTree;
  };

  const renderBlob = (blobId, x, y) => {
    const blob = blobData.find(blob => blob.id === blobId);

    return (
      <div key={blobId} style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}>
        <img src={blob.images[0]} alt="Blob" className="blob-image" />
        {blobTree[blobId]?.children.map((childId, index) => (
          renderBlob(childId, x * 10, y + 30) // Adjust positioning as needed
        ))}
      </div>
    );
  };

  const blobTree = getBlobTree();

  return (
    <div className="App">
      <div className="background-container">
        <img src={backgroundImage} alt="Background" className="background-image" />
        {blobTree[null]?.children.map((blobId, index) => (
          renderBlob(blobId, 10, 10) // Adjust initial positioning as needed
        ))}
      </div>
    </div>
  );
}

export default App;


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