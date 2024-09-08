import Table from "./Table";
import InputField from "./InputField";

export default function ComponentsOverrides(theme: any) {
  return Object.assign(Table(theme), InputField(theme));
}
