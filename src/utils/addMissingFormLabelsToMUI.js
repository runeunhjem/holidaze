// src/utils/AddMissingFormLabelsToMUI.js
import { useEffect } from "react";

const AddMissingFormLabelsToMUI = () => {
  useEffect(() => {
    const addMissingLabels = () => {
      const inputs = document.querySelectorAll('input[aria-hidden="true"]');

      inputs.forEach((input, index) => {
        if (!input.hasAttribute("aria-labelledby")) {
          const id = `hidden-input-label-${index}`;
          const label = document.createElement("label");
          label.setAttribute("id", id);
          label.setAttribute("for", input.id || id);
          label.style.display = "none";
          label.innerText = `Hidden input ${index + 1}`;
          input.parentNode.insertBefore(label, input);
          input.setAttribute("aria-labelledby", id);
        }
      });
    };

    addMissingLabels();
  }, []);

  return null;
};

export default AddMissingFormLabelsToMUI;
