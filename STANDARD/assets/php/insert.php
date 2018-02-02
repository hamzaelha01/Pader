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
$query  ="INSERT INTO `CLIENT` (`ID_CLIENT`, `NOM_CLIENT`, `PRENOM_CLIENT`, `TELEPHONE_CLIENT`, `Email`,  `Password`) VALUES (NULL, '$nom', '$prenom', '$tel', '$email', '$mdp')";
if (mysqli_query($conn, $query)) {
echo "Data Inserted Successfully...";
} else {
echo 'Failed';
}
}

?>