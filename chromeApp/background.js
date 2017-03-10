// A generic onclick callback function.
function genericOnClick(info, tab) {
	
	//console.log(info);
	//console.log(tab)
	chrome.tabs.sendRequest(tab.id, info, function(response) {
	    console.log(response);
	});
}

// Create one test item for each context type.
// var contexts = ["page", "selection", "link", "editable", "image", "video",
// 	"audio"
// ];
// for (var i = 0; i < contexts.length; i++) {
//var context = contexts[i];
var title = "豆瓣拾取" //"Test '" + context + "' menu item";
var rightCont = chrome.contextMenus.create({
	"title": title ,//+ '%s',
	"contexts": ["link"],
	"onclick": genericOnClick
});
//console.log("'" + context + "' item:" + id);
// }