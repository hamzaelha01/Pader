<?php

header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");
$info = json_decode(file_get_contents("php://input"));
$output = array();
$IDCMD   = mysqli_real_escape_string($conn, $info->IDCMD);


// $output = array();
// $query  = "SELECT * FROM `COMMANDE`";
$query  ="SELECT SUM(PANIER.QUANITE) as Quantite FROM PANIER WHERE PANIER.ID_COMMANDE ='$IDCMD'";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
// echo json_encode($output);
}

echo json_encode($output);
?> 

