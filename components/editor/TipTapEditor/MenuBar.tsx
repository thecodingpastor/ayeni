import { useCallback } from "react";

import {
  BiUndo,
  BiRedo,
  BiBold,
  BiItalic,
  BiUnderline,
  BiStrikethrough,
  BiCodeCurly,
} from "react-icons/bi";

import {
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
  AiOutlineEnter,
} from "react-icons/ai";

import {
  BsJustify,
  BsImages,
  BsBlockquoteLeft,
  BsCodeSlash,
  BsParagraph,
} from "react-icons/bs";

import { VscHorizontalRule } from "react-icons/vsc";
import { MdSubscript, MdSuperscript } from "react-icons/md";

import classes from "./MenuBar.module.scss";

const MenuBar = ({ editor }: any) => {
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  // I removed the useCallback hook with editor as dep to remove the errors
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <section className={classes.MenuBarContainer}>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        title="Undo"
      >
        <BiUndo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        title="Redo"
      >
        <BiRedo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? classes.IsActive : ""}
        title="Bold"
      >
        <BiBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? classes.IsActive : ""}
        title="Italic"
      >
        <BiItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? classes.IsActive : ""}
        title="Underline"
      >
        <BiUnderline />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? classes.IsActive : ""}
        title="Strike-through"
      >
        <BiStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? classes.IsActive : ""
        }
        title="Align Left"
      >
        <AiOutlineAlignLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? classes.IsActive : ""
        }
        title="Align Centre"
      >
        <AiOutlineAlignCenter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" }) ? classes.IsActive : ""
        }
        title="Align Right"
      >
        <AiOutlineAlignRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" }) ? classes.IsActive : ""
        }
        title="Justify"
      >
        <BsJustify />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive("subscript") ? classes.IsActive : ""}
        title="Toggle Subscript"
      >
        <MdSubscript />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive("superscript") ? classes.IsActive : ""}
        title="Toggle Superscript"
      >
        <MdSuperscript />
      </button>

      <button
        type="button"
        onClick={setLink}
        className={editor.isActive("link") ? classes.IsActive : ""}
        title="Set Link"
      >
        setLink
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        title="Unset Link"
      >
        unsetLink
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? classes.IsActive : ""
        }
        title="Heading One"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? classes.IsActive : ""
        }
        title="Heading Two"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? classes.IsActive : ""
        }
        title="Heading Three"
      >
        H3
      </button>

      <button type="button" onClick={addImage} title="Image URL">
        <BsImages />
      </button>

      {/* <button onClick={addYoutubeVideo} title="Add YouTube URL">
        <BsYoutube />
      </button> */}

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? classes.IsActive : ""}
        title="Code"
      >
        <BsCodeSlash />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? classes.IsActive : ""}
        title="Code Block"
      >
        <BiCodeCurly />
      </button>
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? classes.IsActive : ""}
        title="Paragraph"
      >
        <BsParagraph />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? classes.IsActive : ""}
        title="Unordered List"
      >
        <AiOutlineUnorderedList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? classes.IsActive : ""}
        title="Ordered List"
      >
        <AiOutlineOrderedList />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? classes.IsActive : ""}
        title="Block Quote"
      >
        <BsBlockquoteLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <VscHorizontalRule />
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        title="Hard Break"
      >
        <AiOutlineEnter />
      </button>
    </section>
  );
};

export default MenuBar;
