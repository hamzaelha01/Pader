<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$output = array();
// $query  = "SELECT * FROM users";
// $query  ="SELECT COMMANDE.ID_COMMANDE , COMMANDE.NBR_ARTICLES ,COMMANDE.LIVREUR_COLLECTE, COMMANDE.DD_COMMANDE , COMMANDE.DF_COMMANDE
// FROM COMMANDE
//   WHERE COMMANDE.STATUS  LIKE '%CONFIRME%'";
$query ="SELECT * FROM CATEGORIE ";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
    $output[] = $row;
}
}
echo json_encode($output);
?> 
