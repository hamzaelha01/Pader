<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$id = mysqli_real_escape_string($conn, $info->id);
$LIVREUR_LIVRAISON = mysqli_real_escape_string($conn, $info->LIVREUR_LIVRAISON);
echo $LIVREUR_LIVRAISON;
echo $id;


// //$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
$query  ="UPDATE COMMANDE SET COMMANDE.LIVREUR_COLLECTE = '$LIVREUR_LIVRAISON' , COMMANDE.STATUS = 'TO DELIVER' WHERE COMMANDE.ID_COMMANDE = '$id'";
if (mysqli_query($conn, $query)) {
echo "Data Inserted Successfully...";
} else {
echo 'Failed';
}
}

// $query  ="UPDATE COMMANDE SET COMMANDE.LIVREUR_COLLECTE = '$LIVREUR_COLLECTE' WHERE COMMANDE.ID_COMMANDE = '$ID'";

?>

