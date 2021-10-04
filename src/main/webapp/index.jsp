<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="ISO-8859-1">
	<title>HeatMap Proto</title>
	</head>
	<!-- Script to run the heatMap -->
	<script src="/src/main/heatmap/build/heatmap.js"></script>
	<script>
		function testHeatMap(){
			
		}
	</script>
	<body>
		<h1>HeatMap Test</h1>
		<hr/>
		<!-- Code for the button -->
		<form action="Run Heatmap Test">
			<input type = "Button" onclick="testHeatMap()" value = "Run Heatmap Test">
		</form>
		<div id = "heatMapContainer"></div>
	</body>
</html>