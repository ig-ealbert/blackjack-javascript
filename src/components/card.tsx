'use client'
import { getImage, getText } from "@/lib/card";
import { cardProps } from "@/types/cardProps";
import React from "react";

export default function Card(props: cardProps) {
  const [image, setImage] = React.useState<string>(getImage(props));
  React.useEffect(() => setImage(getImage(props)), [props]);
  const [text, setText] = React.useState<string>("");
  React.useEffect(() => setText(getText(props)), [props]);

  return (
  <span className={"card"} style={{ backgroundImage: image }}>
    {text}
  </span>
  );
}
