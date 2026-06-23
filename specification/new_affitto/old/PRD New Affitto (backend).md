Voglio creare uno PRD per un nuovo sistema interno di affitto. Il problema  è che ho fatto un scrapping di uno sito e messo in una base nosql,  ho il dati crudo, voglio un sistema per preparare e presentare il dado crudo con aggregation e typescript business rules per la API e creare un frontend react e redux per presentare il dati e tomare dedizione . 


# Dati
## La infrastruttura

### Connection MongoDB

| URL      | mongodb+srv://cluster0.7qska.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0 |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| DataBase | udine                                                                                                                                    |
| certPath | X509-cert-2864290664025085959.pem                                                                                                        |

### Sicuranza

Il sistema sta usando la piattaforma di firebase google per ospedare il hosting e function , anche la sicuranza è dello firebase con autenticazione provide per il google. con questo so puoi fare alterazione nel dati di statoMaloi e description se la richiesta tenere un token di accesso. 

**projectID nel firebase** : affitiudine

## Affitto Dati

### Legge dati

| Collection  | affitto_data              |
| ----------- | ------------------------- |
| Description | Affitti dati gìa addatati |
| Can filter  | type o provinzia          |


```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": [
    "_id",
    "feature",
    "properties",
    "realEstatePage",
    "type"
  ],
  "properties": {
    "_id": {
      "type": "integer"
    },
    "description": {
      "type": "string"
    },
    "feature": {
      "type": "object",
      "required": [
        "_id",
        "featureList",
        "primaryFeatures",
        "province",
        "type"
      ],
      "properties": {
        "_id": {
          "type": "integer"
        },
        "featureList": {
          "type": "object",
          "required": [],
          "properties": {
            "balcony": {
              "type": "string"
            },
            "basement": {
              "type": "string"
            },
            "bathrooms": {
              "type": "string"
            },
            "elevator": {
              "type": "string"
            },
            "floor": {
              "type": "string"
            },
            "furniture": {
              "type": "string"
            },
            "rooms": {
              "type": "string"
            },
            "saleDate": {
              "type": "string"
            },
            "surface": {
              "type": "string"
            },
            "terrace": {
              "type": "string"
            }
          }
        },
        "primaryFeatures": {
          "type": "object",
          "required": [],
          "properties": {
            "Accesso_per_disabili": {
              "type": "integer"
            },
            "Armadio_a_muro": {
              "type": "integer"
            },
            "Arredato": {
              "type": "null"
            },
            "Bagno_per_disabili": {
              "type": "integer"
            },
            "balcone": {
              "type": [
                "null",
                "integer"
              ]
            },
            "Cablato": {
              "type": "integer"
            },
            "Caminetto": {
              "type": "integer"
            },
            "Campo_da_tennis": {
              "type": "integer"
            },
            "cancello_elettrico": {
              "type": "integer"
            },
            "canna_fumaria": {
              "type": "null"
            },
            "cantina": {
              "type": "integer"
            },
            "Cucina": {
              "type": "integer"
            },
            "Esposizione_esterna": {
              "type": "integer"
            },
            "Esposizione_interna": {
              "type": "integer"
            },
            "Fibra_ottica": {
              "type": "integer"
            },
            "Giardino_comune": {
              "type": "null"
            },
            "Giardino_privato": {
              "type": "null"
            },
            "Giardino_privato_e_comune": {
              "type": "null"
            },
            "Idromassaggio": {
              "type": "integer"
            },
            "Impianto_di_allarme": {
              "type": "integer"
            },
            "impianto_tv_centralizzato": {
              "type": "integer"
            },
            "impianto_tv_con_parabola_satellitare": {
              "type": "integer"
            },
            "impianto_tv_singolo": {
              "type": "integer"
            },
            "Infissi_esterni_in_doppio_vetro_/_legno": {
              "type": "null"
            },
            "Infissi_esterni_in_doppio_vetro_/_metallo": {
              "type": "null"
            },
            "Infissi_esterni_in_doppio_vetro_/_PVC": {
              "type": "null"
            },
            "Infissi_esterni_in_triplo_vetro_/_legno": {
              "type": "null"
            },
            "Infissi_esterni_in_triplo_vetro_/_metallo": {
              "type": "null"
            },
            "Infissi_esterni_in_triplo_vetro_/_PVC": {
              "type": "null"
            },
            "Infissi_esterni_in_vetro_/_legno": {
              "type": "null"
            },
            "Infissi_esterni_in_vetro_/_metallo": {
              "type": "null"
            },
            "Infissi_esterni_in_vetro_/_PVC": {
              "type": "null"
            },
            "Mansarda": {
              "type": "integer"
            },
            "Nessun_giardino": {
              "type": "null"
            },
            "Non_Arredato": {
              "type": "null"
            },
            "Parzialmente_Arredato": {
              "type": "null"
            },
            "Passo_carrabile": {
              "type": "integer"
            },
            "Pavimento_flottante": {
              "type": "integer"
            },
            "piscina": {
              "type": "integer"
            },
            "Porta_blindata": {
              "type": "integer"
            },
            "portiere": {
              "type": "null"
            },
            "portiere_intera_giornata": {
              "type": "null"
            },
            "portiere_mezza_giornata": {
              "type": "null"
            },
            "Proprietà_recintata": {
              "type": "integer"
            },
            "Reception": {
              "type": "integer"
            },
            "Senza_impianto_tv": {
              "type": "integer"
            },
            "Solo_Cucina_Arredata": {
              "type": "null"
            },
            "Taverna": {
              "type": "integer"
            },
            "terrazza": {
              "type": [
                "null",
                "integer"
              ]
            },
            "videoCitofono": {
              "type": "integer"
            },
            "Vigilanza_CCTV": {
              "type": "integer"
            }
          }
        },
        "province": {
          "type": "string"
        },
        "stateMaloi": {
          "type": "integer"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "mLastUpdate": {
      "$ref": "#/$defs/Double"
    },
    "properties": {
      "type": "object",
      "required": [
        "location",
        "multimedia"
      ],
      "properties": {
        "availability": {
          "type": "string"
        },
        "buildingYear": {
          "type": "integer"
        },
        "caption": {
          "type": "string"
        },
        "costs": {
          "type": "object",
          "required": [
            "agencyCommission",
            "appliedVat",
            "commissionSubject"
          ],
          "properties": {
            "agencyCommission": {
              "type": "null"
            },
            "appliedVat": {
              "type": "null"
            },
            "bankGuarantee": {
              "type": "null"
            },
            "commissionSubject": {
              "type": "null"
            },
            "condominiumExpenses": {
              "type": "string"
            },
            "heatingExpenses": {
              "type": "string"
            },
            "notaryCommission": {
              "type": "null"
            }
          }
        },
        "defaultDescription": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "elevator": {
          "type": "boolean"
        },
        "energy": {
          "type": "object",
          "required": [
            "emission",
            "thermalInsulation",
            "zeroEnergyBuilding"
          ],
          "properties": {
            "airConditioning": {
              "type": "string"
            },
            "buildingPerformance": {
              "type": "object",
              "required": [
                "summer",
                "winter"
              ],
              "properties": {
                "summer": {
                  "type": [
                    "string",
                    "null"
                  ]
                },
                "winter": {
                  "type": "string"
                }
              }
            },
            "class": {
              "type": "object",
              "required": [
                "color",
                "name"
              ],
              "properties": {
                "color": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                }
              }
            },
            "emission": {
              "type": "null"
            },
            "energyStatus": {
              "type": "string"
            },
            "epi": {
              "anyOf": [
                {
                  "$ref": "#/$defs/Double"
                },
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            "epiUm": {
              "type": "string"
            },
            "heatingType": {
              "type": "string"
            },
            "renewableEpi": {
              "type": "string"
            },
            "renewableEpiUm": {
              "type": "string"
            },
            "thermalInsulation": {
              "type": "null"
            },
            "zeroEnergyBuilding": {
              "type": "boolean"
            }
          }
        },
        "floor": {
          "type": "object",
          "required": [
            "abbreviation",
            "floorOnlyValue",
            "ga4FloorValue",
            "value"
          ],
          "properties": {
            "abbreviation": {
              "type": [
                "string",
                "null"
              ]
            },
            "floorOnlyValue": {
              "type": "string"
            },
            "ga4FloorValue": {
              "type": "string"
            },
            "value": {
              "type": "string"
            }
          }
        },
        "garage": {
          "type": "string"
        },
        "location": {
          "type": "object",
          "required": [
            "address",
            "city",
            "cityId",
            "latitude",
            "locality",
            "longitude",
            "macrozone",
            "macrozoneId",
            "marker",
            "microzone",
            "nation",
            "province",
            "provinceId",
            "region",
            "streetNumber",
            "zoom"
          ],
          "properties": {
            "address": {
              "type": [
                "string",
                "null"
              ]
            },
            "city": {
              "type": "string"
            },
            "cityId": {
              "type": "integer"
            },
            "latitude": {
              "anyOf": [
                {
                  "$ref": "#/$defs/Double"
                },
                {
                  "type": "null"
                }
              ]
            },
            "locality": {
              "type": "null"
            },
            "longitude": {
              "anyOf": [
                {
                  "$ref": "#/$defs/Double"
                },
                {
                  "type": "null"
                }
              ]
            },
            "macrozone": {
              "type": [
                "string",
                "null"
              ]
            },
            "macrozoneId": {
              "type": [
                "integer",
                "null"
              ]
            },
            "marker": {
              "type": "string"
            },
            "microzone": {
              "type": [
                "string",
                "null"
              ]
            },
            "nation": {
              "type": "object",
              "required": [
                "id",
                "keyurl",
                "name"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "keyurl": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                }
              }
            },
            "province": {
              "type": "string"
            },
            "provinceId": {
              "type": "string"
            },
            "region": {
              "type": "string"
            },
            "streetNumber": {
              "type": [
                "null",
                "string"
              ]
            },
            "zoom": {
              "type": [
                "integer",
                "null"
              ]
            }
          }
        },
        "multimedia": {
          "type": "object",
          "required": [
            "documents",
            "floorplans",
            "hasMultimedia",
            "hasOnlyPhotos",
            "photoPlan",
            "photos",
            "videos",
            "virtualTours"
          ],
          "properties": {
            "documents": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "format",
                  "id",
                  "title",
                  "type",
                  "url"
                ],
                "properties": {
                  "format": {
                    "type": "string"
                  },
                  "id": {
                    "type": "integer"
                  },
                  "length": {
                    "type": "integer"
                  },
                  "title": {
                    "type": "string"
                  },
                  "type": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              }
            },
            "floorplans": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "caption",
                  "id",
                  "interactive",
                  "url",
                  "urls"
                ],
                "properties": {
                  "caption": {
                    "type": "string"
                  },
                  "id": {
                    "type": "integer"
                  },
                  "interactive": {
                    "type": "boolean"
                  },
                  "url": {
                    "type": "null"
                  },
                  "urls": {
                    "type": "object",
                    "required": [
                      "large",
                      "medium",
                      "small",
                      "thumb"
                    ],
                    "properties": {
                      "large": {
                        "type": "string"
                      },
                      "medium": {
                        "type": "string"
                      },
                      "small": {
                        "type": "string"
                      },
                      "thumb": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "hasMultimedia": {
              "type": "boolean"
            },
            "hasOnlyPhotos": {
              "type": "boolean"
            },
            "photoPlan": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "url",
                  "urls"
                ],
                "properties": {
                  "url": {
                    "type": "string"
                  },
                  "urls": {
                    "type": "object",
                    "required": [
                      "large",
                      "medium",
                      "small",
                      "thumb"
                    ],
                    "properties": {
                      "large": {
                        "type": "string"
                      },
                      "medium": {
                        "type": "null"
                      },
                      "small": {
                        "type": "null"
                      },
                      "thumb": {
                        "type": "null"
                      }
                    }
                  }
                }
              }
            },
            "photos": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "caption",
                  "id",
                  "tag",
                  "urls"
                ],
                "properties": {
                  "caption": {
                    "type": "string"
                  },
                  "id": {
                    "type": "integer"
                  },
                  "tag": {
                    "anyOf": [
                      {
                        "type": "object",
                        "required": [
                          "category",
                          "key",
                          "label"
                        ],
                        "properties": {
                          "category": {
                            "type": "string"
                          },
                          "key": {
                            "type": "string"
                          },
                          "label": {
                            "type": "string"
                          }
                        }
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "urls": {
                    "type": "object",
                    "required": [
                      "large",
                      "medium",
                      "small",
                      "thumb"
                    ],
                    "properties": {
                      "large": {
                        "type": "string"
                      },
                      "medium": {
                        "type": "string"
                      },
                      "small": {
                        "type": "string"
                      },
                      "thumb": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "videos": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "id",
                  "url"
                ],
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              }
            },
            "virtualTours": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "id",
                  "url"
                ],
                "properties": {
                  "id": {
                    "type": "null"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "photo": {
          "type": "object",
          "required": [
            "caption",
            "id",
            "urls"
          ],
          "properties": {
            "caption": {
              "type": "string"
            },
            "id": {
              "type": "integer"
            },
            "urls": {
              "type": "object",
              "required": [
                "large",
                "medium",
                "small",
                "thumb"
              ],
              "properties": {
                "large": {
                  "type": "string"
                },
                "medium": {
                  "type": "string"
                },
                "small": {
                  "type": "string"
                },
                "thumb": {
                  "type": "string"
                }
              }
            }
          }
        },
        "rent": {
          "type": "object",
          "required": [
            "availableToStudents",
            "deposit",
            "priceReferenceIndex",
            "redemptionRent"
          ],
          "properties": {
            "availableToStudents": {
              "type": "boolean"
            },
            "deposit": {
              "type": [
                "null",
                "string"
              ]
            },
            "priceReferenceIndex": {
              "type": "null"
            },
            "redemptionRent": {
              "type": [
                "null",
                "boolean"
              ]
            }
          }
        },
        "surfaceConstitution": {
          "type": "object",
          "required": [
            "surfaceConstitutionElements"
          ],
          "properties": {
            "surfaceConstitutionElements": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "commercialSurface",
                  "constitution",
                  "constitutionKey",
                  "percentage",
                  "surface",
                  "surfaceType"
                ],
                "properties": {
                  "commercialSurface": {
                    "type": "string"
                  },
                  "constitution": {
                    "type": "string"
                  },
                  "constitutionKey": {
                    "type": "string"
                  },
                  "floor": {
                    "type": "object",
                    "required": [
                      "value"
                    ],
                    "properties": {
                      "abbreviation": {
                        "type": "string"
                      },
                      "value": {
                        "type": "string"
                      }
                    }
                  },
                  "percentage": {
                    "type": "integer"
                  },
                  "surface": {
                    "type": "string"
                  },
                  "surfaceType": {
                    "type": "string"
                  }
                }
              }
            },
            "totalCommercialSurface": {
              "type": "string"
            },
            "totalMainSurface": {
              "type": "string"
            }
          }
        },
        "surfaceValue": {
          "type": "string"
        }
      }
    },
    "realEstatePage": {
      "type": "object",
      "required": [
        "contractValue",
        "createdAt",
        "price",
        "title",
        "updatedAt"
      ],
      "properties": {
        "contractValue": {
          "type": "string"
        },
        "createdAt": {
          "type": "integer"
        },
        "price": {
          "type": "object",
          "required": [
            "formattedValue",
            "priceRange",
            "value",
            "visible"
          ],
          "properties": {
            "formattedValue": {
              "type": "string"
            },
            "loweredPrice": {
              "type": "object",
              "required": [
                "currentPrice",
                "date",
                "discountPercentage",
                "originalPrice",
                "passedDays",
                "priceDecreasedBy",
                "typologiesCount"
              ],
              "properties": {
                "currentPrice": {
                  "type": "string"
                },
                "date": {
                  "type": "string"
                },
                "discountPercentage": {
                  "type": "string"
                },
                "originalPrice": {
                  "type": "string"
                },
                "passedDays": {
                  "type": "integer"
                },
                "priceDecreasedBy": {
                  "type": "string"
                },
                "typologiesCount": {
                  "type": "integer"
                }
              }
            },
            "pricePerSquareMeter": {
              "type": "string"
            },
            "priceRange": {
              "type": "string"
            },
            "value": {
              "type": "integer"
            },
            "visible": {
              "type": "boolean"
            }
          }
        },
        "title": {
          "type": "string"
        },
        "updatedAt": {
          "type": "integer"
        }
      }
    },
    "stateMaloi": {
      "type": "integer"
    },
    "type": {
      "type": "string"
    },
    "userUpdate": {
      "type": "string"
    }
  },
  "$defs": {
    "Double": {
      "oneOf": [
        {
          "type": "number"
        },
        {
          "type": "object",
          "properties": {
            "$numberDouble": {
              "enum": [
                "Infinity",
                "-Infinity",
                "NaN"
              ]
            }
          }
        }
      ]
    }
  }
}
```




