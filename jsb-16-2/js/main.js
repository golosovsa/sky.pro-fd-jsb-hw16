document.addEventListener("DOMContentLoaded", () => {
    const pageQueryParams = new URLSearchParams(window.location.search);
    const postID = Number(pageQueryParams.get("id"));

    document.dao.init().then(result => {
        if (result.status !== "ok") {
            const popup = new Popup(
                document.body, 
                `(${result.code}) ${result.text}`, 
                {left: "0", bottom: "200px", },
                3000,
            );
            console.error("DAO read error", this.data, result);
            return;
        }
        const pages = new Pages(document.body, postID);
    });
});