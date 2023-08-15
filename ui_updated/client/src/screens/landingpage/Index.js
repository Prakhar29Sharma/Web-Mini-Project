import React from "react";
import L_cards from "./L_cards";
import L_footer from "./L_footer";
import Carousel from "./Carousel";

export default function Index() {
  return (
    <div>
      <Carousel />

      <L_cards></L_cards>
      <L_footer></L_footer>
    </div>
  );
}
