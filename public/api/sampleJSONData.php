<?php
include('connection.php');
$result = [];
try {
	$model = new Connection();
	$db = $model->getConnection();
	$sql = "SELECT id FROM sample_table";
	$query = $db->prepare($sql);
	$query->execute();
	if ($query->rowCount() > 1) {
		$sample_row = $query->fetch(PDO::FETCH_ASSOC);
		$result["records"]= array(
			'id' => $sample_row["id"]
		);
	}
	echo json_encode($result);
} catch(PDOException $error) {
	//catch error
	$result["status"] = $error->getCode();
	$result["message"] = $error->getMessage();
	echo json_encode($result);
}
?>