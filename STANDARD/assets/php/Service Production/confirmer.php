<?php
// header('Access-Control-Allow-Origin: *');
// $conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");
// $info = json_decode(file_get_contents("php://input"));
// if (count($info) > 0) {
// 	$id    = mysqli_real_escape_string($conn, $info->id);
//    echo "l'id ".$id;
//     $query = "UPDATE COMMANDE SET COMMANDE.STATUS = 'CONFIRME' WHERE COMMANDE.ID_COMMANDE = '$id'";
//     if (mysqli_query($conn, $query)) {
//     echo 'La Commande est bien confirmée ...';
        
// } else {
//     echo 'Erreur';
//     }
// }else echo 'On a rien recu comme infos!Merci!';



header('Access-Control-Allow-Origin: *');


$response = [];

if(count($_POST)>0) {

	echo $_POST["id"];

$servername = "phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com";
$username = "phpMyAdmin";
$password = "phpMyAdmin";
$dbname = "pressing";

$v = $_POST["id"];
$conn = mysqli_connect($servername, $username, $password, $dbname);


	$sql = "UPDATE COMMANDE SET COMMANDE.STATUS = 'EN PREPARATION' WHERE COMMANDE.ID_COMMANDE = '$v' ";

	if (mysqli_query($conn, $sql)) {
		$response['status'] =  'La Commande est bien confirmée ...';
	}
	else 
	{
		$response['status'] = "erreur ".mysqli_error($conn);
	}
}
echo json_encode($response);

?>