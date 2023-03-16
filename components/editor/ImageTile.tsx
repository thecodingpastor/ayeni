import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillCloseCircle } from "react-icons/ai";
import { SingleImageType } from "../../features/Project/type";

import ConfirmModal from "../modal/ConfirmModal";

import classes from "./ImageTile.module.scss";
import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import { AddAlertMessage } from "../../features/UI/UISlice";
import { DeleteImageFromCloud } from "../../features/Project/projectApi";
import { SelectProject } from "../../features/Project/projectSlice";

const ImageTile: React.FC<{
  setImages: React.Dispatch<any>;
  setValue: React.Dispatch<any>;
  Images: SingleImageType[];
  isEdit: boolean;
  setFileNames?: React.Dispatch<any>;
  onClick: any;
}> = ({ setImages, Images, isEdit, setValue, setFileNames, onClick }) => {
  const dispatch = useAppDispatch();
  const [ShowConfirm, setShowConfirm] = useState("");
  const { projectLoading } = useAppSelector(SelectProject);
  const { query } = useRouter();

  const DeleteImage = () => {
    if (Images.length < 3)
      return dispatch(
        AddAlertMessage({
          message:
            "Project images must be at least 2. If you wish to change an image, add it first before deleting the unwanted image.",
        })
      );
    dispatch(
      DeleteImageFromCloud({
        imageCloudId: ShowConfirm,
        projectSlug: query?.slug as string,
      })
    ).then(() => {
      // to remove the deleted image from the frontend
      setImages((prev: SingleImageType[]) => {
        return prev.filter((img) => img.public_id !== ShowConfirm);
      });
      setShowConfirm("");
    });
  };

  const clear = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    obj: { identifier: string; isNew: boolean }
  ) => {
    e.stopPropagation();
    const { isNew, identifier } = obj;

    if (!isNew) return setShowConfirm(identifier);

    setImages((prev: SingleImageType[]) => {
      return prev.filter((img) => img.name !== identifier);
    });
    // if (isEdit) return setShowConfirm(identifier);

    // setImages((prev: SingleImageType[]) => {
    //   return prev.filter((img) => {
    //     if (img.name) {
    //       // For newly uploaded files
    //       return img.name !== identifier;
    //     } else {
    //       // console.log("in here");

    //       // setShowConfirm(identifier);
    //       // return img;
    //       return img.public_id !== identifier;
    //     }
    //   });
    // });

    if (!isEdit) {
      setValue((prev: any) => {
        return {
          ...prev,
          images: prev.images.filter((img: any) => img.name !== identifier),
        };
      });
    }
    setFileNames((prev: string[]) => {
      return prev.filter((fileName) => fileName !== identifier);
    });
  };

  return (
    <div className={classes.Container} onClick={onClick}>
      {Images.map((img, i) => (
        <div key={i} className={classes.ImgDiv}>
          <AiFillCloseCircle
            onClick={(e) => {
              return clear(
                e,
                img.name
                  ? { identifier: img.name, isNew: true }
                  : { identifier: img.public_id, isNew: false }
              );
              // return clear(e, img.name || img.public_id);
            }}
          />
          <Image
            src={img?.url?.toString() || img?.secure_url}
            alt="Picked Image"
            width="100"
            height="120"
          />
        </div>
      ))}
      <ConfirmModal
        close={() => setShowConfirm("")}
        isOpen={!!ShowConfirm}
        loading={projectLoading === "delete-image-from-cloud"}
        proceedWithAction={DeleteImage}
        closeButtonText="Remove Image ? "
      />
    </div>
  );
};

export default ImageTile;
