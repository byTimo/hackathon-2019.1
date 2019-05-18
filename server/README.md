## Ручки

`GET /api/trips?barsCount={number}&drinkType={DrinkType}&barType={BarType}`

Возвращает путешествие со списком баров для заданного фильтра

```
GET /api/trips?barsCount=2&drinkType=0&barType=1
```

```json
{
  "id": "cee40049-9726-40f1-aac7-f9a93b9d04e7",
  "bars": [
    {
      "id": "68a4236b-e446-4fd9-aa97-1d973a1243ac",
      "type": 1,
      "title": "Nonstop Creator",
      "drinkType": 0,
      "geoPosition": {
        "latitude": 56.82721403005372,
        "longitude": 60.59565327299719
      }
    },
    {
      "id": "106d7d98-6111-4a8f-a30f-1d546709549b",
      "type": 1,
      "title": "Alert Offer",
      "drinkType": 0,
      "geoPosition": {
        "latitude": 56.827271045769116,
        "longitude": 60.60567812353764
      }
    }
  ]
}
```
