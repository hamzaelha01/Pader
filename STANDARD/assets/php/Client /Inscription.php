<?php
header('Access-Control-Allow-Origin: *');

 $conn = mysqli_connect("localhost", "root", "root", "Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
   $data = array();
   $data    = $info->user;
   $nom    = $data->nom;
   $prenom = $data->prenom;
   $phone = $data->phone;// Ce Champ doit etre varchar pour etre enregistre avec le premier 0
   $email = $data->email;
   // Si Vous Voulez prendre l'adresse
   // $adresse = $data->adresse;
   $password = $data->password;
   $type = $info->type;
   $sexe = $info->sexe;
   $idlocalisation = $info->idlocalisation;


   $query = "INSERT INTO `CLIENT` (`ID_LOCALISATION`,`NOM_CLIENT`, `PRENOM_CLIENT`, `TELEPHONE_CLIENT`, `Email`, `SEXE_CLIENT`, `Password`, `TYPE_CLIENT`)
               VALUES ('$idlocalisation','$nom','$prenom','$phone','$email','$sexe','$password','$type')";
   if (mysqli_query($conn, $query)) {
       echo 'Bienvenue! Tu t\'es Bien Inscrit  ...';
       }else {
           echo 'Erreur';
       }
   // echo $nom.'  '.$prenom.'  '.$phone.'  '.$email.'  '.$sexe.'  '.$password.'  '.$type;
   

}else{
   echo "Aucune Data!!";
}