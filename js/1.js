document.addEventListener("DOMContentLoaded", function() {
    AutoComplete({
        select: function(input, item) {
            window.open(item.children[0].getAttribute("href"), '_blank');
        },
        open: function(input, result) {},
        post: function(result, response, custParams) {
            response = JSON.parse(response);
            var empty,
                length = response.length,
                a = domCreate("a"),
                li = domCreate("li"),
                ul = domCreate("ul");
                
            if (Array.isArray(response)) {
                if (length) {
                    if (custParams.limit < 0) {
                        response.reverse();
                    }

                    for (var i = 0; i < length && (i < Math.abs(custParams.limit) || !custParams.limit); i++) {
                        li.innerHTML = response[i];
                        ul.appendChild(li);
                        li = domCreate("li");
                    }
                } else {
                    //If the response is an object or an array and that the response is empty, so this script is here, for the message no response.
                    empty = true;
                    attr(li, {"class": "locked"});
                    li.innerHTML = custParams.noResult;
                    ul.appendChild(li);
                }
            } else {
                var properties = Object.getOwnPropertyNames(response);

                if (custParams.limit < 0) {
                    properties.reverse();
                }

                for (var propertie in properties) {
                    if (parseInt(propertie) < Math.abs(custParams.limit) || !custParams.limit) {
                        a.innerHTML = response[properties[propertie]];
                        attr(a, {"href": properties[propertie], "target": "_blank"});
                        li.appendChild(a);
                        ul.appendChild(li);
                        a = domCreate("a");
                        li = domCreate("li");
                    }
                }
            }

            if (result.hasChildNodes()) {
                result.childNodes[0].remove();
            }
            
            result.appendChild(ul);

            return empty;
        }
    });

    $('.dropdown-toggle').dropdown();
    $('#menu').collapse();

    $("a[data-api]").on("click", function() {
        $("a.active[data-api]").removeClass("active");
        $("a[data-api=" + $(this).attr("data-api") + "]").addClass("active");
        $("div.active").removeClass("active");
        $("div[id=" + $(this).attr("data-api") + "]").addClass("active");
    });

    $("i[data-api-href]").on("click", function() {
        window.location.hash = $(this).attr("data-api-href");
    });

    if (window.location.hash != "") {
        var hash = window.location.hash.substr(1);
        if ($(".list-group > a[data-api=" + hash + "]").length == 1) {
            $(".list-group > a.active[data-api]").removeClass("active");
            $(".list-group > a[data-api=" + hash + "]").addClass("active");
            $("div.active").removeClass("active");
            $("div[id=" + hash + "]").addClass("active");
        }
    }

    $('pre').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});