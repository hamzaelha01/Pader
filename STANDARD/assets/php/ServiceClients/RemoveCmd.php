<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$idCommande    = mysqli_real_escape_string($conn, $info->idCommande);
 
echo "//////";


$query = "DELETE FROM COMMANDE WHERE COMMANDE.ID_COMMANDE = '$idCommande'";

if (mysqli_query($conn, $query)) {
echo "Removed...";
} else {
echo 'Failed';
}
}


?>