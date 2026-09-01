I need a new feature named **"buono++"** . il buono++ is the statusMaloi *"buono"* but with a new field name "followed" defined true. This location is my priorit and I need get this location because that I need evidence/priorit in the screen . 

# Feature
## Frontend
The legacy is the "followed" is null understand false. 
### choice buttons
Where is the choice of status [ "buono" , "cosi cosi" , "Non Buono" ] need add a new blue botton "buono++" . when choice this "buono++" the maloi status is changed to "buono" e il "followed" defined true . The other status when cliched send you status and the "followed" will be false .
### Filter
in the select filter the status will be the AS-IS now . We will add a new checkbox next the "Solo Piano Terra" with the option "buono++" that show this itens that is in the REDUX status (ex. I filter tutti , tutti il "buono++" will aper with this checkbox is checked . If I make a filter with province and elevator==YES evenif the itens that there are with "buono++" need apper [ I know the data in the REDUX are province and type , in the screen is present the elevator==YES  but is the "buono++" is checked ignore alevator and return this item ])
### Pin in the map
When the Item is a "button++" insted use a green pin use a blue star . 

## Backend
In the backend add a new field name "followed" . in the update status make  "followed" true when the "buono++" is clicked and any other the "followed" is false.