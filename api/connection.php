<?php

$dbhost = "silva.computing.dundee.ac.uk";
$dbuser = "21ac4u07";
$dbpass = "ab123c";
$dbname = "21ac4d07";

if(!$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname))
{
	die("failed to connect");
}

?>