Need construct a react system with react and redux in the frontend, express to backend, database is mongodb that has alread filled. 


## InfraStruture
### Mongo 
#### Connection 
{
    url: "mongodb+srv://cluster0.7qska.mongodb.net/?"+
    "authSource=%24external&authMechanism=MONGODB-X509&"+
    "retryWrites=true&w=majority&appName=Cluster0",
    database: "udine",
    collection: "affito",
    certificatePath: path.resolve(__dirname + "/X509-cert-2864290664025085959.pem")
  }
  #### Collections
  * Affito - Has the data I scraped from a rent site. 
  * affitto_data - View from affito that has the definition I need in the present
  * count - A without filter count of 