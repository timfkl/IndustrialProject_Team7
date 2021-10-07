<?php
header("Access-Control-Allow-Origin: 'http://localhost:3000");
header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
function check_login($con)
{

	if(isset($_SESSION['user_id']))
	{

		$email = $_SESSION['email'];
		$query = "select * from users where email = '$email' limit 1";

		$result = mysqli_query($con, $query);
		if($result && mysqli_num_rows($result) > 0)
		{
			$user_data = mysqli_fetch_assoc($result);
			return $user_data;
		}
	}
	//redirect to login
	header("Location: login.php");
}

function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}
?>