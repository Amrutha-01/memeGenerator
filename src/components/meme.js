// import React, { useState, useRef, useEffect } from "react";
// import html2canvas from "html2canvas";

// function Meme() {
//   const [change, setChange] = useState({
//     topText: "",
//     bottomText: "",
//     randImg:
//       "https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg",
//   });
//   const [allMemes, setAllMeme] = useState();
//   const memeDivRef = useRef(null);

//   useEffect(() => {
//     fetch("https://api.imgflip.com/get_memes")
//       .then((res) => res.json())
//       .then((data) => setAllMeme(data.data.memes));
//   }, []);

//   function handleChange(event) {
//     // console.log(event.target.name);
//     setChange((prev) => {
//       return {
//         ...prev,
//         [event.target.name]: event.target.value,
//       };
//     });
//   }

//   function getMemeImage() {
//     let randNum = Math.floor(Math.random() * allMemes.length);
//     let url = allMemes[randNum].url;
//     setChange((prev) => ({
//       ...prev,
//       randImg: url,
//     }));
//   }

//   const handleDownload = () => {
//     html2canvas(memeDivRef.current).then((canvas) => {
//       const link = document.createElement("a");
//       link.download = "meme.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     });
//   };

//   return (
//     <div id="memeDiv">
//       <div id="textDiv">
//         <input
//           type="text"
//           placeholder="Top Text"
//           className="textBox"
//           onChange={handleChange}
//           value={change.topText}
//           name="topText"
//         />
//         <input
//           type="text"
//           placeholder="Bottom Text"
//           className="textBox"
//           value={change.bottomText}
//           name="bottomText"
//           onChange={handleChange}
//         />
//       </div>
//       <button id="buttonEl" onClick={getMemeImage}>
//         Generate New Meme Image
//       </button>
//       <div className="meme" ref={memeDivRef}>
//         <img src={change.randImg} id="image" />
//         <h1 className="top">{change.topText}</h1>
//         <h1 className="bottom">{change.bottomText}</h1>
//       </div>
//       <button id="downloadButton" onClick={handleDownload}>
//         Download Meme
//       </button>
//     </div>
//   );
// }

// export default Meme;


import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

function Meme() {
  const [change, setChange] = useState({
    topText: "",
    bottomText: "",
    randImg:
      "https://img.freepik.com/free-photo/background_53876-32170.jpg?size=626&ext=jpg",
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const memeRef = useRef(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const randNum = Math.floor(Math.random() * data.data.memes.length);
          const url = data.data.memes[randNum].url;
          setChange((prev) => ({
            ...prev,
            randImg: url,
          }));
        } else {
          console.error("Error fetching memes:", data.error_message);
        }
      })
      .catch((error) => console.error("Error fetching memes:", error));
  }, []);

  const handleChange = (event) => {
    setChange((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getMemeImage = () => {
    if (!imageLoaded) {
      console.error("Image is not loaded yet.");
      return;
    }

    html2canvas(memeRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div id="memeDiv">
      <div id="textDiv">
        <input
          type="text"
          placeholder="Top Text"
          className="textBox"
          onChange={handleChange}
          value={change.topText}
          name="topText"
        />
        <input
          type="text"
          placeholder="Bottom Text"
          className="textBox"
          value={change.bottomText}
          name="bottomText"
          onChange={handleChange}
        />
      </div>
      <button id="buttonEl" onClick={getMemeImage}>
        Generate New Meme Image
      </button>
      <div className="meme" ref={memeRef}>
        <img
          src={change.randImg}
          id="image"
          alt="meme"
          onLoad={handleImageLoad}
        />
        <h1 className="top">{change.topText}</h1>
        <h1 className="bottom">{change.bottomText}</h1>
      </div>
    </div>
  );
}

export default Meme;

