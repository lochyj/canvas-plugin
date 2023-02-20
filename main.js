// I am sorry for this terrible affront to programmers, and i am sorry that you had to look at this... But it works and I don't want to change it.
console.log("Canvas plugin loaded successfully");


if (window.location.href.split("/")[3] == "courses") classesFormat();

generalFormat();

function generalFormat() {

    var accountSidebarButton = document.getElementById("global_nav_profile_link");
    var accountSidebarIcon = accountSidebarButton.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("img")[0];

    accountSidebarIcon.src = chrome.runtime.getURL('icon.svg');

}

function classesFormat() {
    var course_syllabus = document.getElementById("course_syllabus");
    var quick_access_links = course_syllabus.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
    var table_rows = quick_access_links.getElementsByTagName("tr");

    var links = [];
    var text = [];

    for (let i = 0; i < table_rows.length; i++) {

        for (let j = 0; j < table_rows[i].getElementsByTagName("td").length; j++) {

            if (table_rows[i].getElementsByTagName("td")[j].children[0].tagName == "H3") {

                if (table_rows[i].getElementsByTagName("td")[j].getElementsByTagName("h3")[0].children[0].tagName == "A") {

                    var temp = table_rows[i].getElementsByTagName("td")[j].getElementsByTagName("h3")[0].getElementsByTagName("a")[0];

                    links.push(temp.href);
                    text.push(temp.innerText);

                }

            }

        }

    }

    course_syllabus.removeChild(course_syllabus.getElementsByTagName("table")[0]);

    course_syllabus.removeChild(course_syllabus.getElementsByTagName("h2")[2]);
    course_syllabus.removeChild(course_syllabus.getElementsByTagName("p")[3]);

    // Create a div element with a series of divs inside that that contain the links with the text of the text array
    if (links.length != 0) {
        var LinksContainer = document.createElement("div");
        LinksContainer.className = "links-container";

        var LinksTitle = document.createElement("h2");
        LinksTitle.style.textAlign = "left"
        LinksTitle.innerText = "Quick Links:";
        LinksTitle.style.fontWeight = "bolder";

        LinksContainer.appendChild(LinksTitle);

        for (let i = 0; i < text.length; i++) {
            if (text[i] == "") {
                continue;
            }
            var container = document.createElement("div");
            var linkEl = document.createElement("a");

            container.appendChild(linkEl);

            linkEl.innerText = text[i];
            linkEl.href = links[i];
            LinksContainer.appendChild(container);
        }

        course_syllabus.appendChild(LinksContainer);
    }
}



