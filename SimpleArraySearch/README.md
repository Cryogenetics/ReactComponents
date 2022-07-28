# Simple Array Search

## this is a simple modular searchbar that can filter through an array of objects.
Features:
- modular
- sortable
- reversible (ascending/descending)
- can determine new sorting methods easily
- can set icons for ascending/descending

this was my first time using typescript, and still kind of new to react.
an example of the searchbar can be found in [exampleUsage.tsx](https://github.com/Cryogenetics/ReactComponents/blob/main/SimpleArraySearch/exampleUsage.tsx)

the searchbar was made using nextui and for the Icons in the example @mui/icons-material was used
```bash
npm i @nextui-org/react @mui/icons-material
```

known issues:
- finiky behavior when search is empty and attempting to change sorting or order
