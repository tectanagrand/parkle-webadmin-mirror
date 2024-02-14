import Image from "next/image";
import { TextField, Button, Avatar } from "@mui/material";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Components Styling</h1>
      <TextField label="Textfield" />
      <Avatar />
      <Button>Button</Button>
    </main>
  );
}
