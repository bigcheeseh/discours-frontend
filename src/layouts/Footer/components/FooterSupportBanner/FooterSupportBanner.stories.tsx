import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router";
import FooterSupportBanner from "./FooterSupportBanner";
import READMEMd from "./README.md";

const stories = storiesOf("modules/Footer/FooterSupportBanner", module);

stories.addParameters({
  info: {
    text: READMEMd,
  },
});

stories.add("default", () => (
  <MemoryRouter>
    <FooterSupportBanner />
  </MemoryRouter>
));