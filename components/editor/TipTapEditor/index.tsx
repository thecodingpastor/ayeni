import { useRef } from "react";
import { useRouter } from "next/router";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import MenuBar from "./MenuBar";

import classes from "./TipTapEditor.module.scss";

const Tiptap = ({ setState, MainContent, setValue }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Subscript,
      Superscript,
      Image.configure({
        // allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "EditorImages", // This can be styled in base.scss
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: MainContent,
    onUpdate: ({ editor }) => {
      setState(editor.getHTML());
      setValue((prev: any) => {
        return { ...prev, mainContent: editor.getHTML() };
      });
    },
  });

  return (
    <div className={classes.TipTapContainer}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={classes.EditorContainer} />
    </div>
  );
};

export default Tiptap;
