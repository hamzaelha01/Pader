<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$idCmd    = mysqli_real_escape_string($conn, $info->idCmd);
$idProd = mysqli_real_escape_string($conn, $info->idProd);
// $MontantProd = mysqli_real_escape_string($conn, $info->MontantProd);
//$btn_name = $info->btnName;
// echo $ID;
// echo $DD;
// echo $HT; 
echo "//////";
// $query="UPDATE PANIER SET PANIER.MONTANT = '$MontantProd' WHERE PANIER.ID_PRODUIT  ='$idProd' 
// AND PANIER.ID_COMMANDE ='$idCmd' ";

$query = "DELETE FROM PANIER WHERE PANIER.ID_PRODUIT = '$idProd' AND PANIER.ID_COMMANDE = '$idCmd'";

// //$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
// $query  ="UPDATE LOCALISATION SET COMMANDE.DD_COMMANDE = '$combine' WHERE COMMANDE.ID_COMMANDE = '$ID'";
if (mysqli_query($conn, $query)) {
echo "Removed...";
} else {
echo 'Failed';
}
}

// $query  ="UPDATE COMMANDE SET COMMANDE.DD_COMMANDE = '$combine' WHERE COMMANDE.ID_COMMANDE = '$ID'";

?>