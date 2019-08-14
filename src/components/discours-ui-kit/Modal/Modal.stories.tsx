import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Modal from "./Modal";
import READMEMd from "./README.md";

const stories = storiesOf("discours-ui/Modal", module);

stories.addParameters({
  info: {
    text: READMEMd,
  },
});

stories.add("small", () => (
  <Modal size="small" buttonText={text("button", "Открыть")}>
    <div style={{ height: 300 }}>Модалочка</div>
  </Modal>
));

stories.add("medium", () => (
  <Modal size="medium" buttonText={text("button", "Открыть")}>
    <div style={{ height: 300 }}>Модалочка</div>
  </Modal>
));

stories.add("large", () => (
  <Modal size="large" buttonText={text("button", "Открыть")}>
    <div style={{ height: 300 }}>Модалочка</div>
  </Modal>
));