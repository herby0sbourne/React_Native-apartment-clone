interface CaptionStatus {
  caption?: string;
  status: "basic" | "danger";
}

interface InputTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type InputKeys = keyof InputTypes;

export const captionStatus = (touched, errors, inputName: InputKeys): CaptionStatus => ({
  caption: touched[inputName] && errors[inputName] ? errors[inputName] : undefined,
  status: touched[inputName] && errors[inputName] ? "danger" : "basic",
});
