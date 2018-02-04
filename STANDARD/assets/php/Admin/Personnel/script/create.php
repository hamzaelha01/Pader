<?php

$data = json_decode(file_get_contents('php://input'), TRUE);

if (isset($data['personnel'])) {

    require __DIR__ . '/library.php';

    $nom = (isset($data['personnel']['NOM_PERSONNEL']) ? $data['personnel']['NOM_PERSONNEL'] : NULL);
    $prenom = (isset($data['personnel']['PRENOM_PERSONNEL']) ? $data['personnel']['PRENOM_PERSONNEL'] : NULL);
    $phone = (isset($data['personnel']['TELEPHONE_PERSONNEL']) ? $data['personnel']['TELEPHONE_PERSONNEL'] : NULL);
    $sexe = (isset($data['personnel']['sexe']) ? $data['personnel']['sexe'] : NULL);
    $cnss = (isset($data['personnel']['CNSS_PERSONNEL']) ? $data['personnel']['CNSS_PERSONNEL'] : NULL);
    $ddembauche = (isset($data['personnel']['DD_EMBAUCHE_PERSONNEL']) ? $data['personnel']['DD_EMBAUCHE_PERSONNEL'] : NULL);
    $contrat = (isset($data['personnel']['TYPE_CONTRAT_PERSONNEL']) ? $data['personnel']['TYPE_CONTRAT_PERSONNEL'] : NULL);
    $poste = (isset($data['personnel']['ROLE_PERSONNEL']) ? $data['personnel']['ROLE_PERSONNEL'] : NULL);
    $pass = (isset($data['personnel']['PASS_PERSO']) ? $data['personnel']['PASS_PERSO'] : NULL);

    
    // validated the request
    if ($nom == NULL) {
        http_response_code(400);
        echo json_encode(['errors' => ["Name Field is required"]]);

    } else {
        // echo 'Myname is  '.$nom.' '.$prenom.' '.$phone.' '.$cnss.' '.$ddembauche.' '.$contrat.' '.$poste.' '.$pass;
        // Add the task
        $personnel = new Personnel();

        echo $personnel->Create($nom,$prenom,$phone,$sexe,$cnss,$ddembauche,$contrat,$poste,$pass);
        // $query = $this->db->prepare("INSERT INTO personnel(NOM_PERSONNEL, PRENOM_PERSONNEL, TELEPHONE_PERSONNEL, SEXE_PERSONNEL,
        //   CNSS_PERSONNEL, DD_EMBAUCHE_PERSONNEL, TYPE_CONTRAT_PERSONNEL, ROLE_PERSONNEL, PASS_PERSO) 
        //  VALUES (:nom,:prenom,:phone,:sexe,:cnss,:ddembauche,:contrat,:poste,:pass)");
        // // $x = "INSERT INTO personnel(NOM_PERSONNEL, PRENOM_PERSONNEL, TELEPHONE_PERSONNEL, SEXE_PERSONNEL,
        // //  CNSS_PERSONNEL, DD_EMBAUCHE_PERSONNEL, TYPE_CONTRAT_PERSONNEL, ROLE_PERSONNEL, PASS_PERSO) 
        // // VALUES (:nom,:prenom,:phone,:sexe,:cnss,:ddembauche,:contrat,:poste,:pass)";
        // $query->bindParam("nom", $nom, PDO::PARAM_STR);
        // $query->bindParam("prenom", $prenom, PDO::PARAM_STR);
        // $query->bindParam("phone", $phone, PDO::PARAM_STR);
        // $query->bindParam("sexe", $sexe, PDO::PARAM_STR);
        // $query->bindParam("cnss", $cnss, PDO::PARAM_STR);
        // $query->bindParam("ddembauche", $ddembauche, PDO::PARAM_STR);
        // $query->bindParam("contrat", $contrat, PDO::PARAM_STR);
        // $query->bindParam("poste", $poste, PDO::PARAM_STR);
        // $query->bindParam("pass", $pass, PDO::PARAM_STR);
        // $query->execute();
        
        
        // return json_encode(['personnel' => [
        //     'ID_PERSONNEL'          => $this->db->lastInsertId(),
        //     'NOM_PERSONNEL'        => $nom,
        //     'PRENOM_PERSONNEL'        => $prenom,
        //     'TELEPHONE_PERSONNEL'        => $phone,
        //     // 'SEXE_PERSONNEL'        => $sexe,
        //     'CNSS_PERSONNEL'        => $cnss,
        //     'DD_EMBAUCHE_PERSONNEL'        => $ddembauche,
        //     'TYPE_CONTRAT_PERSONNEL'        => $contrat,
        //     'ROLE_PERSONNEL'        => $poste,
        //     'PASS_PERSO'        => $pass
        // ]]);
        // return json_encode(['personnel' => [
        //     'ID_PERSONNEL'          => $this->db->lastInsertId(),
        //     'NOM_PERSONNEL'        => $nom,
        //     'PRENOM_PERSONNEL'        => $prenom,
        //     'TELEPHONE_PERSONNEL'        => $phone,
        //     // 'SEXE_PERSONNEL'        => $sexe,
        //     'CNSS_PERSONNEL'        => $cnss,
        //     'DD_EMBAUCHE_PERSONNEL'        => $ddembauche,
        //     'TYPE_CONTRAT_PERSONNEL'        => $contrat,
        //     'ROLE_PERSONNEL'        => $poste,
        //     'PASS_PERSO'        => $pass
        // ]]);
    }
}
?>