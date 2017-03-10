// chrome.extension.onMessage.addListener(function(details) {
// 	alert(details)

// });

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	//console.log(request.linkUrl)
	var clickUrl = request.linkUrl.split('/').pop();
	//console.log(clickUrl)
	const reg =  /《([^》]*)》/ig;
	var realATag = []
	$('a[href$="' + clickUrl + '"]').each(function() {
		if ($(this).html().match(reg)) {
			realATag.push($(this).html().match(/《([^》]*)》/ig)[0].replace(/《/, '').replace(/》/, ''))
		}
	})
	if (realATag.length > 0) {
		var keyWords = realATag[0];
		console.log(keyWords);

		if ($('#doubanShow').is('#doubanShow')) {
			$('#doubanShow').show();
			$('#itemList').html('正在读取豆瓣数据')
		} else {
			$("body").append('<div id ="doubanShow"><div id = "close"><span>X</span></div><ul id = "itemList"></ul></div>');
			$("#doubanShow").css({
				"position": "fixed",
				"width": "400px",
				"zIndex": "9999",
				"top": "0px",
				"right": "0px",
				"border": "2px solid #268dcd",
				"background": "#fff",
				"border-radius": "8px"

			})
			$('#itemList').html('正在读取豆瓣数据').css({
				"padding": "0 10px",
				"max-height": "500px",
				"overflow-y": "auto"
			})
			$('#close').css({
				"background": "#268dcd",
				"color": "#fff",
				"height": "24px"

			})
			$('#close span').css({
				"display": "inline-block",
				"border": "1px solid #fff",
				"width": "16px",
				"height": "16px",
				"text-align": "center",
				"line-height": "16px",
				"margin": "2px 0px 0 4px",
				"background": "#268dcd",
				"border-radius": "6px",
				"cursor": "pointer"
			}).on('click', function() {
				$('#doubanShow').hide();
			})
		}

		$.get('https://api.douban.com/v2/movie/search?q=' + encodeURIComponent(keyWords), function(data) {
			var htmlAttr = [],
				items = data.subjects
			if (items.length > 0) {
				for (var i = 0, len = items.length; i < len; i++) {
					let item = items[i];
					htmlAttr.push("<li style = 'border-bottom:1px solid #396;padding:10px 0'><p><strong><a target= '_blank' href='" + item.alt + "'>" + item.title + "</a></strong><span>------豆瓣评分：" + item.rating.average + "</span>&nbsp;&nbsp;&nbsp;&nbsp;年代:" + item.year + "&nbsp;&nbsp;&nbsp;&nbsp;</p>" +
						"<div></div>" +
						"<div><a target= '_blank' href='" + item.alt + "'><img src = '" + item.images.medium + "'></a></div>" +
						"</li>")
				}
			}
			$('#itemList').html(htmlAttr.join(''))
			$('#itemList li:last').css({
				"border": "none"
			})
		});


	}

});