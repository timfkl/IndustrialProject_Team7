<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

class Connection {
	public function getConnection(){
		
		$db = "api";
		$dbhost = "silva.computing.dundee.ac.uk";
		$dbuser = "21ac4u07";
		$dbpass = "ab123c";
		$dbname = "21ac4d07";
		$dboptions = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

		$db = new PDO("mysql:host=$dbhost;dbname=$db;", $dbuser, $dbpass, $dboptions);
			return $db;
	}
}

?>