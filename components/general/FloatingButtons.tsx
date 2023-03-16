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

import ConfirmModal from "../modal/ConfirmModal";

import classes from "./FloatingButtons.module.scss";

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
  const { pathname, push, back } = useRouter();

  const dispatch = useAppDispatch();
  const { confirmModalIsOpen } = useAppSelector(SelectUI);
  const { draftProject } = useAppSelector(SelectProject);
  useAxiosProtected();

  const draftMode = isDraft && draftProject?._id;
  const editMode = pathname === "/projects/[slug]/edit";
  const createMode = pathname === "/create-project";
  const removeEditAndPublishButton = draftMode || editMode || createMode;
  const showDeleteButton =
    editMode ||
    pathname === "/projects/[slug]" ||
    (createMode && !!draftProject?._id);

  const HandleDelete = () => {
    dispatch(DeleteProject(itemID)).then(() => {
      push("/projects");
    });
  };

  const CloseConfirmModal = () => {
    dispatch(SetConfirmModal(null));
  };

  const GetProjectToEdit = () => {
    dispatch(GetCurrentProject(itemID));
    push("/projects/" + itemID + "/edit");
  };

  const HandlePublish = (itemID: string, isPublished: boolean) => {
    dispatch(
      PublishAndUnpublishProject({
        slug: itemID,
        isPublished,
      })
    );
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
          closeButtonText={
            isDraft && pathname === "/create-project"
              ? "Delete Draft"
              : "Delete Project"
          }
        />
      )}
      {confirmModalIsOpen === "PublishProject" && (
        <ConfirmModal
          isOpen={confirmModalIsOpen === "PublishProject"}
          close={CloseConfirmModal}
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
