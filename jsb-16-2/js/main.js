document.addEventListener("DOMContentLoaded", () => {
    const pageQueryParams = new URLSearchParams(window.location.search);
    const postID = Number(pageQueryParams.get("id"));

    const pages = new Pages(document.body, postID);
});