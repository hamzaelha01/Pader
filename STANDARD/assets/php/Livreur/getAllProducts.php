<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","pressing");
$output = array();
// $query  = "SELECT * FROM users";
$query  ="SELECT *
FROM PRODUIT , CATEGORIE
WHERE PRODUIT.ID_CATEGORIE = CATEGORIE.ID_CATEGORIE";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
echo json_encode($output);
}
?> 