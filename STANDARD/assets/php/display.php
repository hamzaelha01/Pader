<?php
$conn   = mysqli_connect("localhost", "root", "", "Pressing");
$output = array();
// $query  = "SELECT * FROM users";
$query  ="SELECT `ID_COMMANDE`, `DD_COMMANDE`, `DF_COMMANDE`, `STATUS`, `ID_LOCALISATION`, `COMMENTAIRE`, `LIVREUR_COLLECTE`, `LIVREUR_LIVRAISON`, `ID_DATE` FROM `COMMANDE` ";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
echo json_encode($output);
}
?> 