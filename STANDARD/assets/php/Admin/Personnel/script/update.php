<?php

$data = json_decode(file_get_contents('php://input'), TRUE);

if (isset($data['personnel'])) {

    require __DIR__ .'/library.php';

    $nom = (isset($data['personnel']['NOM_PERSONNEL']) ? $data['personnel']['NOM_PERSONNEL'] : NULL);
    $prenom = (isset($data['personnel']['PRENOM_PERSONNEL']) ? $data['personnel']['PRENOM_PERSONNEL'] : NULL);
    $phone = (isset($data['personnel']['TELEPHONE_PERSONNEL']) ? $data['personnel']['TELEPHONE_PERSONNEL'] : NULL);
    $sexe = (isset($data['personnel']['sexe']) ? $data['personnel']['sexe'] : NULL);
    $cnss = (isset($data['personnel']['CNSS_PERSONNEL']) ? $data['personnel']['CNSS_PERSONNEL'] : NULL);
    $ddembauche = (isset($data['personnel']['ddembauche']) ? $data['personnel']['ddembauche'] : NULL);
    $contrat = (isset($data['personnel']['TYPE_CONTRAT_PERSONNEL']) ? $data['personnel']['TYPE_CONTRAT_PERSONNEL'] : NULL);
    $poste = (isset($data['personnel']['ROLE_PERSONNEL']) ? $data['personnel']['ROLE_PERSONNEL'] : NULL);
    $pass = (isset($data['personnel']['PASS_PERSO']) ? $data['personnel']['PASS_PERSO'] : NULL);
    $personnel_id = (isset($data['personnel']['ID_PERSONNEL']) ? $data['personnel']['ID_PERSONNEL'] : NULL);
    // echo ' '.$nom.' '.$prenom.' '.$phone.' '.$sexe.' '.$cnss.' '.$ddembauche.' '.$contrat.' '.$poste.' '.$pass.' '. $personnel_id;
    // validations
    if ($nom == NULL) {
        http_response_code(400);
        echo json_encode(['errors' => ["Name Field is required"]]);

    } else {

        // Update the Task
        $personnel = new Personnel();

        $personnel->Update($nom,$prenom,$phone,$sexe,$cnss,$ddembauche,$contrat,$poste,$pass, $personnel_id);
    }
}else{
    echo "Aucune Data";
}

?>