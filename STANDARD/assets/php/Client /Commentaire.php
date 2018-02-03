<?php


header('Access-Control-Allow-Origin: *');

$conn = mysqli_connect("localhost","root","root","pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$idLocal    = mysqli_real_escape_string($conn, $info->idLocal);
$Commentaire_Livreur = mysqli_real_escape_string($conn, $info->Commentaire_Livreur);
$Commentaire_Service = mysqli_real_escape_string($conn, $info->Commentaire_Service);
//$btn_name = $info->btnName;
// echo $ID;
// echo $DD;
// echo $HT; 
echo "//////";

// echo $idLocal;
// echo $Commentaire_Livreur;
// echo $Commentaire_Service;
// $query="UPDATE COMMANDE SET COMMANDE.Commentaire_Livreur = '$Commentaire_Livreur' , COMMANDE.Commentaire_Service = '$Commentaire_Service' WHERE LOCALISATION.ID_LOCALISATION  ='$idLocal'";

$query = "UPDATE COMMANDE SET Commentaire_Livreur = '$Commentaire_Livreur', Commentaire_Service = '$Commentaire_Service' WHERE COMMANDE.ID_COMMANDE = '$idLocal'";

// //$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
// $query  ="UPDATE LOCALISATION SET COMMANDE.DD_COMMANDE = '$combine' WHERE COMMANDE.ID_COMMANDE = '$ID'";
if (mysqli_query($conn, $query)) {
echo "Updated...";
} else {
echo 'Failed';
}
}

// $query  ="UPDATE COMMANDE SET COMMANDE.DD_COMMANDE = '$combine' WHERE COMMANDE.ID_COMMANDE = '$ID'";

?>