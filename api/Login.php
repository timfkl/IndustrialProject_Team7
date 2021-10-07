<?php
include('connection.php');
include('functions.php');
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$model = new Connection();
$con = $model->getConnection();

$result = [];
if ($_POST)
{
        // set response code - 200 OK
       	http_response_code(200);
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
               echo("success");
               debug_to_console("success");
	        }
             else
             {
                echo json_encode(array("result" => false, "data" => null));
                echo("Faulure");
                debug_to_console("failure");
             }
} catch(PDOException $error) {
	//catch error
	$result["status"] = $error->getCode();
	$result["message"] = $error->getMessage();
	echo json_encode($result);
    debug_to_console("Exception error catch");
    echo("Exception error catch");
    
}
}
}