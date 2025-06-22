import React, { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";
import Template from "./component/Template";
interface RichTextEditorProps {
  setContent: React.Dispatch<React.SetStateAction<string | null>>;
  setFormData: React.Dispatch<React.SetStateAction<[]>>;
  name: string | null;
  content: string | null;
  csrfToken : string | null;
  path : string | '',
}
export default function RichTextEditor({
  setContent,
  content,
  setFormData,
  name,
  csrfToken,
  path,
}: RichTextEditorProps) {
 
  const editor = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const options = [
    { name: "home", label: "Coupon Template with Code" },
    { name: "table-of-content", label: "[BASE TEMPLATE] Table of Content" },
    { name: "store", label: "Stores" },
    { name: "category", label: "Categories" },
  ];
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      height: "450px",
      uploader: {
        insertImageAsBase64URI: true,
        url: "/store/editorImage?path=" + path,
        format: "json",
        method: "POST",
        data:{
          '_token' : csrfToken
        },
        filesVariableName: function () {
          return 'image';
        },
        withCredentials: false,
      },
      style: {
        textAlign: "left", // This will be applied inline
      },

      extraButtons: [
        {
          name: "Add Templates", // Button name (used in `buttons` list)
          icon: "symbols",
          exec: () => {
            setShowModal(true);
          },
          tooltip: "Select Templates",
          mode: JoditEditor.MODE_WYSIWYG,
          className:
            "bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600", // <- Tailwind classes
        },
      ],
      image: {
        upload: true,
        browse: true,
      },
    }),
    []
  );
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          setFormData((prevData) => ({
            ...prevData,
            [name]: newContent,
          }));
        }}
      />
      {showModal ? (
        <div className="fixed top-0 inset-0 z-50 flex p-3 bg-transparent justify-center overflow-y-auto">
          <div className="relative w-full text-center  mx-auto bg-white border-2  border-gray-300  rounded-lg shadow-lg p-4 z-50">
            <h2 className="text-2xl font-semibold mb-4">Select Template</h2>
            <Select
              options={options}
              onChange={(val) => {
                setSelectedOption(val.label);
              }}
              isOptionSelected={(val) => {
                val.label;
              }}
              className="mt-2 mb-3 text-start"
              placeholder="Select Template ...!"
            />

            <div className="border-2 border-gray-300 flex-1 overflow-y-scroll overflow-x-hidden h-[80%]">
              <Template
                selectedOption={selectedOption}
                setSelectedTemplate={setSelectedTemplate}
              />
            </div>
            <div className="flex items-end justify-end p-3 gap-2">
              {/* Cancel Selection */}
              <button
                type="button"
                className="bg-gray-300 py-2 cursor-pointer px-4  hover:bg-gray-500  hover:shadow-gray-500 hover:text-white rounded shadow text-dark"
                onClick={() => {
                  setShowModal(false);
                  setSelectedOption([]);
                }}
              >
                Cancel
              </button>
              {/* Select The template */}
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setContent(selectedTemplate);
                  setSelectedOption([]);
                }}
                className="outline-2 outline-purple-500 text-purple-500 hover:bg-purple-500 hover:shadow-purple-500 shadow cursor-pointer hover:text-white  py-2 px-4 rounded text-dark "
              >
                Add Template
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
