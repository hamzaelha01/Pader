<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","pressing");
$output = [];
// $query  = "SELECT * FROM users";
$query  ="SELECT CLIENT.NOM_CLIENT , CLIENT.ID_CLIENT , CLIENT.PRENOM_CLIENT , CLIENT.TELEPHONE_CLIENT , CLIENT.Email , CLIENT.REMARQUES , CLIENT.TYPE_CLIENT ,  CLIENT.NVISA , CLIENT.Reduction , LOCALISATION.Adresse_Complete_Collect , LOCALISATION.ID_LOCALISATION
FROM CLIENT , LOCALISATION 
WHERE CLIENT.ID_LOCALISATION = LOCALISATION.ID_LOCALISATION";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
echo json_encode($output);
}
?> 