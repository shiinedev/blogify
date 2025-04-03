import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill-new';
import './quill.snow.css'
const QuillEditor = ({value,onChange,placeholder,className, height=400}) => {

    const quillRef = useRef();
    const [editorValue,setEditorValue] = useState(false);
    useEffect(()=>{
        setEditorValue(value);
    },[value]);

    const handleChange =useCallback((value) =>{
        setEditorValue(value);
        onChange(value);
    },[onChange])

    const formats= [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent', 'link', 'image', 'code-block', 'script'
    ];

    const modules ={
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    }
  return (
    <div className={className || ""} style={{ height: `${height}px` }}>
      <ReactQuill 
        ref={quillRef}
        value={editorValue}
        className={className || ""}
        placeholder={placeholder || "Enter Your Content Here...."}
        onChange={handleChange}
        formats={formats}
        modules={modules}
        style={{ height: `${height - 42}px` }}
      />
    </div>
  )
}

export default QuillEditor
