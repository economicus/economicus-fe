import ModalWithButton from "../../../../components/ModalWithButton/ModalWithButton";
import TmpForm from "../../../../components/TmpForm/TmpForm";
import { IBusinessArea } from "../../QuantLabPage";
import { CheckboxWithSliderInfo } from "../ModelCreation";

interface QuantLabModalProps {
  btnName: string;
  state:
    | IBusinessArea
    | {
        PER: CheckboxWithSliderInfo;
        PBR: CheckboxWithSliderInfo;
      };
  setState: React.Dispatch<React.SetStateAction<any>>;
  children: React.ReactNode;
}

export default function QuantLabModal({
  btnName,
  state,
  setState,
  children,
}: QuantLabModalProps) {
  return (
    <ModalWithButton btnName={btnName} state={state} setState={setState}>
      <TmpForm>{children}</TmpForm>
    </ModalWithButton>
  );
}

// NOTE: ModalWithButton과 TmpForm(임시)를 결합한 재사용 가능 컴포넌트
