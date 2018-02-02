    // 'use strict'
    // app.service('user', function() {
    //     var username;
    //     var loggedin = false;
    //     this.setName = function(name) {
    //         username = name;
    //     };
    //     this.getName = function() {
    //         return username;
    //     };
    //     this.isUserLoggedIn = function() {
    //         return loggedin;
    //     };
    //     this.userLoggedIn = function() {
    //         loggedin = true;
    //     };
    // });


    'use strict'
    app.service('user', function() {
        var username;
        var loggedin = false;
        var id;
        var profil;
        var nom;
        var temp;
        var role;
        var ctrl = false;
        var ClTempCmd; // ID COMMANDE TEMPORAIRE POUR QUE LE LIVREUR PUISSE ACCED AU PANIER 
        var TempCmd; // ID CLIENT TEMPORAIRE POUR QUE LE SERVICE CLIENT PUISSE RESERVER POUR SON CLIENT
        var TempNameCmd;
        var TempProfileCmd;
        var TempRecu; // ID COMMANDE TEMPORAIRE POUR QUE LE CLIENT PUISSE VOIR SON RECU 
        var TempIDC; // ID COMMANDE TEMPORAIRE POUR LE SERVICE PRODUCTION => CONSULTATION RECU CONCERNANT UNE COMMANDE
        var IdLocalTempclient // ID LOCALISATION POUR UN CLIENT 
        // localisation 
        var localisation; 
        var RecuProdCpt; // Compteur du recu production
        var QteCmd; // Qte d'une commande  a ne pas depasser lors de l'impression

        // this.setName = function(name) {
        //     username = name;
        // };
        this.getIdLocalTempclient = function()
        {
            return  IdLocalTempclient;
        }

        this.setIdLocalTempClient = function(idlc)
        {
            IdLocalTempclient = idlc;
        }

        this.getName = function() {
            return nom;
        };
        this.profil = function() {
            return profil;
        };
        this.getRole = function() {
            return role;
        }
        this.nom = function() {
            return nom;
        };
        // this.isUserLoggedIn = function() {
        //     return loggedin;
        // };
        // pour le remplissage de Localstorage pour la session 
        this.isUserLoggedIn = function() {
            if (!!localStorage.getItem('login')) {
                loggedin = true;
                var data = JSON.parse(localStorage.getItem('login'));
                username = data.username;
                profil = data.profil;
                id = data.id;
                role = data.role;
                IdLocalTempclient = data.IdLocalTempclient;            }
            return loggedin;
        };
        this.userLoggedIn = function() {
            loggedin = true;
        };

        this.setID = function(userID) {
            id = userID;
        };
        this.getID = function() {
            return id;
        };
        // login 
        this.saveData = function(go) {
            username = go.username; // Num Telephone 
            profil = go.name; // Prenom Client 
            id = go.id; // ID CLIENT 
            loggedin = true; // connecté
            nom = go.nom // Pour le NOM
            role = go.role; // Role 
            IdLocalTempclient = go.ID_LOCALISATION;

            // SESSION  
            localStorage.setItem('login', JSON.stringify({
                username: id,
                profil: profil,
                id: id,
                nom: nom,
                role: role,
                IdLocalTempclient: IdLocalTempclient
            }));
        };
        // logout
        this.dataClear = function() {
            localStorage.removeItem('login');
            loggedin = false;
            username = "";
            id = "";
            profil = "";
            nom = "";
        }


        // commander pour un client 
        this.clientTemp = function(client) {
            temp = client;
        }
        this.getClientTemp = function() {
            return temp;
        }

        // Redirection vers Panier
        this.cmdTemp = function(commande){
            TempCmd = commande;
        }

        this.getCmdTemp = function(){
            return TempCmd;
        }

        //Redirection ver Panier 
        this.ClientTempCmd = function(cl){
            ClTempCmd = cl;
        }

        this.getClientTempCmd = function(){
            return ClTempCmd;
        }
        // Redirection vers Recu 
        this.getTempRecu = function(){
            return TempRecu;
        }
        this.setTempRecu = function(TPC){
            TempRecu = TPC;
        }
        this.getTempIDC = function(){
            return TempIDC;
        }
        this.setTempIDC = function(TIDC){
            TempIDC= TIDC;
        }
        this.setTempNameCmd = function(TNC){
            TempNameCmd = TNC;
        }
        this.getTempNameCmd = function(){
            return TempNameCmd;
        }
        this.setTempProfileCmd = function(TPC){
            TempProfileCmd = TPC;
        }
        this.getTempProfileCmd = function(){
            return TempProfileCmd;
        }


        // localisation 
        this.getLocalisation = function(){
            return localisation;
        }
        this.setLocalisation = function(local){
            localisation = local;
        }

        // Qte & Compteur Recu Prod

        this.getRecuProdCpt = function()
        {
            return RecuProdCpt;
        }
        this.setRecuProdCpt = function(RP){
            RecuProdCpt = RP;
        }

        this.getQteCmd = function()
        {
            return QteCmd;
        }
        this.setQteCmd = function(QC)
        {
            QteCmd = QC;
        }

    });