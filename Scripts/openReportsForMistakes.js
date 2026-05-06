
 document.getElementById("numberedListMistakes").addEventListener("click", () => {
    const loremIpsum =
`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

    const url = "csv_viewer.html?data=" + encodeURIComponent(loremIpsum);
    window.open(url, "_blank", "noopener");
  });