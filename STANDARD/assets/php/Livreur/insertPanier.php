<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$produiti     = mysqli_real_escape_string($conn, $info->produiti);
$quantitei    = mysqli_real_escape_string($conn, $info->quantitei);
$totali      = mysqli_real_escape_string($conn, $info->totali);

//$btn_name = $info->btnName;

//$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
$query  ="INSERT INTO `PANIER` (`ID_COMMANDE`, `ID_PRODUIT`, `QUANITE`, `MONTANT`, `COMMENTAIRE`) VALUES ('', '', '', '', ''))";
if (mysqli_query($conn, $query)) {
echo "Data Inserted Successfully...";
} else {
echo 'Failed';
}
}

?>