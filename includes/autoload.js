try {
    $("<link>").attr({href: "includes/waifu.css?v=1.4.2", rel: "stylesheet", type: "text/css"}).appendTo('head');
    $('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');
    $.ajax({url: "includes/waifu-tips.js?v=1.4.2", dataType:"script", cache: true, success: function() {
        $.ajax({url: "includes/live2d.js?v=1.0.5", dataType:"script", cache: true, success: function() {
            // You can directly modify some parameters
            live2d_settings['quoteAPI'] = "anime-news-networks";
            live2d_settings['modelId'] = 5;                  // Default model ID
            live2d_settings['modelTexturesId'] = 1;          // Default texture ID 
            live2d_settings['modelStorage'] = false;         // Do not store model ID
            // Add before initModel
            initModel("includes/waifu-tips.json");
        }});
    }});
} catch(err) { console.log("[Error] JQuery is not defined.") }
