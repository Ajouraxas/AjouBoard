import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ShowEditor = ({ prevEditorState }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    setEditorState(prevEditorState);
  }, [prevEditorState]);
  return (
    <Editor
      toolbarHidden={true}
      readOnly={true}
      editorState={editorState}
      wrapperStyle={{ overflowX: "hidden" }}
      editorStyle={{ overflowX: "hidden" }}
    />
  );
};

export default ShowEditor;
