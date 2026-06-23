# Features
## Prende Affitti
## Contattore
Deve presentare il totale che ha nel database per la collection view "count" giù il dati ritornati

```
[
        {
            "_id": {
                "province": "Udine",
                "type": "a"
            },
            "total": 74,
            "disable": 11,
            "elevator": 37,
            "noElevator": 20,
            "deny": 53,
            "wait": 4,
            "accept": 17,
            "nodisable": 31,
            "emptydisable": 32,
            "emptyChoise": 0,
            "emptyElevator": 17
        },
        {
            "_id": {
                "province": "Trieste",
                "type": "a"
            },
            "total": 209,
            "disable": 12,
            "elevator": 108,
            "noElevator": 86,
            "deny": 131,
            "wait": 0,
            "accept": 29,
            "nodisable": 130,
            "emptydisable": 67,
            "emptyChoise": 49,
            "emptyElevator": 15
        },
        {
            "_id": {
                "province": "Udine",
                "type": "c"
            },
            "total": 258,
            "disable": 36,
            "elevator": 97,
            "noElevator": 135,
            "deny": 180,
            "wait": 1,
            "accept": 63,
            "nodisable": 135,
            "emptydisable": 87,
            "emptyChoise": 14,
            "emptyElevator": 26
        },
        {
            "_id": {
                "province": "Padova",
                "type": "a"
            },
            "total": 367,
            "disable": 42,
            "elevator": 119,
            "noElevator": 200,
            "deny": 0,
            "wait": 0,
            "accept": 0,
            "nodisable": 201,
            "emptydisable": 124,
            "emptyChoise": 367,
            "emptyElevator": 48
        }
    ]
```
## Analisi
Deve prendere il dati e passare per API al frontend query e collection "affito"

```
[
        {
          "$match": {
            "deleted": {
              "$exists": false
            },
            "type": { $exists: true },
            "powerproperties.location.province": { $exists: true }
          }
        }, {
          "$project": {
            "_id": 1,
            "stateMaloi": 1,
            "type": 1,
            "realEstate": {
              "properties": "$powerproperties",
              "title": 1,
              "price": 1
            }
          }
        }
      ];
```
# Formati Dati
