import Modal from "./Modal";

import { useAppDispatch } from "../../fetchConfig/store";
import { SetConfirmModal } from "../../features/UI/UISlice";

import classes from "./ConfirmModal.module.scss";
import Spin from "../loaders/Spin";

interface IProps {
  isOpen: boolean;
  message?: string;
  closeButtonText?: string;
  close: () => void;
  proceedWithAction: Function;
  loading: boolean;
}
const ConfirmModal: React.FC<IProps> = ({
  isOpen,
  close,
  closeButtonText = "Delete",
  message = "Are you sure you want to proceed with this action?",
  proceedWithAction,
  loading,
}) => {
  const dispatch = useAppDispatch();

  const action = () => {
    proceedWithAction();
    dispatch(SetConfirmModal(null));
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={classes.Container}>
        <p>{message}</p>
        <span onClick={action}>
          {loading ? <Spin white /> : closeButtonText}
        </span>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
