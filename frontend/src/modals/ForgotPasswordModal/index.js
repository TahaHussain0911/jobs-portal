import ModalSkeleton from "../../containers/ModalSkeleton";
import { ResetPassState } from "../../context/ResetPassContext";
import ResetPassword from "./ResetPassword";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";

const ForgotPasswordModal = ({ show, setShow }) => {
  const renderModal = () => {
    switch (show) {
      case "send-otp":
        return <SendOtp show={show} setShow={setShow} />;
      case "verify-otp":
        return <VerifyOtp show={show} setShow={setShow} />;
      case "reset-password":
        return <ResetPassword show={show} setShow={setShow} />;
      default:
        break;
    }
  };
  return (
    <>
      <ResetPassState>{renderModal()}</ResetPassState>
    </>
  );
};

export default ForgotPasswordModal;
