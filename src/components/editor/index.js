import {useEffect, useRef} from "react";
import ReactQuill from "react-quill";

import { toolbarOptions } from "./options";
import "react-quill/dist/quill.snow.css";
import "./style.css";

const Editor = ({ id }) => {
  const ref = useRef();

  useEffect(() => {
    const content = ref.current.getEditor().getContents();
    console.log("contnt-->", content)

  }, []);




  const handleChange = (content, delta, source, editor) => {
    if (source === "user") {
      console.log("delta==", delta)
      const cont = ref.current.getEditor().getContents();
      console.log("cont-->", cont)
      console.log("contnt-->", content)
      /**
       * TODO: Emit Change
       */
    }
  };

  return (
    <ReactQuill
      ref={ref}
      theme="snow"
      defaultValue={""}
      onChange={handleChange}
      placeholder="Write something here"
      modules={{ toolbar: toolbarOptions }}
    />
  );
};
export default Editor;
