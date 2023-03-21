import { useRouter } from "next/router";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoArrowUndoSharp } from "react-icons/io5";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import useAxiosProtected from "../../hooks/useAxiosProtected";

import {
  DeleteProject,
  PublishAndUnpublishProject,
} from "../../features/Project/projectApi";
import { SelectUI, SetConfirmModal } from "../../features/UI/UISlice";
import {
  GetCurrentProject,
  SelectProject,
} from "../../features/Project/projectSlice";
import { GetCurrentBlog } from "../../features/Blog/BlogSlice";

import ConfirmModal from "../modal/ConfirmModal";

import classes from "./FloatingButtons.module.scss";
import {
  DeleteBlog,
  PublishAndUnpublishBlog,
} from "../../features/Blog/BlogApi";

interface IProps {
  itemID: string;
  isPublished: boolean;
  isDraft?: boolean;
}

const FloatingButtons: React.FC<IProps> = ({
  itemID, // this is a slug
  isPublished,
  isDraft,
}) => {
  const { pathname, push, back, replace } = useRouter();

  const dispatch = useAppDispatch();
  const { confirmModalIsOpen } = useAppSelector(SelectUI);
  const { draftProject, projectLoading } = useAppSelector(SelectProject);
  useAxiosProtected();

  const draftMode = isDraft && draftProject?._id;
  const editMode =
    pathname === "/projects/[slug]/edit" || pathname === "/blogs/[slug]/edit";
  const createMode =
    pathname === "/create-project" || pathname === "/create-blog";
  const deletePaths = ["/projects/[slug]", "/blogs/[slug]"];
  const removeEditAndPublishButton = draftMode || editMode || createMode;
  const showDeleteButton =
    editMode ||
    deletePaths.includes(pathname) ||
    (createMode && !!draftProject?._id);

  const HandleDelete = () => {
    if (pathname.startsWith("/projects/[slug]")) {
      dispatch(DeleteProject(itemID)).then(() => {
        replace("/projects");
      });
    } else if (pathname.startsWith("/blogs/[slug]")) {
      dispatch(DeleteBlog(itemID)).then(() => {
        replace("/blogs");
      });
    }
  };

  const CloseConfirmModal = () => {
    dispatch(SetConfirmModal(null));
  };

  const GetProjectToEdit = () => {
    if (pathname.startsWith("/projects/[slug]")) {
      dispatch(GetCurrentProject(itemID));
      push("/projects/" + itemID + "/edit");
    } else if (pathname.startsWith("/blogs/[slug]")) {
      dispatch(GetCurrentBlog(itemID));
      push("/blogs/" + itemID + "/edit");
    }
  };

  const HandlePublish = (itemID: string, isPublished: boolean) => {
    if (pathname.startsWith("/projects/[slug]")) {
      dispatch(
        PublishAndUnpublishProject({
          slug: itemID,
          isPublished,
        })
      );
    } else if (pathname.startsWith("/blogs/[slug]")) {
      dispatch(
        PublishAndUnpublishBlog({
          slug: itemID,
          isPublished,
        })
      );
    }
  };

  return (
    <div className={classes.Container}>
      {!removeEditAndPublishButton && <AiFillEdit onClick={GetProjectToEdit} />}
      <IoArrowUndoSharp onClick={() => back()} />
      {removeEditAndPublishButton ? null : !isPublished ? (
        <MdOutlinePublishedWithChanges
          onClick={() => HandlePublish(itemID, isPublished)}
        />
      ) : (
        <MdOutlineUnpublished
          onClick={() => HandlePublish(itemID, isPublished)}
        />
      )}
      {showDeleteButton && (
        <AiFillDelete
          className={classes.DeleteButton}
          onClick={() => dispatch(SetConfirmModal("DeleteProject"))}
        />
      )}
      {confirmModalIsOpen === "DeleteProject" && (
        <ConfirmModal
          isOpen={confirmModalIsOpen === "DeleteProject"}
          close={CloseConfirmModal}
          proceedWithAction={HandleDelete}
          loading={projectLoading === "delete-project"}
          closeButtonText={
            pathname.startsWith("/projects/[slug]")
              ? "Delete Project"
              : "Delete Blog"
          }
        />
      )}
      {confirmModalIsOpen === "PublishProject" && (
        <ConfirmModal
          isOpen={confirmModalIsOpen === "PublishProject"}
          close={CloseConfirmModal}
          loading={projectLoading === "publish"}
          proceedWithAction={HandlePublish}
          closeButtonText="Delete Project"
          message={
            isPublished
              ? "This project will no longer be visible to the public. Go ahead?"
              : "Do you REALLY want to publish this project?"
          }
        />
      )}
    </div>
  );
};

export default FloatingButtons;
