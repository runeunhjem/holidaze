export const setTitleAndMeta = (title, description) => {
  document.title = title;
  let metaDescription = document.querySelector("meta[name='description']");
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.getElementsByTagName("head")[0].appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", description);
};
