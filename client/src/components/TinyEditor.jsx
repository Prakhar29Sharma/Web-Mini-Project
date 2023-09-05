import { Editor } from '@tinymce/tinymce-react';
// import { Button } from 'bootstrap';
//import "@tinymce/tinymce-react/dist/skins/content/default/content.min.css";
import { useRef } from "react";
// import dotenv from "dotenv";
// dotenv.config()

export default function TinyEditor(props) {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        // console.log(editorRef.current.getContent());
        props.fetchContent(editorRef.current.getContent());
      }
    };
    

    return (
        <>
          <Editor
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue='<p>This is the initial content of the editor.</p>'
            init={{
              height: 600,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          {/* <button onClick={log}>Save</button> */}
          <div className="row mb-3">
            <div className="col-sm-10">
              <br />
              <button type="submit" onClick={log} className="btn btn-primary">Save as a draft</button>
            </div>
          </div>
        </>
      );
    }


