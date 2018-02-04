<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
    $id    = $info->id;
    $query = "UPDATE COMMANDE SET STATUS = 'COLLECTED' WHERE ID_COMMANDE = '$id'";
    if (mysqli_query($conn, $query)) {
    echo 'La Commande est bien confirmée ...';
        
} else {
    echo 'Erreur';
    }
}else echo 'On a rien recu comme infos!Merci!';
?>