<?php
include('connection.php');

$model = new Connection();
$con = $model->getConnection();

$result = [];
if(isset($_POST['email']) && isset($_POST['password']))
{
try {
    $email = $_POST['email'];
    $password = $_POST['password'];

	$sql = "SELECT * FROM `user` WHERE email='$email' AND pass='$password'";
    $result = mysqli_query($con,$query) or die(mysqli_error());
    $rows = mysqli_num_rows($result);
    if($rows==1){
        echojson_encode(array("result" => true,"data" => $result));
	}
    else
	echo json_encode(array("result" => false, "data" => null));
} catch(PDOException $error) {
	//catch error
	$result["status"] = $error->getCode();
	$result["message"] = $error->getMessage();
	echo json_encode($result);
}
}