import React, { useRef, useState } from "react";

const Picture = ({ readablePicture, setPicture, setReadablePicture }) => {
  const inputRef = useRef();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let pic = e.target.files[0];

    if (
      pic.type !== "image/png" &&
      pic.type !== "image/jpeg" &&
      pic.type !== "image/webp"
    ) {
      setError(`${pic.name} formated is not supported`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, maximum 5mb allowed`);
      return;
    } else {
      setError("");
      setPicture(pic);
      // reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };

  const handleChangePic = () => {
    setPicture("");
    setReadablePicture("");
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="picturae"
            className="w-20 h-20 rounded-full object-cover"
          />
          {/* remove pic */}
          <div
            className="mt-2 w-20 py-1 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
            onClick={handleChangePic}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload Picture
        </div>
      )}

      <input
        type="file"
        name="picture"
        id="picture"
        ref={inputRef}
        hidden
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
      />
      {/* error */}
      <div className="mt-2">
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );
};

export default Picture;
