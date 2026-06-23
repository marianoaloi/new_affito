Sistema che presenta il dati di affitti che ha nel database mongodb che il scrapping ho ritornato il dato.

## Firebase
é usata il:
**hosting** per presentare il frontend in typescript , react e redux
**[[function]]** per processare il business rules e legere il dati che il mongoDB has by scrapping at other process.

## Feature
The data in REDUX state for affitto will be present in a table with the tible is a main column 

## InfraStruture
Mongo  {
    url: "mongodb+srv://cluster0.7qska.mongodb.net/?"+
    "authSource=%24external&authMechanism=MONGODB-X509&"+
    "retryWrites=true&w=majority&appName=Cluster0",
    database: "udine",
    collection: "affito",
    certificatePath: path.resolve(__dirname + "/X509-cert-2864290664025085959.pem")
  }
  
  