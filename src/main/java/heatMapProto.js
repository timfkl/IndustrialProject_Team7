import "../java/heatmap/build/heatmap.js";
import "../java/heatmap/build/heatmap.min.js";

function main(){
	alert("Heatmap running")
	/**Obtains the container to put the heatmap in*/
	var container = document.getElementById("heatMapContainer");
	/**Creating configuration data*/
	var config = {
		container,
		radius: 10,
		maxOpacity: .5,
		minOpacity: 0,
		blur: .75
	}
	/**Creating the heatmap with configuration data*/
	var heatmap = h337.create(config);
	/**Data to be input into the heatmap*/
	var heatmapData = {
		max: 10,
		min: 0,
		data: [{x: 10, y: 15, value: 5}]
	}
	/**Setting the data into the heatmap */
	heatmap.setData(heatmapData);
}