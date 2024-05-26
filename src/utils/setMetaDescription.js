export function setMetaDescription(description) {
  let metaDescription = document.querySelector("meta[name='description']");
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    metaDescription.setAttribute("content", description);
    document.getElementsByTagName("head")[0].appendChild(metaDescription);
  }
}
