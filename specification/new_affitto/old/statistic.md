# Statistic

## Collection and Schema

I created the collection **statistic** to create the statistic page and pass the data into API per access MNongoDB Collection .

Use the schema
```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": [
    "_id",
    "condominiumExpenses",
    "contractValue",
    "createdAt",
    "deposit",
    "price",
    "pricePerSquareMeter",
    "surfaceValue",
    "type",
    "updatedAt"
  ],
  "properties": {
    "_id": {
      "type": "integer"
    },
    "Accesso_per_disabili": {
      "type": "integer"
    },
    "condominiumExpenses": {
      "type": [
        "integer",
        "null"
      ]
    },
    "contractValue": {
      "type": "string"
    },
    "createdAt": {
      "type": "integer"
    },
    "deposit": {
      "type": [
        "null",
        "integer"
      ]
    },
    "elevator": {
      "type": "boolean"
    },
    "energyClass": {
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
    "mCreateDate": {
      "$ref": "#/$defs/Double"
    },
    "mLastUpdate": {
      "$ref": "#/$defs/Double"
    },
    "price": {
      "type": "integer"
    },
    "pricePerSquareMeter": {
      "type": [
        "integer",
        "null"
      ]
    },
    "stateMaloi": {
      "type": "integer"
    },
    "surfaceValue": {
      "type": [
        "integer",
        "null"
      ]
    },
    "type": {
      "type": "string"
    },
    "updatedAt": {
      "type": "integer"
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

## Graphyc
Group the data from province and type (A=Affitto c=Compra)

Default use the color:
* no = red
* si = green
* cosi = yeallow
* senza = gray

### Disable
Present the relacion by group and "Accesso_per_disabili" (0=no , 1 = si , undefined = senza data)

### stateMaloi
Present the relacion by group and the stateMaloi (0 = no , 1 = si , undefine = senza data , 2 = cosi)


### Elevator
Present the relacion by group and "elevator" (False=no , True = si , undefined = senza data)