### Scrive dati

| Collection   | affito                                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Puoi salvare | description: testo con la descricione che ho dato<br>stateMaloi: salva il stato que ho deciso 0 (non buono) 1 (buono) 2 (cosi cosi)<br>BulkStateMaloi: Salvare molti affiti con il stesso stateMaloi. riceve un array di ids  dei affitti e uno stato.  |
* Query per update the stato
```
const filter = { _id: parseInt(id) as any };
await collection.updateMany(
        filter,
        { $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } }
      )
```

* Query per update molti stati
```
  
const filter = { _id: { $in: realEstateIds } };
await collection.updateMany(
        filter,
        { 
	        $set: { 
		        stateMaloi: stateMaloi, 
		        mLastUpdate: new Date().getTime() / 1000, 
		        userUpdate: user.email 
		     } 
		 }
      )
  
```
* Query per cambiare scrivere la descrizione*
```
      const filter = { _id: parseInt(id) as any };
      await collection.updateOne(
        filter,
        {
          $set: {
            "description": description.trim(),
            "mLastUpdate": new Date().getTime() / 1000,
            "userUpdate": user.email
          }
        }
      );
```
## Count Dati

| collection  | count                                                   |
| ----------- | ------------------------------------------------------- |
| descrizione |  Prende il attuale stato del banco in un riesumo totale |

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": [
    "_id",
    "accept",
    "deny",
    "disable",
    "elevator",
    "emptyChoise",
    "emptydisable",
    "emptyElevator",
    "nodisable",
    "noElevator",
    "total",
    "wait"
  ],
  "properties": {
    "_id": {
      "type": "object",
      "required": [
        "province",
        "type"
      ],
      "properties": {
        "province": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "accept": {
      "type": "integer"
    },
    "deny": {
      "type": "integer"
    },
    "disable": {
      "type": "integer"
    },
    "elevator": {
      "type": "integer"
    },
    "emptyChoise": {
      "type": "integer"
    },
    "emptydisable": {
      "type": "integer"
    },
    "emptyElevator": {
      "type": "integer"
    },
    "nodisable": {
      "type": "integer"
    },
    "noElevator": {
      "type": "integer"
    },
    "total": {
      "type": "integer"
    },
    "wait": {
      "type": "integer"
    }
  },
  "$defs": {}
}
```

## Analisi Dati

| collection  | feature                                 |
| ----------- | ---------------------------------- |
| des prendi il principale informazione  e  e  e  e  e  |
```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": [
    "_id",
    "featureList",
    "primaryFeatures",
    "province",
    "type"
  ],
  "properties": {
    "_id": {
      "type": "integer"
    },
    "featureList": {
      "type": "object",
      "required": [],
      "properties": {
        "balcony": {
          "type": "string"
        },
        "basement": {
          "type": "string"
        },
        "bathrooms": {
          "type": "string"
        },
        "elevator": {
          "type": "string"
        },
        "floor": {
          "type": "string"
        },
        "furniture": {
          "type": "string"
        },
        "rooms": {
          "type": "string"
        },
        "saleDate": {
          "type": "string"
        },
        "surface": {
          "type": "string"
        },
        "terrace": {
          "type": "string"
        }
      }
    },
    "primaryFeatures": {
      "type": "object",
      "required": [],
      "properties": {
        "Accesso_per_disabili": {
          "type": "integer"
        },
        "Armadio_a_muro": {
          "type": "integer"
        },
        "Arredato": {
          "type": "null"
        },
        "Bagno_per_disabili": {
          "type": "integer"
        },
        "balcone": {
          "type": [
            "null",
            "integer"
          ]
        },
        "Cablato": {
          "type": "integer"
        },
        "Caminetto": {
          "type": "integer"
        },
        "Campo_da_tennis": {
          "type": "integer"
        },
        "cancello_elettrico": {
          "type": "integer"
        },
        "canna_fumaria": {
          "type": "null"
        },
        "cantina": {
          "type": "integer"
        },
        "Cucina": {
          "type": "integer"
        },
        "Esposizione_esterna": {
          "type": "integer"
        },
        "Esposizione_interna": {
          "type": "integer"
        },
        "Fibra_ottica": {
          "type": "integer"
        },
        "Giardino_comune": {
          "type": "null"
        },
        "Giardino_privato": {
          "type": "null"
        },
        "Giardino_privato_e_comune": {
          "type": "null"
        },
        "Idromassaggio": {
          "type": "integer"
        },
        "Impianto_di_allarme": {
          "type": "integer"
        },
        "impianto_tv_centralizzato": {
          "type": "integer"
        },
        "impianto_tv_con_parabola_satellitare": {
          "type": "integer"
        },
        "impianto_tv_singolo": {
          "type": "integer"
        },
        "Infissi_esterni_in_doppio_vetro_/_legno": {
          "type": "null"
        },
        "Infissi_esterni_in_doppio_vetro_/_metallo": {
          "type": "null"
        },
        "Infissi_esterni_in_doppio_vetro_/_PVC": {
          "type": "null"
        },
        "Infissi_esterni_in_triplo_vetro_/_legno": {
          "type": "null"
        },
        "Infissi_esterni_in_triplo_vetro_/_metallo": {
          "type": "null"
        },
        "Infissi_esterni_in_triplo_vetro_/_PVC": {
          "type": "null"
        },
        "Infissi_esterni_in_vetro_/_legno": {
          "type": "null"
        },
        "Infissi_esterni_in_vetro_/_metallo": {
          "type": "null"
        },
        "Infissi_esterni_in_vetro_/_PVC": {
          "type": "null"
        },
        "Mansarda": {
          "type": "integer"
        },
        "Nessun_giardino": {
          "type": "null"
        },
        "Non_Arredato": {
          "type": "null"
        },
        "Parzialmente_Arredato": {
          "type": "null"
        },
        "Passo_carrabile": {
          "type": "integer"
        },
        "Pavimento_flottante": {
          "type": "integer"
        },
        "piscina": {
          "type": "integer"
        },
        "Porta_blindata": {
          "type": "integer"
        },
        "portiere": {
          "type": "null"
        },
        "portiere_intera_giornata": {
          "type": "null"
        },
        "portiere_mezza_giornata": {
          "type": "null"
        },
        "Proprietà_recintata": {
          "type": "integer"
        },
        "Reception": {
          "type": "integer"
        },
        "Senza_impianto_tv": {
          "type": "integer"
        },
        "Solo_Cucina_Arredata": {
          "type": "null"
        },
        "Taverna": {
          "type": "integer"
        },
        "terrazza": {
          "type": [
            "null",
            "integer"
          ]
        },
        "videoCitofono": {
          "type": "integer"
        },
        "Vigilanza_CCTV": {
          "type": "integer"
        }
      }
    },
    "province": {
      "type": "string"
    },
    "stateMaloi": {
      "type": "integer"
    },
    "type": {
      "type": "string"
    }
  },
  "$defs": {}
}
```