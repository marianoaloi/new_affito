
Create a new page in the frontend that use react-leaflet as the map framework, 

# Filter

The map can be filtered by: 
1.  province 
	1. Udine
	2. Trieste
	3. Padova
2.  type 
	1. Affitto
	2. Compra
3. accessibility
	1. Senza scelta
	2. Accessibili
	3. not information
	4. not accessibili
4.  elevator 
	1. Senza scelta
	2. has elevator
	3. not information
	4. hasn't elevator
5.  statusMaloi  
	1. Senza scelta
	2. buono (1)
	3. cozi (2)
	4. male (0)
6.  Terra = in the "properties.floor.abbreviation" has the letter "T" ignore case

## Observation in the query

Allway get all the objects (not pagination) for "type" and "province" . Only make request to API when change  "type" and "province" . The other filters is filtered in screen only limiting the list of objects that stay in redux state. 

When change the province the map need change the zoom to 13 and latitute + longitude to:

* Udine* = {
  latitude: 46.0689,
  longitude: 13.2224,
  zoom: 13,
  local: "Udine",
};

* trieste = {
  latitude: 45.643837,
  longitude: 13.795002,
  zoom: 13,
  local: "Trieste",
};

*  padova = {
  latitude: 45.4064,
  longitude: 11.8768,
  zoom: 13,
  local: "Padova",
};
# My location
if the browser has access to my location enable my location the the map by the emojy 🫵


# Object Affitto location
The location of the affito need to be represented by a color pin:
* red when the affito has the statusMaloi 0
* green when the affito has the statusMaloi 1
* yellow when the affito has the status 2
* blue when the affito doesnt has status.


# Click in the pin
When the pin in the map is clicked a popup is presented with the information (only information - can make a description of the field in the title of the element presente) 
* affito.realEstate.price (With a lik to href=`https://www.immobiliare.it/annunci/${affito._id}`)
* affito.realEstate.title 
* properties.floor.abbreviation
* feature.featureList.elevator
* properties.surfaceValue
    * "properties.surfaceValue" + 'm²' 
* feature.primaryFeatures.Accesso_per_disabili == '🟡' not information , "♿" is 1 ,  "❌" is 0 
* timeAgo(affito.realEstate.createdAt)
    * me dataImportance(affito.create)
    * immobiliare dataImportance(affito.realEstate.createdAt)
* timeAgo(affito.realEstate.updatedAt)
    * me dataImportance(affito.last)
    * immobiliare dataImportance(affito.realEstate.updatedAt)
* affito.elevation 
    * Math.ceil(affito.elevation) + 'm²'
* affito.realEstate.contractValue 
* One icon that has a link and execute the URL [Find location in GoogleMaps open the link]
* One icon that has a link and execute [Google direction when click]

## Find location in GoogleMaps open the link
```
window.open(`https://www.google.com/maps/search/?api=1&query=${affito.realEstate.properties.location.latitude},${affito.realEstate.properties.location.longitude}`, '_blank')}
```
## Google direction when click

    * TriestPoint = 'Train+station+Trieste+Centrale,+Piazza+della+Libert%C3%A0,+11,+34132+Trieste+TS'

    * UdinePoint = "my location"  or  "V.le+Europa+Unita,+33100+Udine+UD"

    * PadovaPoint = "Stazione+di+Padova,+Piazzale+della+Stazione,+35131+Padova+PD"

```
window.open(`https://www.google.com/maps/dir/${affito.realEstate.properties.location.province === 'Udine' ? UdinePoint : affito.realEstate.properties.location.province === 'Padova' ? PadovaPoint : TriestPoint}/${affito.realEstate.properties.location.latitude},${affito.realEstate.properties.location.longitude}`, '_blank')}
```


## photos

Iterate in the properties.multimedia.photos and present the itens pagged in 9 itens. a grid of 9 photos and is paginated. When click in the photo its is open a URL of the photo in the new tab. present the small in the grid e open the large in the new tab. 


## choice status
in this popup I can choice the status to save in the database 

	1. buono (1)
	2. cozi (2)
	3. male (0)