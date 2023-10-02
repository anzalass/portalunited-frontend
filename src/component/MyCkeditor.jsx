import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
export default function MyCkeditor({ onChange }) {
  const [value, setValue] = useState("");
  //   const editorConfiguration = {
  //     toolbar: {
  //       items: [
  //         "undo",
  //         "redo",
  //         "|",
  //         "heading",
  //         "|",
  //         "fontfamily",
  //         "fontsize",
  //         "fontColor",
  //         "fontBackgroundColor",
  //         "|",
  //         "bold",
  //         "italic",
  //         "strikethrough",
  //         "subscript",
  //         "superscript",
  //         "code",
  //         "|",
  //         "link",
  //         "uploadImage",
  //         "blockQuote",
  //         "codeBlock",
  //         "|",
  //         "bulletedList",
  //         "numberedList",
  //         "todoList",
  //         "outdent",
  //         "indent",
  //       ],
  //       shouldNotGroupWhenFull: false,
  //     },
  //   };

  const editorStyle = {
    minHeight: "200px",
    border: "1px solid #ccc",
    padding: "10px",
    outerHeight: "100%",
  };

  return (
    <div className="h-[500px] w-full">
      <CKEditor
        editor={ClassicEditor}
        style={editorStyle}
        data={"<p>Hallo</p>"}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={onChange}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
}
