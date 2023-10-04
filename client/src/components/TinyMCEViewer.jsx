import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCEViewer(props) {
    return (
        <>
          <Editor
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            initialValue={props.initialContent}
            init={{
              height: 600,
              menubar: false,
              plugins: '',
              toolbar: '',
              statusbar: false,
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            disabled
          />
        </>
      );
    }