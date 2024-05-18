// import React from 'react';

// const LaTeXImageExtractor = ({ data }) => {
//   // Regex pattern
//   const pattern = /\\img\s*\[([^\]]*)\]\{([^}]*)\}/;

//   // Extract matches
//   const match = data.match(pattern);

//   if (match) {
//     const attributesString = match[1]; // Captured attributes within square brackets
//     const url = match[2]; // Captured URL within curly braces

//     // Convert attributes string to an object
//     const attributes = attributesString.split(',').reduce((acc, attr) => {
//       const [key, value] = attr.split('=').map(s => s.trim());
//       acc[key] = value;
//       return acc;
//     }, {});
//     console.log("re-render",122)
//     return (
//       <img
//         src={url}
//         alt="Extracted"
//         style={{
//           width: attributes.width,
//           height: attributes.height,
//         }}
//       />
//     );
//   }

//   // Render nothing if no match is found
//   return null;
// };

// export default LaTeXImageExtractor;


import React, { useMemo } from 'react';

const LaTeXImageExtractor = ({ data }) => {
  // Use useMemo to memoize the result of the regex match and attribute parsing
  const { attributes, url } = useMemo(() => {
    // Regex pattern
    const pattern = /\\img\s*\[([^\]]*)\]\{([^}]*)\}/;

    // Extract matches
    const match = data.match(pattern);
    console.log("re-render",786)
    if (match) {
      const attributesString = match[1]; // Captured attributes within square brackets
      const url = match[2]; // Captured URL within curly braces

      // Convert attributes string to an object
      const attributes = attributesString.split(',').reduce((acc, attr) => {
        const [key, value] = attr.split('=').map(s => s.trim());
        acc[key] = value;
        return acc;
      }, {});

      return { attributes, url };
    }

    return { attributes: null, url: null };
  }, [data]);

  if (url) {
    return (
      <img
        src={url}
        alt="Extracted"
        style={{
          width: attributes.width,
          height: attributes.height,
        }}
      />
    );
  }

  // Render nothing if no match is found
  return null;
};

export default LaTeXImageExtractor;

