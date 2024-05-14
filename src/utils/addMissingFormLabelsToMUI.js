import { useEffect } from "react";

const AddMissingFormLabelsToMUI = () => {
  useEffect(() => {
    const addMissingLabels = () => {
      const elements = document.querySelectorAll(
        'input[aria-hidden="true"], textarea[aria-hidden="true"]',
      );

      elements.forEach((element, index) => {
        if (!element.hasAttribute("aria-labelledby")) {
          const id = `hidden-element-label-${index}`;
          const label = document.createElement("label");
          label.setAttribute("id", id);
          label.setAttribute("for", element.id || id);
          label.style.display = "none";
          label.innerText = `Hidden element ${index + 1}`;
          element.parentNode.insertBefore(label, element);
          element.setAttribute("aria-labelledby", id);
        }
      });
    };

    addMissingLabels();
  }, []);

  return null;
};

export default AddMissingFormLabelsToMUI;
