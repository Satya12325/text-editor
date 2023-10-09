import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const [display,setDisplay] = useState("none")
  const inputRef = useRef(null);
  const editorRef = useRef(null);

const handleToggle = () => {
    display === "none" ? setDisplay("block") : setDisplay("none")
}
  const handleEditorChange = (content, editor) => {

    setEditorContent(content);
    console.log(content, editor);
};
  const handleCustomButtonClick = () => {
    // Custom button click logic here
    // alert('Custom button clicked!');
    // handleToggle();
    display === "none" ? setDisplay("block") : setDisplay("none")


  };
  const handleDropDownChange = (event) => {
    const selectedValue = event.target.value;
    // Handle the selected drop-down option here
    alert(`Selected option: ${selectedValue}`);
  };

const arr = ["aaaa", "baaa", "caaaa", "daaaaa", "Satya", "f"]

const handleAdd = (item) => {
    const editor = window.tinymce.get('my-editor');
    const boldHighlightedText = `<strong style="color: blue;" className="highlighted"><span className="highlighted"> ${item}</span></strong>`;

    // for(let i = 0; i < arr.length; i++) {

    //     if (item === arr[i]) {
    //         editor.formatter.apply('bold', { value: 'true' });
    //   editor.formatter.apply('forecolor', { value: 'red' });
    //       editor.insertContent(" "+item);

    //     }
    // }

    // Insert the formatted text at the current cursor position
    editor.insertContent(boldHighlightedText);
    display === "none" ? setDisplay("block") : setDisplay("none")
    editor.execCommand('mceApplyClass', false, 'blue-text');

}

// useEffect(() => {
//     const editorInstance = window.tinymce.get('my-editor');

//     if (editorInstance) {
//       editorInstance.on('keydown', (e) => {
//         if (e.keyCode === 8 || e.keyCode === 46) {
//             const selectedContent = editorInstance.selection.getContent({ format: 'text' }).trim();
//             for(let i = 0; i < arr.length; i++) {

//                 if (selectedContent === arr[i]) {
//                   editorInstance.selection.setContent(''); // Delete the entire word
//                   e.preventDefault(); // Prevent the default backspace behavior
//                 }
//             }
//           }
        
//       });
//     }
//   }, []);

// useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.keyCode === 8 || e.keyCode === 46) {
//         const selectedContent = editor.selection.getContent({ format: 'text' }).trim();
//         for(let i = 0; i < arr.length; i++) {

//                             if (selectedContent === arr[i]) {
//                                 editor.selection.setContent('');// Delete the entire word
//                               e.preventDefault(); // Prevent the default backspace behavior
//                             }
//                         }
                      
//       }
//     };

//     const editor = window.tinymce.get('my-editor');
//     if (editor) {
//       editor.on('keydown', handleKeyDown);
//     }

//     return () => {
//       // Remove the keydown event listener when the component unmounts
//       if (editor) {
//         editor.off('keydown', handleKeyDown);
//       }
//     };
//   }, []);
 
  const handleKeyDown = (e) => {
    if (editorRef.current && editorRef.current.editor) {
        const editorInstance = editorRef.current.editor;
        console.log(e.keyCode,"keydown")
        // Check if the backspace key (8) on Windows or the delete key (46) on Mac is pressed
        if ((e.keyCode === 8 && !e.metaKey && !e.ctrlKey) || e.keyCode === 46) {
          // Check if "Satya" is selected
          const selectedContent = editorInstance.selection.getContent({ format: 'text' }).trim();
          if (selectedContent === 'Satya') {
            // Delete the entire word
            editorInstance.selection.setContent('');
            e.preventDefault(); // Prevent the default behavior
          }
        }
      }
  };

  useEffect(() => {
    console.log("Press")
    const editorInstance = editorRef.current && editorRef.current.editor;

    if (editorInstance) {
      // Attach the keydown event listener
      editorInstance.on('keydown', handleKeyDown);

      return () => {
        // Remove the keydown event listener when the component unmounts
        editorInstance.off('keydown', handleKeyDown);
      };
    }
  }, []);

  const handleKeyUp = (e, editor) => {
    console.log(e)
    // Check if the backspace key (8) on Windows or the delete key (46) on Mac is released
    if (e.key='Backspace') {
      // Check if "Satya" is selected
      console.log(editor)
//       var html = e.target.innerHTML; 
// var div = document.createElement("div"); 
// div.innerHTML = html; 
// var text = div.textContent || div.innerText || ""; 
console.log(e.target.innerText.split(" "))
let str = e.target.innerText.split(" ")
console.log(str[str.length-1])
    //   const selectedContent = editor.selection.getContent({ format: 'text' }).trim();
    //   console.log(selectedContent)
    //   if (selectedContent === 'Satya') {
    //     // Delete the entire word
    //     editor.selection.setContent('');
    //   }

    
        for(let i=0;i<arr.length;i++) {
            if (arr[i][arr[i].length-2] === str[str.length-1]){
                console.log("found")
                        editor.selection.setContent('');

            }
        }

    }
  };
  return (
    <>
    <button onClick={handleCustomButtonClick}>Select Options</button>
    <Editor
      apiKey="b9aos42rxpgkpxmjsa2s7t6nieaa9mgex0g9c89l7matcnie"
      value={editorContent}
      onEditorChange={handleEditorChange}
      onInit={(editor) => {
        // Store a reference to the editor instance
        editorRef.current = editor;
      }}
      init={{
        height: 500,
        menubar: false,
        plugins: 'wordcount',
        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | wordcount customButton',
        // setup: (editor) => {
            
        //   editor.ui.registry.addButton('customButton', {
        //     text: 'Select Option',
        //     onAction: () => {
        //         display === "none" ? setDisplay("block") : setDisplay("none")

        //       handleCustomButtonClick();
        //     },
        //   });
        // },
        content_css: '../App.css', // Replace with the actual path to your CSS file

      }}
      onKeyUp={(e, editor) => handleKeyUp(e, editor)}

      id="my-editor"
    />
    <div className='option-container'
    style={{display:display}}
    >
        {
            arr.map((item, index) => <li key={index} onClick={()=>handleAdd(item)}>{item}</li>)
        }
    </div>
    </>
  );
};

export default TextEditor;

