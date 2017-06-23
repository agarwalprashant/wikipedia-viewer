'use strict';

const baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search';

$(document).ready(function () {
    $("#title").velocity("transition.flipYIn", {delay: 500, duration: 1500, visibility: "visible"});
    $("#search-item").velocity("transition.flipYIn", {delay: 500, duration: 1500, visibility: "visible"});
    $("#or").velocity("transition.flipYIn", {delay: 500, duration: 1500, visibility: "visible"});
    $("#random-btn").velocity("transition.flipYIn", {delay: 500, duration: 1500, visibility: "visible"});
    $("#search-btn").click(function (e) {
        e.preventDefault();
        var valToSearch = $('#search-term').val();
        if (valToSearch !== '') {
            if ($("#list")) {
                $("#list").remove(); 
            }
            var apiUrl = baseUrl + '&srsearch=' + valToSearch + '&format=json';
            $.ajax({
                url: apiUrl,
                dataType: 'jsonp'
            }).done(function (data) {
                console.log(data);
                $("#title").remove();
                $("#or").remove();
                $("#random-article").remove();

                var newContainer = '<div id="list" class="container">\
                                    </div>';
                var infoCard = '<div class="row info-card">\
                                    <div class="col-sm-2 text-center">\
                                        <img id="wiki-logo" src="img/1498153832_Wikipedia_alt_2.png" class="img-responsive">\
                                    </div>\
                                    <div class="col-sm-10">\
                                        <div class="row">\
                                            <div class="col-sm-12 text-left">\
                                                <a class="wiki-link" href="#" target="_blank">\
                                                    <h5 class="article-heading" style="padding-top: 8px;">Heading</h5>\
                                                </a>\
                                            </div>\
                                        </div>\
                                        <div class="row">\
                                            <div class="col-sm-12 text-left">\
                                                <p class="article-snippet">text</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>';
                var articles = data.query.search;
                var count = 0;
                $("#main").append(newContainer);
                $("#main").addClass("tint");
                articles.forEach(function (element) {
                    $("#list").append(infoCard);
                    $(".wiki-link").attr("id", "link-" + count);
                    $("#link-" + count).attr("href", "https://en.wikipedia.org/w/index.php?title=" + element.title);
                    $(".article-heading").attr("id", "heading-" + count);
                    $("#heading-" + count).text(element.title);
                    $(".article-snippet").attr("id", "snippet-" + count);
                    $("#snippet-" + count).html(element.snippet + "...");

                    $("h5").removeClass("article-heading");
                    $("p").removeClass("article-snippet");
                    $("a").removeClass("wiki-link");
                    count++;
                });
            }).fail(function (xhr, status, errorThrown) {
                alert("Sorry, there is some problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            });
        }
    });
});