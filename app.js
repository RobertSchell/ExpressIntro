 	// Bring in Express code
 	const express = require('express')

 	const app = express()
 	const port = 3000

 	app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

 	const favoriteMovieList = [{
 		title: "Star Wars",
 		starRating: 5,
 		isRecommended: true,
 		createdAt: new Date(),
 		lastModified: new Date()
 	}, {
 		title: "The Avengers",
 		starRating: 4,
 		isRecommended: true,
 		createdAt: new Date(),
 		lastModified: new Date()
 	}];

 	app.get('/', (req, res) => {
 		res.send('Hello World!')
 	})

    app.get("/all-movies", (req, res)=>{
        res.json({
            success: true,
            favoriteMovieList: favoriteMovieList
        })
    })

    app.get("/single-movie/:title", (req, res)=>{
        const foundTitle = favoriteMovieList.find((movie)=>{
            return movie.title === req.params.title
        })
        res.json({
            success: true,
            foundTitle: foundTitle
        })
    })

    app.post("/new-movie", (req, res)=>{
        if (req.body.title === undefined || typeof(req.body.title) !== "string") {
            res.json({
                success: false,
                message: "movie title  required and must be a string"
            })
            return
        }
        if (req.body.starRating === undefined || typeof(req.body.starRating) !== "number"){
            res.json({
                success: false,
                message: "star rating is required and must be a number"
            })
            return
        }
        if (req.body.isRecommended === undefined || typeof(req.body.isRecommended) !== "boolean"){
            res.json({
                success: false,
                message: "is recommended is required and must be equal either true or false"
            })
            return
        }
        const newMovie = {}
        newMovie.title = req.body.title
        newMovie.starRating = req.body.starRating
        newMovie.isRecommended = req.body.isRecommended
        newMovie.createdAt = new Date()
        newMovie.lastModified = new Date()
        favoriteMovieList.push(newMovie)
        res.json({
            success: true
        })
    })

    app.put("/update-movie/:title", (req, res)=>{
        const titleToUpdate = req.params.title
        const originalTitle = favoriteMovieList.find((movie)=>{
            return movie.title === titleToUpdate
        })
        const originalTitleIndex = favoriteMovieList.findIndex((movie)=>{
            return movie.title === titleToUpdate
        })
    
        if (!originalTitle) {
            res.json({
                success: false,
                message: "Could not find title in favorite movie list"
            })
            return
        }
    
        const updatedTitle = {}
    
        if (req.body.title !== undefined){
            updatedTitle.title = req.body.title
        } else {
            updatedTitle.title = originalTitle.title
        }
    
        if (req.body.starRating !== undefined){
            updatedTitle.starRating = req.body.starRating
        } else {
            updatedTitle.starRating = originalTitle.starRating
        }
    
        if (req.body.isRecommended !== undefined){
            updatedTitle.isRecommended = req.body.isRecommended
        } else {
            updatedTitle.isRecommended = originalTitle.isRecommended
        }
    
        favoriteMovieList[originalTitleIndex] = updatedTitle
    
        res.json({
            success: true
        })
    })

    app.delete("/delete-movie/:title", (req, res)=>{
        const titleToDelete = req.params.title
        const indexOfTitle = favoriteMovieList.findIndex((movie)=>{
            return movie.title === titleToDelete
        })
    
        favoriteMovieList.splice(indexOfTitle, 1)
    
        res.json({
            success: true
        })
    })

 	app.listen(port, () => {
 		console.log(`Example app listening on port ${port}`)
 	})