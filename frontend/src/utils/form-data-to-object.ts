export function formDataToObject(formData: FormData) {
  const formObject: { [key: string]: string } = {};
  for (let [key, value] of formData.entries()) {
    formObject[key] = value as string;
  }
  return formObject;
}
