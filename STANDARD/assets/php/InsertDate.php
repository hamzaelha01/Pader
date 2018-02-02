<?php
$conn = mysqli_connect("localhost", "root", "", "Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$nom     = mysqli_real_escape_string($conn, $info->nom);
$prenom    = mysqli_real_escape_string($conn, $info->prenom);
$tel      = mysqli_real_escape_string($conn, $info->tel);
$email      = mysqli_real_escape_string($conn, $info->email);
$mdp     = mysqli_real_escape_string($conn, $info->mdp);
//$btn_name = $info->btnName;

//$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
$query  ="INSERT INTO `DATE` (`ID_DATE`, `DATE_C_RES`, `DATE_C_RC`, `DATE_C_RL`, `DATE_C_PL`, `DATE_C_RP`, `DATE_C_LP`, `DATE_C_VL`) VALUES (NULL, date('Y-m-d H:i:s'), NULL, NULL, NULL, NULL, NULL, NULL)";
if (mysqli_query($conn, $query)) {
echo "Data Inserted Successfully...";
} else {
echo 'Failed';
}
}

?>