/******************************************************************************************
 *
 * Kristian Tingler
 *
 * 2015
 *
 *  Ziel des Projektes ist, dass die Items im Formats-DropDown je nach Font-Color
 *  einen dunklen Background bekommen.
 *
 * 2015-11-20:  Datei erstellt
 *
 ******************************************************************************************/

tinymce.init({
    mode: "textareas",
    plugins: "",
    content_css: "",
    style_formats: [
        { title: 'Bold text', inline: 'b' },
        { title: 'Red text', inline: 'span', styles: {color: '#ff0000'} },
        { title: 'Red header', block: 'h1', styles: {color: '#ff0000'} },
        { title: 'White 1 header', block: 'h1', styles: { color: '#d2d2d2' } },
        { title: 'White 2 header', block: 'h1', styles: { color: '#d3d3d3' } },
        { title: 'White 2 header', block: 'h1', styles: { color: '#FFFFFF' } },
        { title: 'Example 1', inline: 'span', classes: 'example1' },
        { title: 'Example 2', inline: 'span', classes: 'example2' },
    ],
    menubar: false,
    toolbar: "styleselect | removeformat",
    setup: function (editor) {
        editor.on("init", function (e) {
            var caption = e.target.buttons["styleselect"].text;

            if (caption) {
                $(":contains('Formats')").closest("button").each(function (index, item) {
                    $item = $(item);

                    $item.on("mouseup", function () {
                        var getMenuItems = function () {
                            $("div[role='menu'] > .mce-menu-item > span").each(function (index, menuItem) {
                                $menuItem = $(menuItem);
                                var hexColor = ColorConverter.RgbToHex($menuItem.css("color"));
                                var colorObj = ColorConverter.HexToRgb(hexColor);
                                var threshold = 210;

                                if ((colorObj.r > threshold) && (colorObj.g > threshold) && (colorObj.b > threshold)) {
                                    $menuItem.closest("div").css("background-color", "#888888");
                                }
                            });
                        };

                        window.setTimeout(getMenuItems, 100);
                    });
                });
            }
        });
    }
});

var ColorConverter = {
    HexToRgb: function(color) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return (result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null);
    },

    RgbToHex: function(color) {
        color = color.replace(/\s/g, "");
        var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
        if (aRGB) {
            color = '';
            for (var i = 1; i <= 3; i++) {
                color += Math.round((aRGB[i][aRGB[i].length - 1] == "%" ? 2.55 : 1) * parseInt(aRGB[i])).toString(16).replace(/^(.)$/, '0$1');
            }
        }
        else {
            color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
        }

        return ('#' + color);
    }
}
