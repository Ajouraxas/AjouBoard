import React from 'react';
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MyEditor = () => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  }
  return (
    <>
      <Editor
        editorStyle={{ 
          width: "920px",
          height: "700px",
          border: "#d3ddec 1px solid",
          borderRadius: "5px"
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
          inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
          },
          blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote']
          },
          list: { inDropdown: true },
          textAlign: { inDropdown: false },
          link: { inDropdown: false },
          history: { inDropdown: false },
        }}/>
        </>
    );
}

export default MyEditor;