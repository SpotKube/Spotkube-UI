import React, { useState } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

export default function SurveyPage({moduleVal, txtvalue, txtsetValue}) {
  const onDescriptionChange = async (content, delta, source, editor) => {
    // console.log(editor.getContents())
    // console.log(content)
    // console.log(txtvalue)
    // console.log(delta)
    // console.log(source)
    txtsetValue(content)
  }

  const modules = {
    toolbar: {
        container: [
            [{ 'header': [1,2,3,4,5,6,false] }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            // ['link', 'image', 'video'],
            // ['clean'],
            // [{ 'align': [] }],
        ],
        // handlers: {
        //   image : imageHandler
        // }
    },
  }

  return <ReactQuill  theme="snow" value={txtvalue} onChange={(content, delta, source, editor) => onDescriptionChange(content, delta, source, editor)} modules={moduleVal}/>;
}