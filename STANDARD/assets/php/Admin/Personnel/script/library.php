<?php

require __DIR__ .'/database_connection.php';

/**
 * Class Task
 */
class Personnel
{

    /**
     * @var mysqli|PDO|string
     */
    protected $db;

    /**
     * Task constructor.
     */
    public function __construct()
    {
        $this->db = DB();
    }

    /**
     * Add new Task
     *
     * @param $name
     * @param $description
     *
     * @return string
     */
    public function Create($nom,$prenom,$phone,$sexe,$cnss,$ddembauche,$contrat,$poste,$pass)
    {
        $query = $this->db->prepare("INSERT INTO PERSONNEL (NOM_PERSONNEL, PRENOM_PERSONNEL, TELEPHONE_PERSONNEL, SEXE_PERSONNEL,
          CNSS_PERSONNEL, DD_EMBAUCHE_PERSONNEL, TYPE_CONTRAT_PERSONNEL, ROLE_PERSONNEL, PASS_PERSO) 
         VALUES (:nom,:prenom,:phone,:sexe,:cnss,:ddembauche,:contrat,:poste,:pass)");
        // $x = "INSERT INTO personnel(NOM_PERSONNEL, PRENOM_PERSONNEL, TELEPHONE_PERSONNEL, SEXE_PERSONNEL,
        //  CNSS_PERSONNEL, DD_EMBAUCHE_PERSONNEL, TYPE_CONTRAT_PERSONNEL, ROLE_PERSONNEL, PASS_PERSO) 
        // VALUES (:nom,:prenom,:phone,:sexe,:cnss,:ddembauche,:contrat,:poste,:pass)";
        $query->bindParam("nom", $nom, PDO::PARAM_STR);
        $query->bindParam("prenom", $prenom, PDO::PARAM_STR);
        $query->bindParam("phone", $phone, PDO::PARAM_STR);
        $query->bindParam("sexe", $sexe, PDO::PARAM_STR);
        $query->bindParam("cnss", $cnss, PDO::PARAM_STR);
        $query->bindParam("ddembauche", $ddembauche, PDO::PARAM_STR);
        $query->bindParam("contrat", $contrat, PDO::PARAM_STR);
        $query->bindParam("poste", $poste, PDO::PARAM_STR);
        $query->bindParam("pass", $pass, PDO::PARAM_STR);
        $query->execute();
        
        
        // return json_encode(['personnel' => [
        //     'ID_PERSONNEL'          => $this->db->lastInsertId(),
        //     'NOM_PERSONNEL'        => $nom,
        //     'PRENOM_PERSONNEL'        => $prenom,
        //     'TELEPHONE_PERSONNEL'        => $phone,
        //     'SEXE_PERSONNEL'        => $sexe,
        //     'CNSS_PERSONNEL'        => $cnss,
        //     'DD_EMBAUCHE_PERSONNEL'        => $ddembauche,
        //     'TYPE_CONTRAT_PERSONNEL'        => $contrat,
        //     'ROLE_PERSONNEL'        => $poste,
        //     'PASS_PERSO'        => $pass
        // ]]);
        return json_encode(['personnel' => [
            'ID_PERSONNEL'          => $this->db->lastInsertId(),
            'NOM_PERSONNEL'        => $nom,
            'PRENOM_PERSONNEL'        => $prenom,
            'TELEPHONE_PERSONNEL'        => $phone,
            'SEXE_PERSONNEL'        => $sexe,
            'CNSS_PERSONNEL'        => $cnss,
            'DD_EMBAUCHE_PERSONNEL'        => $ddembauche,
            'TYPE_CONTRAT_PERSONNEL'        => $contrat,
            'ROLE_PERSONNEL'        => $poste,
            'PASS_PERSO'        => $pass
        ]]);
        
    }

    /**
     * List Tasks
     *
     * @return string
     */
    public function Read()
    {
        $query = $this->db->prepare("SELECT * FROM PERSONNEL");
        $query->execute();
        $data = array();
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }

        return json_encode(['personnels' => $data]);
    }


    /**
     * Update Task
     *
     * @param $name
     * @param $description
     * @param $task_id
     */
    public function Update($nom,$prenom,$phone,$sexe,$cnss,$ddembauche,$contrat,$poste,$pass, $personnel_id)
    {
        $query = $this->db->prepare("UPDATE PERSONNEL SET NOM_PERSONNEL=:nom,PRENOM_PERSONNEL=:prenom,TELEPHONE_PERSONNEL=:phone,
        SEXE_PERSONNEL=:sexe,CNSS_PERSONNEL=:cnss,DD_EMBAUCHE_PERSONNEL=:ddembauche,
        TYPE_CONTRAT_PERSONNEL=:contrat,ROLE_PERSONNEL=:poste,PASS_PERSO=:pass WHERE ID_PERSONNEL =:id ");
        // $x = "UPDATE personnel SET NOM_PERSONNEL=:nom,PRENOM_PERSONNEL=:prenom,TELEPHONE_PERSONNEL=:phone,
        // SEXE_PERSONNEL=:sexe,CNSS_PERSONNEL=:cnss,DD_EMBAUCHE_PERSONNEL=:ddembauche,
        // TYPE_CONTRAT_PERSONNEL=:contrat,ROLE_PERSONNEL=:poste,PASS_PERSO=:pass WHERE ID_PERSONNEL =:id ";
        $query->bindParam("nom", $nom, PDO::PARAM_STR);
        $query->bindParam("prenom", $prenom, PDO::PARAM_STR);
        $query->bindParam("phone", $phone, PDO::PARAM_STR);
        $query->bindParam("sexe", $sexe, PDO::PARAM_STR);
        $query->bindParam("cnss", $cnss, PDO::PARAM_STR);
        $query->bindParam("ddembauche", $ddembauche, PDO::PARAM_STR);
        $query->bindParam("contrat", $contrat, PDO::PARAM_STR);
        $query->bindParam("poste", $poste, PDO::PARAM_STR);
        $query->bindParam("pass", $pass, PDO::PARAM_STR);
        $query->bindParam("id", $personnel_id, PDO::PARAM_STR);
        $query->execute();
    }

    /**
     * Delete Task
     *
     * @param $task_id
     */
    public function Delete($personnel_id)
    {
        $query = $this->db->prepare("DELETE FROM PERSONNEL WHERE ID_PERSONNEL =:id");
        $query->bindParam("id", $personnel_id, PDO::PARAM_STR);
        $query->execute();
    }
}