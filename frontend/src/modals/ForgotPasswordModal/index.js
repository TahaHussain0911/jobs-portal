import ModalSkeleton from "../../containers/ModalSkeleton";
import SendOtp from "./SendOtp";

const ForgotPasswordModal = ({ show, setShow }) => {
  const renderModal = () => {
    switch (show) {
      case "send-otp":
        return <SendOtp show={show} setShow={setShow} />;

      default:
        break;
    }
  };
  return <>{renderModal()}</>;
};

export default ForgotPasswordModal;
