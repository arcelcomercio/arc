## Cómo usar clavis-recommendations sin Content Source. **Legacy**

##### Se recomienda usar la content source. 
##### Ejemplo de uso en /components/features/story/separator-by-recommendation

`clavis-recommendations` devuelve una promesa con un objeto "results" que contiene un Array de historias recomendadas para el usuario y la historia pertinente.

Primero es necesario importar la función.

`import clavisRecommendations from '.../utilities/analytics/clavis-recommendations'`

La intención es que una vez recibamos la data se reasigne un estado para poder renderizar las historias recién salidas del horno, por lo tanto es necesario crear un estado, puede ser:

`const [recommendations, setRecommendations] = useState([])`

Es necesario que la función `clavis-recommendations` se ejecute una vez el componente esté montado y la variable global `window` esté accesible, por lo tanto puedes hacer lo siguiente dentro de `useEffect` o `componentDidMount`.

```
const recommend = clavisRecommendations({ 
    contentId: globalContent && globalContent._id, // ID de la historia
    count: n, // Cantidad de historias 
    site: arcSite 
    }, '/recommend' /** Endpoint */ )

if (recommend)
    recommend.then(response => {
        setRecommendations(response.results)
    }).catch(error => console.error(error))
```

Listo, ya tienes el listado de noticias recomendadas en `recommendations` con el siguiente modelo.

```
[
    {
        url	            string
        headline	    string
        summary	        string
        publishedAt	    string
        responsetype	string
        site            string
        contentType     string
        contentSubtype  string
        taxonomySites   [
            path        string
        ]
        photo	{
            path	    string
        }
    }...
]
```